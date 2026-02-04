import React from 'react';
import { useApp } from '@/app/context/AppContext';
import { ContactCard } from '@/app/components/home/ContactCard';
import { AccessibilityControls } from '@/app/components/home/AccessibilityControls';
import { cn } from '@/lib/utils';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const HomeView: React.FC = () => {
  const { textSize, highContrast } = useApp();

  return (
    <div className={cn(
      "flex flex-col p-4 pb-32 min-h-full",
      highContrast ? "bg-black text-white" : "bg-slate-50 text-slate-900"
    )}>
      <header className="mb-6 mt-2">
        <h1 className={cn(
          "font-bold",
          textSize === 'extra-large' ? "text-4xl" : "text-3xl"
        )}>
          FamilyLink
        </h1>
        <p className={cn(
          "mt-1 opacity-70",
          textSize === 'extra-large' ? "text-xl" : "text-base"
        )}>
          Good Morning!
        </p>
      </header>

      <section className="mb-8">
        <h2 className={cn(
          "font-bold mb-4",
          textSize === 'extra-large' ? "text-3xl" : "text-2xl"
        )}>
          My Contacts
        </h2>
        <ContactCard />
      </section>

      <section>
        <h2 className={cn(
          "font-bold mb-4",
          textSize === 'extra-large' ? "text-3xl" : "text-2xl"
        )}>
          Quick Settings
        </h2>
        <AccessibilityControls />
      </section>
    </div>
  );
};
