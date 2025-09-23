import React from 'react';

interface TagListProps {
  tags: string[];
  onTagClick?: (tag: string) => void;
  onTagDelete?: (tag: string) => void;
  showDelete?: boolean;
}

export const TagList: React.FC<TagListProps> = ({ 
  tags, 
  onTagClick,
  onTagDelete,
  showDelete = false 
}) => (
  <div className="flex flex-wrap gap-3">
    {tags.map((tag) => (
      <div
        key={tag}
        className="group relative"
      >
        <span
          className={`
            inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm border 
            transition-colors cursor-pointer
            bg-surface border-border hover:bg-surface-elevated hover:border-border-hover
            text-foreground-muted hover:text-foreground
            ${showDelete ? 'pr-8' : ''}
          `}
          onClick={() => onTagClick?.(tag)}
        >
          #{tag}
        </span>
        
        {showDelete && (
          <button
            onClick={() => onTagDelete?.(tag)}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 
                      opacity-0 group-hover:opacity-100 transition-opacity
                      w-5 h-5 flex items-center justify-center rounded-full
                      hover:bg-foreground hover:text-background text-foreground-muted"
            title="Eliminar tag"
          >
            ×
          </button>
        )}
      </div>
    ))}
  </div>
);