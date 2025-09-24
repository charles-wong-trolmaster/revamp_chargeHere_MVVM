// hooks/useDrawerActions.ts
import { useDrawerContext } from "../containers/DrawersContainer";

export interface DrawerLevel {
  id?: string;
  title?: string;
  component: React.ReactNode;
  className?: string;
}

interface UseDrawerActionsReturn {
  openSubDrawer: (level: DrawerLevel, force?: boolean) => void;
  closeCurrentDrawer: () => void;
  closeAllDrawers: () => void;
  canOpenSubDrawer: boolean;
  isLastLevel: boolean;
  currentLevelIndex: number;
}

export const useDrawerActions = (): UseDrawerActionsReturn => {
  const context = useDrawerContext();

  const openSubDrawer = (level: DrawerLevel, force: boolean = false): void => {
    context.openSubDrawer(level, force);
  };

  return {
    openSubDrawer,
    closeCurrentDrawer: context.closeCurrentDrawer,
    closeAllDrawers: context.closeAllDrawers,
    canOpenSubDrawer: context.canOpenSubDrawer,
    isLastLevel: context.isLastLevel,
    currentLevelIndex: context.currentLevelIndex,
  };
};
