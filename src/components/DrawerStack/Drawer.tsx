import React, { useContext, useEffect, useMemo, useRef } from "react";
import { useDrawer } from "./DrawerStack";

// Types
export interface DrawerProps {
  id: string;
  title?: string;
  widthMultiplier?: number;
  children: React.ReactNode;
  onOpen?: () => void;
  onClose?: () => void;
  onTransitionStart?: (isClosing: boolean) => void;
  onTransitionEnd?: (isClosing: boolean) => void;
}

// Context
export const DrawerContext = React.createContext<{
  parentPath: string;
  level: number;
} | null>(null);

// Helper function to deeply compare content
const hasContentChanged = (
  newContent: React.ReactNode[],
  oldContent: React.ReactNode[]
): boolean => {
  if (newContent.length !== oldContent.length) {
    return true;
  }

  return newContent.some((newItem, index) => {
    const oldItem = oldContent[index];

    // If references are the same, no change
    if (newItem === oldItem) {
      return false;
    }

    // If both are React elements, compare more deeply
    if (React.isValidElement(newItem) && React.isValidElement(oldItem)) {
      // Different component types
      if (newItem.type !== oldItem.type) {
        return true;
      }

      // Different keys
      if (newItem.key !== oldItem.key) {
        return true;
      }

      // Compare props (shallow comparison)
      const newProps = newItem.props || {};
      const oldProps = oldItem.props || {};
      const newPropKeys = Object.keys(newProps);
      const oldPropKeys = Object.keys(oldProps);

      if (newPropKeys.length !== oldPropKeys.length) {
        return true;
      }

      return newPropKeys.some((key) => {
        // Skip children comparison to avoid infinite recursion
        if (key === "children") {
          return false;
        }
        return newProps[key] !== oldProps[key];
      });
    }

    // For non-React elements, any difference means change
    return true;
  });
};

// Main Component
const Drawer: React.FC<DrawerProps> = ({
  id,
  widthMultiplier,
  children,
  onOpen,
  onClose,
  onTransitionStart,
  onTransitionEnd,
}) => {
  const { visibleDrawers, closingDrawers, registerDrawer, unregisterDrawer } =
    useDrawer();
  const parentContext = useContext(DrawerContext);

  // Path calculations
  const level = parentContext ? parentContext.level + 1 : 0;
  const fullPath = parentContext ? `${parentContext.parentPath}/${id}` : id;

  // State tracking refs
  const wasVisibleRef = useRef(false);
  const wasClosingRef = useRef(false);
  const lastContentRef = useRef<React.ReactNode[]>([]);
  const lastWidthMultiplierRef = useRef(widthMultiplier);
  const isRegisteredRef = useRef(false);
  const updateCountRef = useRef(0);

  // Visibility state
  const isVisible = visibleDrawers.has(fullPath);
  const isClosing = closingDrawers.has(fullPath);

  // Child separation
  const { drawerChildren, content } = useMemo(() => {
    const drawerChildren: React.ReactElement<DrawerProps>[] = [];
    const content: React.ReactNode[] = [];

    React.Children.forEach(children, (child) => {
      if (React.isValidElement(child)) {
        const componentName =
          (child.type as any)?.displayName || (child.type as any)?.name || "";
        const isDirectDrawer = child.type === Drawer;
        const looksLikeDrawer = componentName.toLowerCase().includes("drawer");

        if (isDirectDrawer || looksLikeDrawer) {
          const drawerProps = child.props as any;
          if (drawerProps?.id) {
            drawerChildren.push(child as React.ReactElement<DrawerProps>);
          } else {
            content.push(child);
          }
        } else {
          content.push(child);
        }
      } else {
        content.push(child);
      }
    });

    return { drawerChildren, content };
  }, [children]);

  // Context value
  const contextValue = useMemo(
    () => ({
      parentPath: fullPath,
      level,
    }),
    [fullPath, level]
  );

  // Initial registration effect
  useEffect(() => {
    if (!isRegisteredRef.current) {
      registerDrawer(fullPath, content, widthMultiplier);
      lastContentRef.current = [...content]; // Create a copy
      lastWidthMultiplierRef.current = widthMultiplier;
      isRegisteredRef.current = true;

      if (id === "location") {
        // Debug logging
        console.log(`[${id}] Initial registration`);
      }
    }

    return () => {
      unregisterDrawer(fullPath);
      isRegisteredRef.current = false;
    };
  }, [fullPath, registerDrawer, unregisterDrawer]);

  // Content update effect with throttling
  useEffect(() => {
    if (isRegisteredRef.current) {
      const contentChanged = hasContentChanged(content, lastContentRef.current);
      const widthChanged = widthMultiplier !== lastWidthMultiplierRef.current;

      if (contentChanged || widthChanged) {
        updateCountRef.current++;

        if (id === "location") {
          // Debug logging
          console.log(`[${id}] Content update #${updateCountRef.current}`, {
            contentChanged,
            widthChanged,
            contentLength: content.length,
            lastContentLength: lastContentRef.current.length,
          });
        }

        registerDrawer(fullPath, content, widthMultiplier);
        lastContentRef.current = [...content]; // Create a copy
        lastWidthMultiplierRef.current = widthMultiplier;
      }
    }
  });

  // Lifecycle callbacks
  useEffect(() => {
    if (isVisible && !isClosing && onOpen) {
      onOpen();
    }
  }, [isVisible, isClosing, onOpen]);

  useEffect(() => {
    if (isClosing && onClose) {
      onClose();
    }
  }, [isClosing, onClose]);

  // Transition start callback
  useEffect(() => {
    if ((isVisible || isClosing) && onTransitionStart) {
      onTransitionStart(isClosing);
    }
  }, [isVisible, isClosing, onTransitionStart]);

  // Transition end callback
  useEffect(() => {
    const wasVisible = wasVisibleRef.current;
    const wasClosingState = wasClosingRef.current;

    wasVisibleRef.current = isVisible;
    wasClosingRef.current = isClosing;

    const transitionEnded =
      (!wasVisible && isVisible && !isClosing) ||
      (wasClosingState && !isVisible && !isClosing);

    if (transitionEnded && onTransitionEnd) {
      const wasClosingTransition = wasClosingState && !isVisible;
      onTransitionEnd(wasClosingTransition);
    }
  }, [isVisible, isClosing, onTransitionEnd]);

  return (
    <DrawerContext.Provider value={contextValue}>
      {drawerChildren.map((child, index) => (
        <React.Fragment key={child.props.id || index}>{child}</React.Fragment>
      ))}
    </DrawerContext.Provider>
  );
};

export default Drawer;
