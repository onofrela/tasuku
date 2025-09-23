// components/ui/Card.tsx
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  variant?: 'default' | 'elevated' | 'bordered';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  className?: string;
}

export const Card: React.FC<CardProps> = ({ 
  children, 
  variant = 'default',
  padding = 'md',
  className = ''
}) => {
  const variantClasses = {
    default: 'bg-surface border border-border',
    elevated: 'bg-surface-elevated border border-border-hover shadow-sm',
    bordered: 'bg-transparent border-2 border-border-active'
  };

  const paddingClasses = {
    none: 'p-0',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  };

  return (
    <div className={`rounded-xl transition-all duration-200 ${variantClasses[variant]} ${paddingClasses[padding]} ${className}`}>
      {children}
    </div>
  );
};