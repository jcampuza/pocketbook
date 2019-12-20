import React, { useContext } from 'react';
import { useLocalStore } from 'mobx-react';
import { AppStorage } from '../util/storage';
import { SettingsStore } from './SettingsStore';
import { NotificationStore } from './NotificationStore';
import { ThemeStore } from './ThemeStore';
import { ScriptStore } from './ScriptStore';

export const createStore = () => {
  const storage = new AppStorage(localStorage);
  const settingsStore = new SettingsStore(storage);
  const notificationStore = new NotificationStore();
  const themeStore = new ThemeStore(storage);
  const scriptStore = new ScriptStore(storage);

  return {
    storage,
    settingsStore: settingsStore,
    notificationStore: notificationStore,
    scriptStore: scriptStore,
    themeStore: themeStore,
  };
};

export type RootStore = ReturnType<typeof createStore>;

export const StoreContext = React.createContext<RootStore | null>(null);

interface StoreProviderProps {
  children: React.ReactNode;
}

export const StoreProvider = ({ children }: StoreProviderProps) => {
  const store = useLocalStore(createStore);

  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};

export const useStore = () => {
  const store = useContext(StoreContext);

  if (!store) {
    throw new Error('No Context found in component tree');
  }

  return store;
};
