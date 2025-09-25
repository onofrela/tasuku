import React from 'react';

interface SidebarUserProps {
  username: string;
  initials?: string;
}

export const SidebarUser: React.FC<SidebarUserProps> = ({ username, initials = 'US' }) => (
  <div className="flex items-center gap-3 text-foreground-muted px-4 py-2">
    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-border-hover to-border-active flex items-center justify-center text-foreground text-xs font-medium">
      {initials}
    </div>
    <span className="text-sm">{username}</span>
  </div>
);