import React from "react";

interface TablePropertiesProps {
  numTables: string;
  setNumTables: (value: string) => void;
  capacity: string;
  setCapacity: (value: string) => void;
  onGenerateQRCode?: () => void;
  isGenerating?: boolean;  // Added this prop
}

const TableProperties: React.FC<TablePropertiesProps> = ({
  numTables,
  setNumTables,
  capacity,
  setCapacity,
  onGenerateQRCode,
  isGenerating = false,  // default to false
}) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow dark:bg-primary-dark">
      <h2 className="font-medium mb-4 dark:text-white">Table Properties</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm text-gray-600 mb-1 dark:text-white">
            Number of Tables
          </label>
          <input
            type="number"
            value={numTables}
            onChange={(e) => setNumTables(e.target.value)}
            className="w-full border rounded-md p-2 dark:text-white"
            disabled={isGenerating}  // disable input while generating
          />
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1 dark:text-white">
            Capacity
          </label>
          <input
            type="number"
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
            className="w-full border rounded-md p-2"
            disabled={isGenerating}  // disable input while generating
          />
        </div>
        <button
          className="w-full bg-teal-500 text-white py-2 px-4 rounded-full hover:bg-teal-600 disabled:bg-teal-300"
          onClick={onGenerateQRCode}
          disabled={isGenerating}  // disable button while generating
        >
          {isGenerating ? "Generating..." : "Generate QR Code"}
        </button>
      </div>
    </div>
  );
};

export default TableProperties;
