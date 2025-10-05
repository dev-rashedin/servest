'use client';
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { useSidebar } from './SidebarToggleContext';
import RightSidebar from './RightSidebar';

interface Heading { id: string; text: string; level: number }

export default function RightSidebarPortal({ clientHeadings }: { clientHeadings: Heading[] }) {
  const { rightSidebarOpen } = useSidebar();
  const [mount, setMount] = useState<Element | null>(null);

  useEffect(() => {
    // find the portal target rendered by MobileUI
    const target = document.getElementById('right-sidebar-portal-content');
    setMount(target);
  }, []);

  if (!mount) return null;

  // only render into portal when drawer is open (MobileUI controls visibility too)
  return rightSidebarOpen
    ? ReactDOM.createPortal(<RightSidebar clientHeadings={clientHeadings} />, mount)
    : null;
}
