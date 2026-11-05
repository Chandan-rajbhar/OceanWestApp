import React from 'react';

export const Badge = ({
  children,
  variant = 'galactic', // 'galactic', 'bubblegum', 'neutral', 'success', 'outline'
  size = 'md', // 'sm', 'md'
  icon: Icon,
  className = ''
}) => {
  const sizeStyles = {
    sm: 'text-[10px] px-2 py-0.5 gap-1 font-semibold rounded-full',
    md: 'text-xs px-2.5 py-1 gap-1.5 font-semibold rounded-full'
  };

  const variantStyles = {
    galactic: 'bg-[#4A2373]/10 text-[#4A2373] border border-[#4A2373]/25',
    bubblegum: 'bg-[#FE8500]/10 text-[#FE8500] border border-[#FE8500]/30',
    neutral: 'bg-slate-200/80 text-slate-700 border border-slate-300/60',
    success: 'bg-emerald-500/10 text-emerald-600 border border-emerald-500/25',
    dark: 'bg-slate-900 text-white border border-slate-800'
  };

  return (
    <span className={`inline-flex items-center tracking-tight select-none ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}>
      {Icon && <Icon className="w-3 h-3 shrink-0" />}
      <span>{children}</span>
    </span>
  );
};


