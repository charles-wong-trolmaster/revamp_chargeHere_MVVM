import React, {
  createContext,
  useCallback,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { useAppSelector } from "@/redux/store";
import LocationDrawerContainer from "./(location)/LocationDrawerContainer";
import SessionDrawerContainer from "./(session)/SessionDrawerContainer";
import "./MultiLevelDrawer.css";

export interface DrawerLevel {
  id?: string;
  title?: string;
  component: ReactNode;
  className?: string;
}

export interface DrawerContextValue {
  openSubDrawer: (level: DrawerLevel, force?: boolean) => void;
  closeCurrentDrawer: () => void;
  closeCurrentSubDrawer: () => void;
  closeAllDrawers: () => void;
  currentLevelIndex: number;
  isLastLevel: boolean;
  canOpenSubDrawer: boolean;
}

export const DrawerContext = createContext<DrawerContextValue | undefined>(
  undefined
);

export const useDrawerContext = (): DrawerContextValue => {
  const context = useContext(DrawerContext);
  if (!context) {
    throw new Error("useDrawerContext must be used within a DrawersContainer");
  }
  return context;
};

interface DrawersContainerProps {
  className?: string;
  drawerWidth?: number;
  spacing?: number;
  height?: number;
  maxLevels?: number;
  onLevelChange?: (levels: DrawerLevel[], openLevelIndexes: number[]) => void;
}

const DrawersContainer: React.FC<DrawersContainerProps> = ({
  className = "",
  maxLevels = 5,
  onLevelChange,
}) => {
  const selectedNavItemIndexRaw = useAppSelector(
    (state) => state.navBar.selectedIndex
  );

  // Handle undefined case and provide default value
  const selectedNavItemIndex = selectedNavItemIndexRaw ?? 0;

  // Map selectedNavItemIndex to drawer containers
  const getInitialDrawerContainer = (navIndex: number): ReactNode => {
    switch (navIndex) {
      case 0:
        return <LocationDrawerContainer />;
      case 1:
        return <SessionDrawerContainer />;
      case 2:
        return <></>;
      default:
        return <></>; // Default fallback
    }
  };

  const createInitialLevel = (navIndex: number): DrawerLevel => ({
    id: `nav-item-${navIndex}`,
    component: getInitialDrawerContainer(navIndex),
  });

  const [drawerStack, setDrawerStack] = useState<DrawerLevel[]>(() => [
    createInitialLevel(selectedNavItemIndex),
  ]);

  const [openLevels, setOpenLevels] = useState<number[]>([0]);

  // Reset drawer stack when selectedNavItemIndex changes
  useEffect(() => {
    const newInitialLevel = createInitialLevel(selectedNavItemIndex);
    setDrawerStack([newInitialLevel]);
    setOpenLevels([0]);
  }, [selectedNavItemIndex]);

  const openSubDrawer = useCallback(
    (level: DrawerLevel, force: boolean = false): void => {
      setDrawerStack((prev) => {
        // Check if a drawer with the same ID already exists anywhere in the stack
        const existingDrawerIndex = prev.findIndex(
          (existingLevel) => existingLevel.id === level.id
        );
        if (existingDrawerIndex !== -1) {
          return prev; // Don't add duplicate drawer - do nothing
        }

        const currentLevelIndex = prev.length - 1;

        // Remove any levels after the current one and add the new level
        let newStack = [...prev.slice(0, currentLevelIndex + 1), level];

        // If we're at max levels and not forcing, don't add
        if (!force && newStack.length > maxLevels) {
          return prev; // Return unchanged if can't add more levels
        }

        // If forcing or within limits, limit the number of levels
        if (newStack.length > maxLevels) {
          newStack = newStack.slice(-maxLevels);
        }

        return newStack;
      });

      setOpenLevels((prev) => {
        const currentLevelIndex = prev.length - 1;
        const newOpenLevels = [
          ...prev.filter((index) => index <= currentLevelIndex),
          currentLevelIndex + 1,
        ];
        // Adjust if we had to slice the stack
        const adjustedLevels = newOpenLevels.slice(-maxLevels);
        return adjustedLevels;
      });
    },
    [maxLevels]
  );

  const closeFromLevel = useCallback((levelIndex: number): void => {
    setDrawerStack((prev) => {
      // Keep only levels up to (but not including) the specified level
      return prev.slice(0, levelIndex);
    });

    setOpenLevels((prev) => {
      // Keep only open levels that are less than the specified level
      return prev.filter((openIndex) => openIndex < levelIndex);
    });
  }, []);

  const closeAllDrawers = useCallback((): void => {
    const initialLevel = createInitialLevel(selectedNavItemIndex);
    setDrawerStack([initialLevel]);
    setOpenLevels([0]);
  }, [selectedNavItemIndex]);

  // Notify parent of level changes
  useEffect(() => {
    onLevelChange?.(drawerStack, openLevels);
  }, [drawerStack, openLevels, onLevelChange]);

  return (
    <div className={`multi-level-drawer ${className}`}>
      <div className="drawer-container" style={{ height: "100%" }}>
        {drawerStack.map((level, index) => {
          const canOpenMore = drawerStack.length < maxLevels;

          return (
            <DrawerContext.Provider
              key={`${level.id || "level"}-${index}-${selectedNavItemIndex}`}
              value={{
                openSubDrawer: (level, force) => openSubDrawer(level, force),
                closeCurrentDrawer: () => closeFromLevel(index),
                closeCurrentSubDrawer: () => closeFromLevel(index + 1),
                closeAllDrawers,
                currentLevelIndex: index,
                isLastLevel: index === drawerStack.length - 1,
                canOpenSubDrawer: canOpenMore,
              }}
            >
              {level.component}
            </DrawerContext.Provider>
          );
        })}
      </div>
    </div>
  );
};

export default DrawersContainer;
