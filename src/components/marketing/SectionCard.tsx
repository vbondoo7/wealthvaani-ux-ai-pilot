
import React, { ReactNode } from 'react';

interface SectionCardProps {
  title: string;
  description: string;
  children?: ReactNode;
}

export const SectionCard: React.FC<SectionCardProps> = ({ title, description, children }) => {
  return (
    <div className="bg-white border rounded-lg overflow-hidden">
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-muted-foreground mb-4">{description}</p>
        {children}
      </div>
    </div>
  );
};
