import React, { useState } from "react";

interface Props {
  initialData?: {
    name?: string;
    mail?: string;
    address?: string;
    image?: string;
  };
  onSave: (data: {
    name: string;
    mail: string;
    address: string;
    image: string;
  }) => void;
  loading?: boolean;
}

const RestaurantUpdateForm: React.FC<Props> = ({
  initialData,
  onSave,
  loading,
}) => {
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    mail: initialData?.mail || "",
    address: initialData?.address || "",
    image: initialData?.image || "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    onSave(formData);
  };

  return (
    <div className="bg-gray-50 p-4 sm:p-6 rounded-md space-y-4 w-full max-w-lg">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Restaurant Name
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full mt-1 px-4 py-2 border rounded-md bg-white focus:outline-none focus:ring focus:ring-green-300"
          placeholder="Enter Restaurant Name"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          E-mail
        </label>
        <input
          type="email"
          name="mail"
          value={formData.mail}
          onChange={handleChange}
          className="w-full mt-1 px-4 py-2 border rounded-md bg-white focus:outline-none focus:ring focus:ring-green-300"
          placeholder="Enter your email"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Address
        </label>
        <textarea
          name="address"
          value={formData.address}
          onChange={handleChange}
          className="w-full mt-1 px-4 py-2 border rounded-md bg-white focus:outline-none focus:ring focus:ring-green-300"
          placeholder="Enter address"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Image</label>
        <input
          type="text"
          name="image"
          value={formData.image}
          onChange={handleChange}
          className="w-full mt-1 px-4 py-2 border rounded-md bg-white focus:outline-none focus:ring focus:ring-green-300"
          placeholder="Paste image URI or upload"
        />
      </div>

      <button
        className="mt-4 w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 rounded-md"
        onClick={handleSave}
        disabled={loading}
      >
        {loading ? "Saving Restaurant..." : "Save Restaurant"}
      </button>
    </div>
  );
};

export default RestaurantUpdateForm;
