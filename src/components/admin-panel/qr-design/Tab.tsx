import React from 'react';

interface Tab {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  activeTab: string;
  onChange: (tabId: string) => void;
}

export const Tabs: React.FC<TabsProps> = ({ tabs, activeTab, onChange }) => {
  return (
    <div className="border-b border-[#DDDDDD] dark:border-gray-800">
      <nav className="lg:flex space-x-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`whitespace-nowrap py-4  border-b-2  text-sm transition-all duration-200 ease-in-out font-light ${
              activeTab === tab.id
               ? ' text-black border-[#333333] dark:text-white font-normal dark:border-white '
                          : 'text-gray-700  dark:text-gray-300 border-transparent dark:hover:text-white'
            }`}
            onClick={() => onChange(tab.id)}
          >
            <div className="flex items-center space-x-2">
              
              <span>{tab.label}</span>
            </div>
          </button>
        ))}
      </nav>
    </div>
  );
};