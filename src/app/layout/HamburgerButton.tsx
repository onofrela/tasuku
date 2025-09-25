import React from 'react';

interface HamburgerButtonProps {
  isOpen: boolean;
  onToggle: () => void;
}

export const HamburgerButton: React.FC<HamburgerButtonProps> = ({ isOpen, onToggle }) => (
  <button
    onClick={onToggle}
    className="lg:hidden flex flex-col justify-center items-center w-8 h-8 relative focus:outline-none focus:ring-2 focus:ring-border rounded"
    aria-label="Toggle menu"
  >
    <span
      className={`w-6 h-0.5 bg-foreground transition-all duration-200 ${
        isOpen ? 'rotate-45 translate-y-1' : '-translate-y-1'
      }`}
    />
    <span
      className={`w-6 h-0.5 bg-foreground transition-all duration-200 my-1 ${
        isOpen ? 'opacity-0' : 'opacity-100'
      }`}
    />
    <span
      className={`w-6 h-0.5 bg-foreground transition-all duration-200 ${
        isOpen ? '-rotate-45 -translate-y-1' : 'translate-y-1'
      }`}
    />
  </button>
);