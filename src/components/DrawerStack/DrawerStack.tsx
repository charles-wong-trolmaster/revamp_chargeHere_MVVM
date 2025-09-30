import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import styles from "./DrawerStack.module.scss";
import "./DrawerStack.scss";

// Types
interface DrawerStackContextType {
  openDrawer: (drawerId: string) => void;
  closeDrawer: (drawerId: string) => void;
  openDrawerGlobal: (namespace: string, drawerId: string) => void;
  registerDrawer: (
    path: string,
    content: React.ReactNode,
    widthMultiplier?: number
  ) => void; // Add widthMultiplier parameter
  unregisterDrawer: (path: string) => void;
  visibleDrawers: Set<string>;
  closingDrawers: Set<string>;
}

interface DrawerStackProps {
  activeDrawer?: string;
  children: React.ReactNode;
}

interface DrawerRegistration {
  path: string;
  content: React.ReactNode;
  level: number;
  widthMultiplier?: number;
}

interface AnimationState {
  id: string;
  type: "opening" | "closing";
  startTime: number;
  timeoutId: NodeJS.Timeout;
  cleanupTimeoutId?: NodeJS.Timeout;
}

// Context
const DrawerStackContext = createContext<DrawerStackContextType | null>(null);

export const useDrawer = () => {
  const context = useContext(DrawerStackContext);
  if (!context) {
    throw new Error("useDrawer must be used within a DrawerStack");
  }
  return context;
};

// Main Component
const DrawerStack: React.FC<DrawerStackProps> = ({
  activeDrawer,
  children,
}) => {
  // State
  const [visibleDrawers, setVisibleDrawers] = useState<Set<string>>(new Set());
  const [closingDrawers, setClosingDrawers] = useState<Set<string>>(new Set());
  const [registeredDrawers, setRegisteredDrawers] = useState<
    Map<string, DrawerRegistration>
  >(new Map());

  // Refs
  const previousActiveRootRef = useRef<string | null>(null);
  const mountedRef = useRef(true);
  const animationControllerRef = useRef<AbortController | null>(null);
  const activeAnimations = useRef<Map<string, AnimationState>>(new Map());
  const globalCleanupTimeout = useRef<NodeJS.Timeout | null>(null);

  // Animation timing configuration
  const animationTimings = useMemo(() => {
    const duration =
      (styles?.drawerTransitionDuration &&
        parseInt(styles.drawerTransitionDuration.replace("ms", ""))) ||
      300;
    const stagger =
      (styles?.drawerStaggerDelay &&
        parseInt(styles.drawerStaggerDelay.replace("ms", ""))) ||
      150;
    return { duration, stagger };
  }, []);

  // Root drawer management
  const rootDrawerIds = useMemo(() => {
    const roots: string[] = [];
    React.Children.forEach(children, (child) => {
      if (React.isValidElement(child)) {
        const props = child.props as { id?: string };
        if (props.id) {
          roots.push(props.id);
        }
      }
    });
    return roots;
  }, [children]);

  const activeRoot = useMemo(() => {
    return activeDrawer && rootDrawerIds.includes(activeDrawer)
      ? activeDrawer
      : rootDrawerIds[0];
  }, [activeDrawer, rootDrawerIds]);

  // Drawer registration
  const registerDrawer = useCallback(
    (path: string, content: React.ReactNode, widthMultiplier?: number) => {
      const level = (path.match(/\//g) || []).length;
      const registration: DrawerRegistration = {
        path,
        content,
        level,
        widthMultiplier: widthMultiplier || 1,
      }; // Default to 1
      setRegisteredDrawers((prev) => new Map(prev).set(path, registration));
    },
    []
  );

  const unregisterDrawer = useCallback((path: string) => {
    setRegisteredDrawers((prev) => {
      const newMap = new Map(prev);
      newMap.delete(path);
      return newMap;
    });
  }, []);

  // Safe state updates
  const safeSetState = useCallback((setter: any) => {
    if (mountedRef.current && !animationControllerRef.current?.signal.aborted) {
      setter();
    }
  }, []);

  // Animation utilities
  const createSafeAnimation = useCallback(
    (
      drawerId: string,
      type: "opening" | "closing",
      callback: () => void,
      delay: number,
      cleanupCallback?: () => void
    ) => {
      if (!mountedRef.current) return;

      const existingAnimation = activeAnimations.current.get(drawerId);
      if (existingAnimation) {
        clearTimeout(existingAnimation.timeoutId);
        if (existingAnimation.cleanupTimeoutId) {
          clearTimeout(existingAnimation.cleanupTimeoutId);
        }
      }

      const timeoutId = setTimeout(() => {
        if (
          mountedRef.current &&
          !animationControllerRef.current?.signal.aborted
        ) {
          callback();

          let cleanupTimeoutId: NodeJS.Timeout | undefined;
          if (cleanupCallback) {
            cleanupTimeoutId = setTimeout(() => {
              if (mountedRef.current) {
                cleanupCallback();
              }
              activeAnimations.current.delete(drawerId);
            }, animationTimings.duration + 50);
          } else {
            activeAnimations.current.delete(drawerId);
          }

          if (cleanupTimeoutId) {
            activeAnimations.current.set(drawerId, {
              ...activeAnimations.current.get(drawerId)!,
              cleanupTimeoutId,
            });
          }
        }
      }, delay);

      activeAnimations.current.set(drawerId, {
        id: drawerId,
        type,
        startTime: Date.now(),
        timeoutId,
      });

      return timeoutId;
    },
    [animationTimings.duration]
  );

  // Cleanup functions
  const forceCleanupStuckStates = useCallback(() => {
    const now = Date.now();
    const maxAnimationTime =
      animationTimings.duration + animationTimings.stagger * 10;

    const stuckAnimations: string[] = [];
    activeAnimations.current.forEach((animation, drawerId) => {
      if (now - animation.startTime > maxAnimationTime) {
        stuckAnimations.push(drawerId);
      }
    });

    if (stuckAnimations.length > 0) {
      setVisibleDrawers((prev) => {
        const newSet = new Set(prev);
        stuckAnimations.forEach((id) => {
          const animation = activeAnimations.current.get(id);
          if (animation?.type === "closing") {
            newSet.delete(id);
          }
        });
        return newSet;
      });

      setClosingDrawers((prev) => {
        const newSet = new Set(prev);
        stuckAnimations.forEach((id) => newSet.delete(id));
        return newSet;
      });

      stuckAnimations.forEach((id) => {
        const animation = activeAnimations.current.get(id);
        if (animation) {
          clearTimeout(animation.timeoutId);
          if (animation.cleanupTimeoutId) {
            clearTimeout(animation.cleanupTimeoutId);
          }
          activeAnimations.current.delete(id);
        }
      });
    }
  }, [animationTimings]);

  const cleanup = useCallback(() => {
    activeAnimations.current.forEach((animation) => {
      clearTimeout(animation.timeoutId);
      if (animation.cleanupTimeoutId) {
        clearTimeout(animation.cleanupTimeoutId);
      }
    });
    activeAnimations.current.clear();

    if (globalCleanupTimeout.current) {
      clearTimeout(globalCleanupTimeout.current);
      globalCleanupTimeout.current = null;
    }

    if (animationControllerRef.current) {
      animationControllerRef.current.abort();
    }
    animationControllerRef.current = new AbortController();
  }, []);

  const scheduleGlobalCleanup = useCallback(() => {
    if (globalCleanupTimeout.current) {
      clearTimeout(globalCleanupTimeout.current);
    }

    globalCleanupTimeout.current = setTimeout(() => {
      if (mountedRef.current) {
        forceCleanupStuckStates();
        scheduleGlobalCleanup();
      }
    }, animationTimings.duration * 2);
  }, [forceCleanupStuckStates, animationTimings.duration]);

  // Animation orchestration
  const closeDrawersWithAnimation = useCallback(
    (toClose: string[], callback?: () => void) => {
      cleanup();

      if (toClose.length === 0) {
        callback?.();
        return;
      }

      const { duration, stagger } = animationTimings;
      const sortedToClose = [...toClose].sort((a, b) => {
        const depthA = (a.match(/\//g) || []).length;
        const depthB = (b.match(/\//g) || []).length;
        return depthB - depthA;
      });

      let delay = 0;
      let completed = 0;
      const totalToClose = sortedToClose.length;

      const safetyTimeout = setTimeout(() => {
        if (mountedRef.current && completed < totalToClose) {
          forceCleanupStuckStates();
          callback?.();
        }
      }, (duration + stagger) * totalToClose + 1000);

      const checkCompletion = () => {
        completed++;
        if (completed === totalToClose) {
          clearTimeout(safetyTimeout);
          if (mountedRef.current) {
            callback?.();
          }
        }
      };

      sortedToClose.forEach((path) => {
        createSafeAnimation(
          path,
          "closing",
          () => {
            safeSetState(() => {
              setClosingDrawers((prev) => new Set([...prev, path]));
            });
          },
          delay,
          () => {
            safeSetState(() => {
              setVisibleDrawers((prev) => {
                const newSet = new Set(prev);
                newSet.delete(path);
                return newSet;
              });
              setClosingDrawers((prev) => {
                const newSet = new Set(prev);
                newSet.delete(path);
                return newSet;
              });
            });
            checkCompletion();
          }
        );
        delay += stagger;
      });
    },
    [
      animationTimings,
      cleanup,
      createSafeAnimation,
      safeSetState,
      forceCleanupStuckStates,
    ]
  );

  const openDrawersWithAnimation = useCallback(
    (toOpen: string[]) => {
      cleanup();

      if (toOpen.length === 0) return;

      const { stagger } = animationTimings;
      const sortedToOpen = [...toOpen].sort((a, b) => {
        const depthA = (a.match(/\//g) || []).length;
        const depthB = (b.match(/\//g) || []).length;
        return depthA - depthB;
      });

      let delay = 0;
      sortedToOpen.forEach((path) => {
        createSafeAnimation(
          path,
          "opening",
          () => {
            safeSetState(() => {
              setVisibleDrawers((prev) => new Set([...prev, path]));
            });
          },
          delay
        );
        delay += stagger;
      });
    },
    [animationTimings, cleanup, createSafeAnimation, safeSetState]
  );

  // Path resolution
  const findDrawerPath = useCallback(
    (drawerId: string): string | null => {
      const registeredPaths = Array.from(registeredDrawers.keys());

      // Exact match
      if (registeredPaths.includes(drawerId)) {
        return drawerId;
      }

      // Find paths ending with the drawer ID
      const matchingPaths = registeredPaths.filter((path) =>
        path.endsWith("/" + drawerId)
      );

      if (matchingPaths.length === 0) {
        return null;
      }

      if (matchingPaths.length === 1) {
        return matchingPaths[0];
      }

      // Prefer paths under active root
      const activeRootPaths = matchingPaths.filter((path) =>
        path.startsWith(activeRoot + "/")
      );
      if (activeRootPaths.length > 0) {
        return activeRootPaths[0];
      }

      // Check visible drawer contexts
      const sortedVisibleDrawers = Array.from(visibleDrawers).sort(
        (a, b) => b.length - a.length
      );
      for (const visiblePath of sortedVisibleDrawers) {
        const contextPaths = matchingPaths.filter((path) =>
          path.startsWith(visiblePath + "/")
        );
        if (contextPaths.length > 0) {
          return contextPaths[0];
        }
      }

      return matchingPaths[0];
    },
    [registeredDrawers, visibleDrawers, activeRoot]
  );

  // Public API functions
  const openDrawer = useCallback(
    (drawerId: string) => {
      const tryOpenDrawer = (retryCount = 0) => {
        const targetPath = findDrawerPath(drawerId);

        if (!targetPath) {
          if (retryCount < 3) {
            setTimeout(() => tryOpenDrawer(retryCount + 1), 10);
            return;
          }
          return;
        }

        if (visibleDrawers.has(targetPath)) {
          return;
        }

        // Build hierarchy
        const pathParts = targetPath.split("/");
        const hierarchyPaths: string[] = [];
        for (let i = 1; i <= pathParts.length; i++) {
          hierarchyPaths.push(pathParts.slice(0, i).join("/"));
        }

        const targetLevel = pathParts.length - 1;
        const currentVisible = Array.from(visibleDrawers);

        // Determine what to close
        const toClose = currentVisible.filter((visiblePath) => {
          const visibleParts = visiblePath.split("/");
          const visibleLevel = visibleParts.length - 1;
          const isInTargetHierarchy = hierarchyPaths.includes(visiblePath);

          if (isInTargetHierarchy) return false;

          // Check for conflicts at each level
          for (
            let level = 1;
            level <= Math.max(visibleLevel, targetLevel);
            level++
          ) {
            const visibleAtLevel = visibleParts.slice(0, level + 1).join("/");
            const targetAtLevel = pathParts.slice(0, level + 1).join("/");

            if (level <= visibleLevel && level <= targetLevel) {
              const visibleParentAtLevel = visibleParts
                .slice(0, level)
                .join("/");
              const targetParentAtLevel = pathParts.slice(0, level).join("/");

              if (
                visibleParentAtLevel === targetParentAtLevel &&
                visibleAtLevel !== targetAtLevel
              ) {
                return true;
              }
            }

            if (level <= targetLevel && visibleLevel > level) {
              const targetAtLevel = pathParts.slice(0, level + 1).join("/");
              if (
                visiblePath.startsWith(
                  targetAtLevel.split("/").slice(0, -1).join("/") + "/"
                ) &&
                !visiblePath.startsWith(targetAtLevel + "/")
              ) {
                return true;
              }
            }
          }

          return false;
        });

        const toOpen = hierarchyPaths.filter(
          (path) => !visibleDrawers.has(path)
        );

        // Execute animation sequence
        if (toClose.length > 0) {
          closeDrawersWithAnimation(toClose, () => {
            if (mountedRef.current) {
              openDrawersWithAnimation(toOpen);
            }
          });
        } else {
          openDrawersWithAnimation(toOpen);
        }
      };

      tryOpenDrawer();
    },
    [
      visibleDrawers,
      findDrawerPath,
      closeDrawersWithAnimation,
      openDrawersWithAnimation,
    ]
  );

  const closeDrawer = useCallback(
    (drawerId: string) => {
      const targetPath = findDrawerPath(drawerId);
      if (!targetPath) return;

      const toClose = Array.from(visibleDrawers).filter(
        (path) => path === targetPath || path.startsWith(targetPath + "/")
      );

      closeDrawersWithAnimation(toClose);
    },
    [visibleDrawers, findDrawerPath, closeDrawersWithAnimation]
  );

  const openDrawerGlobal = useCallback(
    (namespace: string, drawerId: string) => {
      if (namespace === activeRoot) {
        openDrawer(drawerId);
      }
    },
    [activeRoot, openDrawer]
  );

  // Context value
  const contextValue = useMemo(
    () => ({
      openDrawer,
      closeDrawer,
      openDrawerGlobal,
      registerDrawer,
      unregisterDrawer,
      visibleDrawers,
      closingDrawers,
    }),
    [registerDrawer, unregisterDrawer, visibleDrawers, closingDrawers] // Remove the functions that depend on state
  );

  // Effects
  useEffect(() => {
    mountedRef.current = true;
    animationControllerRef.current = new AbortController();
    scheduleGlobalCleanup();

    return () => {
      mountedRef.current = false;
      cleanup();
    };
  }, [cleanup, scheduleGlobalCleanup]);

  // Handle root drawer changes
  useEffect(() => {
    if (!activeRoot) return;

    if (previousActiveRootRef.current === activeRoot) return;

    const wasInitialLoad = previousActiveRootRef.current === null;
    previousActiveRootRef.current = activeRoot;

    if (wasInitialLoad) {
      setVisibleDrawers(new Set([activeRoot]));
      return;
    }

    const currentVisible = Array.from(visibleDrawers);
    if (currentVisible.length > 0) {
      closeDrawersWithAnimation(currentVisible, () => {
        if (mountedRef.current) {
          setVisibleDrawers(new Set([activeRoot]));
        }
      });
    } else {
      setVisibleDrawers(new Set([activeRoot]));
    }
  }, [activeRoot, closeDrawersWithAnimation, visibleDrawers]);

  // Render
  return (
    <DrawerStackContext.Provider value={contextValue}>
      <div className="drawer-stack">
        {/* Registration children (no DOM output) */}
        {children}

        {/* Actual drawer DOM elements */}
        {Array.from(registeredDrawers.values())
          .sort((a, b) => a.level - b.level)
          .map((registration) => {
            const { path, content, level, widthMultiplier } = registration; // Destructure widthMultiplier
            const isVisible = visibleDrawers.has(path);
            const isClosing = closingDrawers.has(path);

            return isVisible || isClosing ? (
              <div
                key={path}
                className={`drawer ${isVisible ? "visible" : ""} ${
                  isClosing ? "closing" : ""
                }`}
                data-level={level}
                data-path={path}
                style={
                  {
                    zIndex: 1000 - level,
                    "--drawer-width-multiplier": widthMultiplier || 1, // Default to 1 if not provided
                  } as React.CSSProperties & {
                    "--drawer-width-multiplier": number;
                  }
                }
              >
                {content}
              </div>
            ) : null;
          })}
      </div>
    </DrawerStackContext.Provider>
  );
};

export default DrawerStack;
