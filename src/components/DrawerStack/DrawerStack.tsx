import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import styles from "./DrawerStack.module.scss";
import "./DrawerStack.scss";
import {
  DrawerStackContext,
  type DrawerStackContextType,
} from "./DrawerStackContext";

// Types
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

// Helper function for resolving relative paths
const resolveRelativePath = (
  currentPath: string,
  relativePath: string
): string => {
  // Handle absolute paths (no change needed)
  if (!relativePath.startsWith(".")) {
    return relativePath;
  }

  // Split current path into segments
  const currentSegments = currentPath.split("/").filter(Boolean);

  // Handle relative path
  if (relativePath.startsWith("./")) {
    // Child path: './settings' from 'location' → 'location/settings'
    const childId = relativePath.slice(2); // Remove './'
    return currentPath + "/" + childId;
  }

  if (relativePath.startsWith("../")) {
    // Parent/sibling path: '../history' from 'location/settings' → 'location/history'
    let segments = [...currentSegments];
    let remaining = relativePath;

    // Process each '../'
    while (remaining.startsWith("../")) {
      segments.pop(); // Go up one level
      remaining = remaining.slice(3); // Remove '../'
    }

    // If there's a remaining path, add it
    if (remaining) {
      segments.push(remaining);
    }

    return segments.join("/");
  }

  return relativePath;
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
  const [registrationComplete, setRegistrationComplete] = useState(false);

  // Refs
  const previousActiveRootRef = useRef<string | null>(null);
  const mountedRef = useRef(true);
  const animationControllerRef = useRef<AbortController | null>(null);
  const activeAnimations = useRef<Map<string, AnimationState>>(new Map());
  const globalCleanupTimeout = useRef<NodeJS.Timeout | null>(null);
  const registrationTimeoutRef = useRef<NodeJS.Timeout | null>(null);

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

  // ✅ Calculate current drawer path (deepest visible drawer)
  const currentDrawerPath = useMemo(() => {
    if (visibleDrawers.size === 0) {
      return activeRoot || "";
    }

    // Find the deepest visible drawer (highest level)
    const visiblePaths = Array.from(visibleDrawers);
    const deepestPath = visiblePaths.reduce((deepest, current) => {
      const currentLevel = (current.match(/\//g) || []).length;
      const deepestLevel = (deepest.match(/\//g) || []).length;
      return currentLevel > deepestLevel ? current : deepest;
    });

    return deepestPath;
  }, [visibleDrawers, activeRoot]);

  // Collect all drawer IDs from component tree for validation
  const collectAllDrawerIds = useCallback(
    (element: React.ReactNode, currentPath = ""): string[] => {
      const ids: string[] = [];

      React.Children.forEach(element, (child) => {
        if (React.isValidElement(child)) {
          const childProps = child.props as any;

          // If this element has an ID, it's a drawer
          if (childProps.id) {
            const fullPath = currentPath
              ? `${currentPath}/${childProps.id}`
              : childProps.id;
            ids.push(fullPath);

            // Recursively collect from children
            if (childProps.children) {
              ids.push(...collectAllDrawerIds(childProps.children, fullPath));
            }
          } else if (childProps.children) {
            // No ID but has children, keep looking
            ids.push(...collectAllDrawerIds(childProps.children, currentPath));
          }
        }
      });

      return ids;
    },
    []
  );

  // Drawer registration
  const registerDrawer = useCallback(
    (path: string, content: React.ReactNode, widthMultiplier?: number) => {
      const level = (path.match(/\//g) || []).length;
      const registration: DrawerRegistration = {
        path,
        content,
        level,
        widthMultiplier: widthMultiplier || 1,
      };
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

  // Registration completion handling
  useEffect(() => {
    if (registrationTimeoutRef.current) {
      clearTimeout(registrationTimeoutRef.current);
    }

    // Give a short time for all drawers to register, then mark complete
    registrationTimeoutRef.current = setTimeout(() => {
      setRegistrationComplete(true);
    }, 50);

    return () => {
      if (registrationTimeoutRef.current) {
        clearTimeout(registrationTimeoutRef.current);
      }
    };
  }, [children]);

  // Development validation
  useEffect(() => {
    if (registrationComplete && process.env.NODE_ENV === "development") {
      const expectedDrawers = collectAllDrawerIds(children);
      const registeredPaths = Array.from(registeredDrawers.keys());

      const missing = expectedDrawers.filter(
        (id) => !registeredPaths.includes(id)
      );
      const extra = registeredPaths.filter(
        (path) => !expectedDrawers.includes(path)
      );

      if (missing.length > 0) {
        console.warn(
          `⚠️ [DrawerStack] Expected drawers not registered:`,
          missing
        );
      }
      if (extra.length > 0) {
        console.warn(`⚠️ [DrawerStack] Extra registered drawers:`, extra);
      }

      console.log(
        `✅ [DrawerStack] Registration complete. Available drawers:`,
        registeredPaths
      );
    }
  }, [registrationComplete, registeredDrawers, children, collectAllDrawerIds]);

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

    if (registrationTimeoutRef.current) {
      clearTimeout(registrationTimeoutRef.current);
      registrationTimeoutRef.current = null;
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

  // Relative path navigation only
  const openDrawer = useCallback(
    (drawerIdOrPath: string, sourceDrawerPath?: string) => {
      if (!registrationComplete) {
        console.warn(
          `⚠️ [DrawerStack] Drawers not ready yet. Ignoring openDrawer("${drawerIdOrPath}").`
        );
        return;
      }

      let targetPath: string;

      // Handle relative paths
      if (drawerIdOrPath.startsWith(".")) {
        if (!sourceDrawerPath) {
          console.error(
            "❌ [DrawerStack] Relative path requires source context:",
            drawerIdOrPath
          );
          return;
        }
        targetPath = resolveRelativePath(sourceDrawerPath, drawerIdOrPath);
      } else {
        // Treat as absolute path
        targetPath = drawerIdOrPath;
      }

      // Verify the target drawer exists
      if (!registeredDrawers.has(targetPath)) {
        console.error(
          "❌ [DrawerStack] Target drawer not registered:",
          targetPath,
          "Available:",
          Array.from(registeredDrawers.keys())
        );
        return;
      }

      if (visibleDrawers.has(targetPath)) {
        return;
      }

      // Build hierarchy paths
      const pathParts = targetPath.split("/");
      const hierarchyPaths: string[] = [];
      for (let i = 1; i <= pathParts.length; i++) {
        hierarchyPaths.push(pathParts.slice(0, i).join("/"));
      }

      const missingPaths = hierarchyPaths.filter(
        (path) => !registeredDrawers.has(path)
      );
      if (missingPaths.length > 0) {
        console.error(
          `❌ [DrawerStack] Missing drawer(s) in hierarchy for "${targetPath}":`,
          missingPaths
        );
        return;
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
          if (level <= visibleLevel && level <= targetLevel) {
            const visibleParentAtLevel = visibleParts.slice(0, level).join("/");
            const targetParentAtLevel = pathParts.slice(0, level).join("/");
            const visibleAtLevel = visibleParts.slice(0, level + 1).join("/");
            const targetAtLevel = pathParts.slice(0, level + 1).join("/");

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

      const toOpen = hierarchyPaths.filter((path) => !visibleDrawers.has(path));

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
    },
    [
      registrationComplete,
      visibleDrawers,
      closeDrawersWithAnimation,
      openDrawersWithAnimation,
      registeredDrawers,
    ]
  );

  // closeDrawer with relative path support
  const closeDrawer = useCallback(
    (relativePath?: string, sourceDrawerPath?: string) => {
      if (!sourceDrawerPath) {
        console.error("❌ [DrawerStack] closeDrawer requires source context");
        return;
      }

      let targetPath: string;

      if (!relativePath || relativePath === "..") {
        // Close current drawer (go to parent)
        const segments = sourceDrawerPath.split("/").filter(Boolean);

        // Check if this is a first-level drawer trying to go to parent
        if (segments.length === 1) {
          // This is a root/first-level drawer - close it entirely
          console.log("🔴 First-level drawer closing:", sourceDrawerPath);
          const toClose = Array.from(visibleDrawers).filter(
            (path) =>
              path === sourceDrawerPath ||
              path.startsWith(sourceDrawerPath + "/")
          );
          if (toClose.length > 0) {
            closeDrawersWithAnimation(toClose);
          }
          return;
        }

        segments.pop(); // Remove current drawer
        targetPath = segments.join("/") || activeRoot;
      } else if (relativePath.startsWith("../")) {
        // Close to specific ancestor
        targetPath = resolveRelativePath(sourceDrawerPath, relativePath);
      } else {
        console.error("❌ [DrawerStack] Invalid close path:", relativePath);
        return;
      }

      // Find all drawers that should be closed (current + descendants)
      const toClose = Array.from(visibleDrawers).filter((path) => {
        return (
          path.length > targetPath.length &&
          (targetPath === "" || path.startsWith(targetPath + "/"))
        );
      });

      if (toClose.length > 0) {
        closeDrawersWithAnimation(toClose, () => {
          if (
            mountedRef.current &&
            targetPath &&
            !visibleDrawers.has(targetPath)
          ) {
            // If target is not currently visible, open it
            openDrawer(targetPath);
          }
        });
      }
    },
    [activeRoot, visibleDrawers, closeDrawersWithAnimation, openDrawer]
  );

  const openDrawerGlobal = useCallback(
    (namespace: string, drawerId: string) => {
      if (namespace === activeRoot) {
        openDrawer(drawerId);
      }
    },
    [activeRoot, openDrawer]
  );

  // ✅ Context value with currentDrawerPath
  const contextValue: DrawerStackContextType = useMemo(
    () => ({
      openDrawer,
      closeDrawer,
      openDrawerGlobal,
      registerDrawer,
      unregisterDrawer,
      visibleDrawers,
      closingDrawers,
      currentDrawerPath, // ✅ Added
    }),
    [registerDrawer, unregisterDrawer, visibleDrawers, closingDrawers]
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
            const { path, content, level, widthMultiplier } = registration;
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
                    "--drawer-width-multiplier": widthMultiplier || 1,
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
