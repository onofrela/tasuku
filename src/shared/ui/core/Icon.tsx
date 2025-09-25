// src/components/ui/Icon.tsx
import React from 'react';

interface IconProps {
  children: React.ReactNode;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  onClick?: () => void;
}

export const Icon: React.FC<IconProps> = ({ 
  children, 
  size = 'md',
  className = '',
  onClick 
}) => {
  const sizeClasses = {
    xs: 'w-3 h-3',
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
    xl: 'w-8 h-8'
  };

  return (
    <span 
      className={`
        inline-flex items-center justify-center
        ${sizeClasses[size]}
        ${onClick ? 'cursor-pointer transition-colors duration-200 hover:text-foreground' : ''}
        ${className}
      `}
      onClick={onClick}
      style={{
        // Estilo Vercel: íconos precisos y limpios
        strokeWidth: 1.5,
        flexShrink: 0
      }}
    >
      {children}
    </span>
  );
};