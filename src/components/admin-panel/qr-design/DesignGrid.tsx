import React from 'react';
import { DesignCard } from './DesignCard';
import type { Design } from './data/type';


interface DesignGridProps {
  designs: Design[];
  onEdit: (id: string) => void;
  onStatusChange: (id: string) => void;
  statusChangeLabel: string;
}

export const DesignGrid: React.FC<DesignGridProps> = ({ 
  designs, 
  onEdit, 
  onStatusChange,
  statusChangeLabel
}) => {
  if (designs.length === 0) {
    return (
      <div className="mt-6 md:p-8 text-center bg-white rounded-lg shadow-sm dark:bg-primary-dark dark:text-white">
        <p className="">No designs found in this category.</p>
      </div>
    );
  }

  return (
    <div className="mt-6">
      <h2 className="md:text-2xl text-lg text-[#333333] dark:text-[#FFFFFF] mb-6">
        {designs[0].status === 'available' ? 'Available Designs' : 
         designs[0].status === 'comingSoon' ? 'Upcoming Design ' : 
         'Unavailable Designs'}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {designs.map((design) => (
          <DesignCard
            key={design.id}
            design={design}
            onEdit={() => onEdit(design.id)}
            onStatusChange={() => onStatusChange(design.id)}
            statusChangeLabel={statusChangeLabel}
          />
        ))}
      </div>
    </div>
  );
};