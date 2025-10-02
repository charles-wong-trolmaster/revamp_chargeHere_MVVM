import React, { useContext, useEffect, useMemo } from "react";
import { DrawerStackContext } from "./DrawerStackContext";

// Types
export interface DrawerProps {
  id: string;
  title?: string;
  widthMultiplier?: number;
  children: React.ReactNode;
  onOpen?: () => void;
  onClose?: () => void;
  onOpenTransitionStart?: () => void;
  onOpenTransitionEnd?: () => void;
  onCloseTransitionStart?: () => void;
  onCloseTransitionEnd?: () => void;
}

// Context for child drawers
export const DrawerContext = React.createContext<{
  parentPath: string;
  level: number;
} | null>(null);

// NEW: Context for the current drawer's own path
export const CurrentDrawerPathContext = React.createContext<string>("");

// Main Component
const Drawer: React.FC<DrawerProps> = ({
  id,
  widthMultiplier,
  children,
  onOpen,
  onClose,
  onOpenTransitionStart,
  onOpenTransitionEnd,
  onCloseTransitionStart,
  onCloseTransitionEnd,
}) => {
  // Get context from DrawerStack
  const stackContext = useContext(DrawerStackContext);
  const parentContext = useContext(DrawerContext);

  if (!stackContext) {
    throw new Error("Drawer must be used within a DrawerStack");
  }

  // Path calculations
  const level = parentContext ? parentContext.level + 1 : 0;
  const fullPath = parentContext ? `${parentContext.parentPath}/${id}` : id;

  // Destructure the context methods we need
  const { registerDrawer, unregisterDrawer, visibleDrawers, closingDrawers } =
    stackContext;

  // Visibility state
  const isVisible = visibleDrawers.has(fullPath);
  const isClosing = closingDrawers.has(fullPath);

  // Child separation
  const { drawerChildren, content } = useMemo(() => {
    const drawerChildren: React.ReactElement<DrawerProps>[] = [];
    const content: React.ReactNode[] = [];

    React.Children.forEach(children, (child) => {
      if (React.isValidElement(child)) {
        // Debug logging for production
        console.log(`🔍 [${fullPath}] Analyzing child:`, {
          type: child.type,
          typeName: (child.type as any)?.name,
          displayName: (child.type as any)?.displayName,
          props: child.props,
        });

        const isDirectDrawer = child.type === Drawer;

        // Type-safe prop checking
        const props = child.props as any;

        // More aggressive detection - check for any component with id prop
        const hasIdProp = props && typeof props.id === "string";

        // Check displayName (works if you set it explicitly)
        const componentName =
          (child.type as any)?.displayName || (child.type as any)?.name || "";
        const hasDrawerDisplayName = componentName
          .toLowerCase()
          .includes("drawer");

        // VERY permissive: treat ANY component with an id prop as a potential drawer
        const isDrawerComponent =
          isDirectDrawer || hasDrawerDisplayName || hasIdProp;

        console.log(`🔍 [${fullPath}] Detection results:`, {
          isDirectDrawer,
          hasDrawerDisplayName,
          hasIdProp,
          isDrawerComponent,
          componentName,
        });

        if (isDrawerComponent && props?.id) {
          console.log(`✅ [${fullPath}] Treating as drawer child:`, props.id);
          drawerChildren.push(child as React.ReactElement<DrawerProps>);
        } else {
          console.log(`📄 [${fullPath}] Treating as content`);
          content.push(child);
        }
      } else {
        content.push(child);
      }
    });

    console.log(`📊 [${fullPath}] Final separation:`, {
      drawerChildren: drawerChildren.map((c) => c.props.id),
      contentCount: content.length,
    });

    return { drawerChildren, content };
  }, [children, fullPath]);

  // Context value for child drawers
  const contextValue = useMemo(
    () => ({
      parentPath: fullPath,
      level,
    }),
    [fullPath, level]
  );

  // NEW: Wrap the content with the current drawer path context
  const wrappedContent = useMemo(
    () => (
      <CurrentDrawerPathContext.Provider value={fullPath}>
        {content}
      </CurrentDrawerPathContext.Provider>
    ),
    [content, fullPath]
  );

  // Registration effect - use wrappedContent instead of content
  useEffect(() => {
    registerDrawer(fullPath, wrappedContent, widthMultiplier);
    return () => unregisterDrawer(fullPath);
  }, [
    fullPath,
    wrappedContent,
    widthMultiplier,
    registerDrawer,
    unregisterDrawer,
  ]);

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

  // Transition callbacks (simplified - you can enhance these based on your animation system)
  useEffect(() => {
    if (isVisible && !isClosing && onOpenTransitionStart) {
      onOpenTransitionStart();
    }
    if (isVisible && !isClosing && onOpenTransitionEnd) {
      // You might want to add a delay here based on your animation timing
      const timer = setTimeout(() => onOpenTransitionEnd(), 50);
      return () => clearTimeout(timer);
    }
  }, [isVisible, isClosing, onOpenTransitionStart, onOpenTransitionEnd]);

  useEffect(() => {
    if (isClosing && onCloseTransitionStart) {
      onCloseTransitionStart();
    }
    if (!isVisible && !isClosing && onCloseTransitionEnd) {
      onCloseTransitionEnd();
    }
  }, [isVisible, isClosing, onCloseTransitionStart, onCloseTransitionEnd]);

  return (
    <DrawerContext.Provider value={contextValue}>
      {drawerChildren.map((child, index) => (
        <React.Fragment key={child.props.id || index}>{child}</React.Fragment>
      ))}
    </DrawerContext.Provider>
  );
};

export default Drawer;
