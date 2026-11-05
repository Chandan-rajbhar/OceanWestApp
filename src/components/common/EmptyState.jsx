import React from 'react';
import { Button } from './Button';

export const EmptyState = ({
  icon: Icon,
  title,
  description,
  actionText,
  onAction,
  className = ''
}) => {
  return (
    <div className={`flex flex-col items-center justify-center text-center p-8 bg-white/70 rounded-3xl border border-slate-200/80 ${className}`}>
      {Icon && (
        <div className="w-14 h-14 rounded-2xl bg-[#4A2373]/10 text-[#4A2373] flex items-center justify-center mb-3.5 shadow-sm">
          <Icon className="w-7 h-7" />
        </div>
      )}
      <h3 className="font-bold text-slate-800 text-base mb-1">{title}</h3>
      {description && <p className="text-xs text-slate-500 max-w-xs mb-4 leading-relaxed">{description}</p>}
      {actionText && onAction && (
        <Button variant="primary" size="sm" onClick={onAction}>
          {actionText}
        </Button>
      )}
    </div>
  );
};


