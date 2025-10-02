import { createContext } from 'react';

export interface DrawerStackContextType {
  openDrawer: (drawerIdOrPath: string, sourceDrawerPath?: string) => void;
  closeDrawer: (relativePath?: string, sourceDrawerPath?: string) => void;
  openDrawerGlobal: (namespace: string, drawerId: string) => void;
  registerDrawer: (path: string, content: React.ReactNode, widthMultiplier?: number) => void;
  unregisterDrawer: (path: string) => void;
  visibleDrawers: Set<string>;
  closingDrawers: Set<string>;
  currentDrawerPath: string; // ✅ Added
}

export const DrawerStackContext = createContext<DrawerStackContextType | null>(null);