// src/components/app/SidebarMenu.tsx
import React from 'react';

interface MenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

interface SidebarMenuProps {
  items: MenuItem[];
  selected: string;
  onSelect: (id: string) => void;
}

export const SidebarMenu: React.FC<SidebarMenuProps> = ({ items, selected, onSelect }) => (
  <ul className="flex flex-col gap-2 flex-1">
    {items.map((item) => (
      <li key={item.id}>
        <button
          onClick={() => onSelect(item.id)}
          className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 flex items-center gap-3 border border-transparent ${
            selected === item.id
              ? 'bg-surface text-foreground border-border-active'
              : 'text-foreground-muted hover:bg-surface hover:text-foreground hover:border-border-hover'
          }`}
        >
          <span className="flex-shrink-0" style={{ width: '20px', height: '20px' }}>
            {item.icon}
          </span>
          <span className="truncate">{item.label}</span>
        </button>
      </li>
    ))}
  </ul>
);