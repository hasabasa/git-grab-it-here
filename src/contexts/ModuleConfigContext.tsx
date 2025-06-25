
import React, { createContext, useContext } from 'react';

interface ModuleConfig {
  showStoreSelector: boolean;
  requiresStore: boolean;
  title: string;
  allowAllStores: boolean;
  showSelector: boolean;
}

interface ModuleConfigContextProps {
  currentConfig: ModuleConfig | null;
  getConfigForRoute: (route: string) => ModuleConfig | null;
}

const ModuleConfigContext = createContext<ModuleConfigContextProps>({
  currentConfig: null,
  getConfigForRoute: () => null,
});

export const useModuleConfig = () => useContext(ModuleConfigContext);

interface ModuleConfigProviderProps {
  children: React.ReactNode;
}

const moduleConfigs: Record<string, ModuleConfig> = {
  "/dashboard/price-bot": {
    showStoreSelector: true,
    requiresStore: true,
    title: "Прайс-бот",
    allowAllStores: true,
    showSelector: true
  },
  "/dashboard/sales": {
    showStoreSelector: true,
    requiresStore: true,
    title: "Аналитика продаж",
    allowAllStores: true,
    showSelector: true
  },
  "/dashboard/tasks": {
    showStoreSelector: false,
    requiresStore: false,
    title: "Задачи и напоминания",
    allowAllStores: false,
    showSelector: false
  },
  "/dashboard/unit-economics": {
    showStoreSelector: false,
    requiresStore: false,
    title: "Юнит-экономика",
    allowAllStores: false,
    showSelector: false
  },
  "/dashboard/niche-search": {
    showStoreSelector: false,
    requiresStore: false,
    title: "Поиск ниш",
    allowAllStores: false,
    showSelector: false
  },
  "/dashboard/preorders": {
    showStoreSelector: false,
    requiresStore: false,
    title: "Предзаказы",
    allowAllStores: false,
    showSelector: false
  },
  "/dashboard/whatsapp": {
    showStoreSelector: false,
    requiresStore: false,
    title: "WhatsApp автоматизация",
    allowAllStores: false,
    showSelector: false
  },
  "/dashboard/integration": {
    showStoreSelector: false,
    requiresStore: false,
    title: "Интеграции",
    allowAllStores: false,
    showSelector: false
  },
  "/dashboard/subscription": {
    showStoreSelector: false,
    requiresStore: false,
    title: "Подписка",
    allowAllStores: false,
    showSelector: false
  },
  "/dashboard/profile": {
    showStoreSelector: false,
    requiresStore: false,
    title: "Профиль",
    allowAllStores: false,
    showSelector: false
  }
};

export const ModuleConfigProvider: React.FC<ModuleConfigProviderProps> = ({ children }) => {
  const getConfigForRoute = (route: string) => {
    return moduleConfigs[route] || null;
  };

  const currentRoute = window.location.pathname;
  const currentConfig = getConfigForRoute(currentRoute);

  return (
    <ModuleConfigContext.Provider value={{ currentConfig, getConfigForRoute }}>
      {children}
    </ModuleConfigContext.Provider>
  );
};
