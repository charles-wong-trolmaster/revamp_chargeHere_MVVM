import { CurrentDrawerPathContext } from "@/components/DrawerStack/Drawer";
import { DrawerStackContext } from "@/components/DrawerStack/DrawerStackContext";
import { useContext } from "react";

export const useDrawer = () => {
  const context = useContext(DrawerStackContext);
  const currentDrawerPath = useContext(CurrentDrawerPathContext); // Get the specific drawer's path

  if (!context) {
    throw new Error("useDrawer must be used within a DrawerStack");
  }

  const {
    openDrawer,
    closeDrawer,
    currentDrawerPath: globalCurrentPath,
  } = context;

  // Use the specific drawer's path if available, fallback to global current path
  const effectivePath = currentDrawerPath || globalCurrentPath;

  return {
    currentPath: effectivePath, // Path of THIS drawer
    activeDrawerPath: globalCurrentPath, // Path of the currently active/top drawer
    openDrawer: (relativePath: string) =>
      openDrawer(relativePath, effectivePath),
    closeDrawer: (relativePath?: string) =>
      closeDrawer(relativePath, effectivePath),
    openChild: (childId: string) => openDrawer(`./${childId}`, effectivePath),
    openSibling: (siblingId: string) =>
      openDrawer(`../${siblingId}`, effectivePath),
    closeCurrent: () => closeDrawer("..", effectivePath),
  };
};
