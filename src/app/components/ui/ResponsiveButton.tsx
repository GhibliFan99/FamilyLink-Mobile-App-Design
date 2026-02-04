import React from 'react';
import { useApp } from '@/app/context/AppContext';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

// Simple utility if @/lib/utils doesn't exist (I will create it if needed, or just inline it)
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ResponsiveButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'info' | 'purple' | 'danger';
  icon?: LucideIcon;
  label?: string;
}

export const ResponsiveButton: React.FC<ResponsiveButtonProps> = ({
  className,
  variant = 'primary',
  icon: Icon,
  label,
  children,
  ...props
}) => {
  const { buttonSize, highContrast, textSize } = useApp();

  // Size styles
  const sizeStyles = {
    normal: 'h-14 px-4 text-lg',
    large: 'h-20 px-6 text-xl',
    'extra-large': 'h-24 px-8 text-2xl',
  };

  // Text size override for the button label if needed
  const textStyles = {
    small: 'text-base',
    medium: 'text-lg',
    large: 'text-xl',
    'extra-large': 'text-2xl',
  };

  // Color styles
  const getColors = () => {
    if (highContrast) {
      return 'bg-black text-white border-2 border-white hover:bg-gray-900 shadow-none ring-2 ring-white';
    }
    
    switch (variant) {
      case 'success': // Call (Green)
        return 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-md shadow-emerald-200';
      case 'info': // Video Call (Blue)
        return 'bg-blue-500 hover:bg-blue-600 text-white shadow-md shadow-blue-200';
      case 'purple': // Message (Purple)
        return 'bg-purple-500 hover:bg-purple-600 text-white shadow-md shadow-purple-200';
      case 'danger': // End Call
        return 'bg-red-500 hover:bg-red-600 text-white shadow-md shadow-red-200';
      case 'secondary':
        return 'bg-gray-200 hover:bg-gray-300 text-gray-900';
      default:
        return 'bg-indigo-600 hover:bg-indigo-700 text-white';
    }
  };

  return (
    <button
      className={cn(
        'w-full rounded-2xl font-bold flex items-center justify-center gap-3 transition-all active:scale-95 touch-manipulation',
        sizeStyles[buttonSize],
        getColors(),
        className
      )}
      {...props}
    >
      {Icon && <Icon className={cn("shrink-0", buttonSize === 'extra-large' ? 'w-10 h-10' : 'w-7 h-7')} />}
      <span className={cn(textStyles[textSize], "leading-tight")}>
        {label || children}
      </span>
    </button>
  );
};
