import React from 'react';
import { Card } from './Card';
import { Typography } from './Typography';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'md'
}) => {
  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl'
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div 
        className={`w-full ${sizeClasses[size]} animate-in fade-in duration-200`}
        onClick={(e) => e.stopPropagation()}
      >
        <Card variant="elevated" padding="lg" className="relative">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <Typography variant="h3">{title}</Typography>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-surface text-foreground-muted hover:text-foreground"
            >
              ×
            </button>
          </div>
          
          {/* Content */}
          {children}
        </Card>
      </div>
    </div>
  );
};