import React from 'react';
import { Utensils } from 'lucide-react';

interface RestaurantHeaderProps {
  name: string;
  address: string;
  logo?: string;
}

const RestaurantHeader: React.FC<RestaurantHeaderProps> = ({ 
  name, 
  address, 
  logo 
}) => {
  return (
    <header className="flex items-center space-x-4  mb-6">
      <div className="w-12 h-12 bg-teal-500 rounded-full flex items-center justify-center">
        {logo ? (
          <img src={logo} alt={`${name} logo`} className="w-full h-full rounded-full object-cover" />
        ) : (
          <Utensils size={24} className="text-white" />
        )}
      </div>
      <div>
        <h1 className="text-2xl font-normal text-[#484B52] dark:text-white">{name}</h1>
        <p className="text-sm text-[#696A73] dark:text-white">{address}</p>
      </div>
    </header>
  );
};

export default RestaurantHeader;