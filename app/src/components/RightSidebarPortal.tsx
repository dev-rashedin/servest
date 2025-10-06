'use client';
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { useSidebar } from './SidebarToggleContext';
import RightSidebar from './RightSidebar';

export default function RightSidebarPortal({ clientHeadings }: { clientHeadings: Heading[] }) {
  const { rightSidebarOpen } = useSidebar();
  const [mount, setMount] = useState<Element | null>(null);

  // finding the portal target rendered by DrawerContainer
  useEffect(() => {
    const target = document.getElementById('right-sidebar-portal-content');
    setMount(target);
  }, []);

  if (!mount) return null;

  // only rendering into portal when drawer is open (DrawerContainer controls visibility too)
  return rightSidebarOpen
    ? ReactDOM.createPortal(<RightSidebar clientHeadings={clientHeadings} />, mount)
    : null;
}
