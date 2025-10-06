'use client';
import React, { createContext, useContext, useState } from 'react';

interface SidebarCtx {
  sidebarOpen: boolean;
  setSidebarOpen: (v: boolean) => void;
  rightSidebarOpen: boolean;
  setRightSidebarOpen: (v: boolean) => void;
}

const SidebarContext = createContext<SidebarCtx | undefined>(undefined);

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [rightSidebarOpen, setRightSidebarOpen] = useState(false);

  return (
    <SidebarContext.Provider
      value={{ sidebarOpen, setSidebarOpen, rightSidebarOpen, setRightSidebarOpen }}
    >
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  const ctx = useContext(SidebarContext);
  if (!ctx) throw new Error('useSidebar must be used within SidebarProvider');
  return ctx;
}
