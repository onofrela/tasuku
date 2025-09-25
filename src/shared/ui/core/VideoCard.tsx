import React from 'react';
import { Card } from './Card';

interface VideoCardProps {
  title: string;
  description: string;
  children?: React.ReactNode;
}

export const VideoCard: React.FC<VideoCardProps> = ({ title, description, children }) => (
  <Card variant="elevated" padding="none" className="overflow-hidden">
    <div className="h-40 bg-gradient-to-r from-border to-border-hover flex items-center justify-center">
      {children}
    </div>
    <div className="p-4">
      <h3 className="font-medium mb-2 text-foreground">{title}</h3>
      <p className="text-sm text-foreground-muted">{description}</p>
    </div>
  </Card>
);