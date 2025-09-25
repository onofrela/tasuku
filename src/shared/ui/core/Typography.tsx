// components/ui/Typography.tsx
import React, { type JSX } from 'react';

interface TypographyProps {
  children: React.ReactNode;
  variant?: 'h1' | 'h2' | 'h3' | 'body' | 'caption';
  className?: string;
}

export const Typography: React.FC<TypographyProps> = ({ 
  children, 
  variant = 'body',
  className = '' 
}) => {
  const variantClasses = {
    h1: 'text-3xl font-bold tracking-tight text-foreground',
    h2: 'text-2xl font-semibold tracking-tight text-foreground',
    h3: 'text-lg font-medium text-foreground',
    body: 'text-base text-foreground-muted leading-relaxed',
    caption: 'text-sm text-foreground-subtle'
  };

  const Tag: keyof JSX.IntrinsicElements = variant === 'h1' ? 'h1'
    : variant === 'h2' ? 'h2'
    : variant === 'h3' ? 'h3'
    : variant === 'caption' ? 'span'
    : 'p';

  return (
    <Tag className={`${variantClasses[variant]} ${className}`}>
      {children}
    </Tag>
  );
};