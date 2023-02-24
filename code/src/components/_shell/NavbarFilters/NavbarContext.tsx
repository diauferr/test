import React, { createContext, useState } from 'react';

interface NavbarContextData {
  totalActiveFilters: number;
  getActiveFilters: (arg: number) => void;
  dateIntervalScope: string;
  getDateIntervalScope: (arg: string) => void;
  searchOpen: boolean;
  setSearchOpen: (arg: boolean) => void;
}

export const NavbarContext = createContext<NavbarContextData>(
  {} as NavbarContextData
);

export const NavbarProvider: React.FC = ({ children }) => {
  const [searchOpen, setSearchOpen] = useState<boolean>(false);
  const [totalActiveFilters, setTotalActiveFilters] = useState(0);
  const [dateIntervalScope, setDateIntervalScope] =
    useState('Em todas as datas');

  const getActiveFilters = (v: any) => setTotalActiveFilters(v);
  const getDateIntervalScope = (v: any) => setDateIntervalScope(v);

  return (
    <NavbarContext.Provider
      value={{
        searchOpen,
        setSearchOpen,
        totalActiveFilters,
        getActiveFilters,
        dateIntervalScope,
        getDateIntervalScope
      }}>
      {children}
    </NavbarContext.Provider>
  );
};
