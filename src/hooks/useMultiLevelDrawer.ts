import { useCallback, useState, useEffect } from "react";
import type { ReactNode } from "react";

export interface DrawerLevel {
  id?: string;
  title?: string;
  component: ReactNode;
  className?: string;
}

interface UseMultiLevelDrawerOptions {
  maxLevels?: number;
  onLevelChange?: (levels: DrawerLevel[], openLevelIndexes: number[]) => void;
  initialLevel?: DrawerLevel;
}

export const useMultiLevelDrawer = ({
  maxLevels = 5,
  onLevelChange,
  initialLevel,
}: UseMultiLevelDrawerOptions = {}) => {
  const [drawerStack, setDrawerStack] = useState<DrawerLevel[]>([]);
  const [openLevels, setOpenLevels] = useState<number[]>([]);

  const openSubDrawer = useCallback(
    (levelIndex: number, level: DrawerLevel, force: boolean = false): void => {
      setDrawerStack((prev) => {
        // Remove any levels after the current one and add the new level
        let newStack = [...prev.slice(0, levelIndex + 1), level];

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
        const newOpenLevels = [
          ...prev.filter((index) => index <= levelIndex),
          levelIndex + 1,
        ];
        // Adjust if we had to slice the stack
        const adjustedLevels = newOpenLevels.slice(-maxLevels);
        return adjustedLevels;
      });
    },
    [maxLevels]
  );

  const closeCurrentDrawer = useCallback((): void => {
    setDrawerStack((prev) => {
      if (prev.length <= 1) return prev;
      return prev.slice(0, -1);
    });

    setOpenLevels((prev) => {
      if (prev.length <= 1) return prev;
      return prev.slice(0, -1);
    });
  }, []);

  const closeAllDrawers = useCallback((): void => {
    if (initialLevel) {
      setDrawerStack([initialLevel]);
      setOpenLevels([0]);
    } else {
      setDrawerStack([]);
      setOpenLevels([]);
    }
  }, [initialLevel]);

  const closeFromIndex = useCallback((index: number): void => {
    // Don't allow closing the initial level (index 0)
    if (index <= 0) return;

    setDrawerStack((prev) => {
      // Keep only levels up to (but not including) the specified index
      return prev.slice(0, index);
    });

    setOpenLevels((prev) => {
      // Keep only open levels that are less than the specified index
      return prev.filter((levelIndex) => levelIndex < index);
    });
  }, []);

  const canOpenSubDrawer = drawerStack.length < maxLevels;

  // Notify parent of level changes
  useEffect(() => {
    onLevelChange?.(drawerStack, openLevels);
  }, [drawerStack, openLevels, onLevelChange]);

  return {
    drawerStack,
    openLevels,
    openSubDrawer,
    closeCurrentDrawer,
    closeAllDrawers,
    closeFromIndex,
    canOpenSubDrawer,
  };
};
