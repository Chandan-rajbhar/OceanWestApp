import React from 'react';

export const Button = ({
  children,
  variant = 'primary', // 'primary', 'accent', 'outline', 'ghost', 'glass', 'dark'
  size = 'md', // 'sm', 'md', 'lg'
  icon: Icon,
  iconPosition = 'left',
  loading = false,
  disabled = false,
  fullWidth = false,
  className = '',
  onClick,
  type = 'button',
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-2xl transition-all duration-200 active:scale-[0.98] select-none cursor-pointer focus:outline-none';

  const sizeStyles = {
    sm: 'text-xs px-3.5 py-2 gap-1.5 min-h-[36px]',
    md: 'text-sm px-5 py-2.5 gap-2 min-h-[44px]',
    lg: 'text-base px-6 py-3.5 gap-2.5 min-h-[50px]'
  };

  const variantStyles = {
    // 30% Galactic Violet
    primary: 'bg-[#4A2373] text-white hover:bg-[#3A195C] shadow-md shadow-[#4A2373]/25 border border-[#4A2373]/30 active:bg-[#003cb8]',
    // 10% Bubblegum Pink
    accent: 'bg-[#FE8500] text-white hover:bg-[#e67700] shadow-md shadow-[#FE8500]/30 border border-[#FE8500]/30 active:bg-[#cc6a00]',
    outline: 'bg-white/80 hover:bg-white text-slate-800 border border-slate-200/90 hover:border-[#4A2373]/40 shadow-sm',
    ghost: 'bg-transparent hover:bg-slate-200/60 text-slate-700 active:bg-slate-200',
    glass: 'glass-panel text-slate-900 hover:bg-white/90 shadow-sm border border-white/60',
    dark: 'bg-[#0f141f] text-white hover:bg-[#1a2233] shadow-md shadow-black/20'
  };

  const widthStyle = fullWidth ? 'w-full' : '';
  const disabledStyle = disabled || loading ? 'opacity-50 cursor-not-allowed pointer-events-none' : '';

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${widthStyle} ${disabledStyle} ${className}`}
      {...props}
    >
      {loading ? (
        <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
      ) : (
        Icon && iconPosition === 'left' && <Icon className="w-4 h-4 shrink-0" />
      )}
      <span>{children}</span>
      {!loading && Icon && iconPosition === 'right' && <Icon className="w-4 h-4 shrink-0" />}
    </button>
  );
};


