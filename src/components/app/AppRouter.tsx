import React, { useState, useEffect } from 'react';
import { SidebarMenu } from '../ui/SidebarMenu';
import { SidebarUser } from '../ui/SidebarUser';
import { HamburgerButton } from '../ui/HamburgerButton';

interface Route {
  id: string;
  label: string;
  icon: React.ReactNode;
  component: React.ReactNode;
}

interface AppRouterProps {
  routes: Route[];
}

export const AppRouter: React.FC<AppRouterProps> = ({ routes }) => {
  const [selected, setSelected] = useState(routes[0].id);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const currentRoute = routes.find(r => r.id === selected);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSelect = (id: string) => {
    setSelected(id);
    if (window.innerWidth < 1024) {
      setIsSidebarOpen(false);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="bg-background text-foreground h-screen">
      {/* Header móvil */}
      <header className="lg:hidden flex items-center justify-between p-4 border-b border-border bg-background sticky top-0 z-40">
        <h1 className="text-xl font-bold tracking-tight">Tasuku</h1>
        <HamburgerButton isOpen={isSidebarOpen} onToggle={toggleSidebar} />
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4">
        {/* Overlay para móviles */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <div className={`
          h-screen
          fixed lg:static inset-y-0 left-0 z-40
          w-80 lg:w-full
          bg-background border-r border-border
          transform transition-transform duration-300 ease-in-out
          lg:transform-none lg:translate-x-0
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:col-span-1
          flex flex-col
        `}>
          <div className="p-6 flex flex-col h-full">
            <h1 className="text-2xl font-bold mb-10 tracking-tight hidden lg:block">Tasuku</h1>
            
            <SidebarMenu
              items={routes.map(({ id, label, icon }) => ({ id, label, icon }))}
              selected={selected}
              onSelect={handleSelect}
            />
            
            <div className="pt-6 border-t border-border mt-auto">
              <SidebarUser username="Usuario" initials="US" />
            </div>
          </div>
        </div>

        {/* Contenido principal */}
        <div className="lg:col-span-3 p-6 lg:p-8 relative z-10 h-screen overflow-y-auto">
          {currentRoute?.component}
        </div>
      </div>
    </div>
  );
};