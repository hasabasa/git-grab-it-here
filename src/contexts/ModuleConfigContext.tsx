import React, { createContext, useContext } from 'react';

interface ModuleConfig {
  showStoreSelector: boolean;
  requiresStore: boolean;
  title: string;
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
    title: "Прайс-бот"
  },
  "/dashboard/sales": {
    showStoreSelector: true,
    requiresStore: true,
    title: "Аналитика продаж"
  },
  "/dashboard/tasks": {
    showStoreSelector: false,
    requiresStore: false,
    title: "Задачи и напоминания"
  },
  "/dashboard/unit-economics": {
    showStoreSelector: false,
    requiresStore: false,
    title: "Юнит-экономика"
  },
  "/dashboard/niche-search": {
    showStoreSelector: false,
    requiresStore: false,
    title: "Поиск ниш"
  },
  "/dashboard/preorders": {
    showStoreSelector: false,
    requiresStore: false,
    title: "Предзаказы"
  },
  "/dashboard/whatsapp": {
    showStoreSelector: false,
    requiresStore: false,
    title: "WhatsApp автоматизация"
  },
  "/dashboard/integration": {
    showStoreSelector: false,
    requiresStore: false,
    title: "Интеграции"
  },
  "/dashboard/subscription": {
    showStoreSelector: false,
    requiresStore: false,
    title: "Подписка"
  },
  "/dashboard/profile": {
    showStoreSelector: false,
    requiresStore: false,
    title: "Профиль"
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
