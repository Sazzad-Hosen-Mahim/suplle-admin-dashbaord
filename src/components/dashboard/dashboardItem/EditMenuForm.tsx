import React from "react";
import { useFormContext } from "react-hook-form";
import type { MenuCategory, FullMenuItem } from "./data/Type";
import SuppleForm from "@/components/Forms/SuplleForm";
import SuppleInput from "@/components/Forms/SuppleInput";
import SuppleTextarea from "@/components/Forms/SuppleTextarea";
import SuppleFileUpload from "@/components/Forms/SuppleFileUpload";
import SuppleSelect from "@/components/Forms/SuppleDropdown";
import { SelectItem } from "@radix-ui/react-select";
import { Upload } from "lucide-react";

interface EditMenuFormProps {
  categories: MenuCategory[];
  onAddItem: (item: Omit<FullMenuItem, "id">) => void;
  onClose: () => void;
}

const CategorySelect = ({ categories }: { categories: MenuCategory[] }) => {
  const { register } = useFormContext();

  return (
    <div>
      <label className="text-sm font-medium block mb-2">Category*</label>
      <select
        className="w-full p-3 h-[45px] rounded-md border border-gray-300"
        {...register("category", { required: true })}
      >
        {categories.map((cat) => (
          <option key={cat._id} value={cat._id}>
            {cat._id}
          </option>
        ))}
      </select>
    </div>
  );
};

const EditMenuForm: React.FC<EditMenuFormProps> = ({
  categories,
  onAddItem,
  onClose,
}) => {
  const defaultValues: Omit<FullMenuItem, "_id"> = {
    itemName: "",
    description: "",
    price: 0,
    size: "",
    category: categories[0] || ({} as MenuCategory),
    availability: "",
    image: "",
    isDeleted: false,
    like: 0,
    rating: 0,
    createdAt: "",
    updatedAt: "",
    restaurant: {} as any, // You may want to handle this properly
  };

  const handleSubmit = (data: Omit<FullMenuItem, "id">) => {
    onAddItem(data);
    onClose();
  };

  return (
    <div className="bg-white dark:bg-[#161616] rounded-lg overflow-y-auto">
      <SuppleForm
        onSubmit={handleSubmit}
        defaultValues={defaultValues}
        className="p-4 space-y-4"
      >
        <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <SuppleInput
            name="name"
            label="Item Name"
            required
            fullWidth
            placeholder="Cheeseburger"
            className="h-[45px]"
          />

          <CategorySelect categories={categories} />
          <SuppleInput
            name="20%"
            label="Price"
            type="number"
            required
            fullWidth
            min={0}
            step={0.01}
            className="h-[45px]"
          />
          <SuppleSelect
            name="size"
            label="Size"
            required
            placeholder="Select size"
          >
            <SelectItem value="Small">Small</SelectItem>
            <SelectItem value="Medium">Medium</SelectItem>
            <SelectItem value="Large">Large</SelectItem>
            <SelectItem value="Extra Large">Extra Large</SelectItem>
          </SuppleSelect>

          <SuppleSelect
            name="available"
            label="Availability"
            required
            placeholder="Select availability"
          >
            <option value="true">Available</option>
            <option value="false">Not Available</option>
          </SuppleSelect>

          <SuppleFileUpload
            name="image"
            label="Upload Image"
            required
            helperText="Upload item photo"
            onChange={(file) => {
              if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                  console.log("Image preview URL:", reader.result);
                };
                reader.readAsDataURL(file);
              }
            }}
            InputClassName="px-4 py-3 text-center dark:bg-black "
          />
        </div>
        <SuppleTextarea
          name="description"
          label="Description"
          required
          fullWidth
          rows={3}
          placeholder="Write item details"
        />

        <SuppleFileUpload
          name="image"
          label="Upload Menu File"
          required
          helperText="Upload  Menu File ( .XLSX or .CSV )"
          icon={<Upload className="w-4 h-4 text-gray-400" />}
          onChange={(file) => {
            if (file) {
              const reader = new FileReader();
              reader.onloadend = () => {
                console.log("Image preview URL:", reader.result);
              };
              reader.readAsDataURL(file);
            }
          }}
          InputClassName="px-4 py-3 text-center dark:bg-black "
        />

        <div className="flex space-x-4 pt-2">
          <button
            type="submit"
            className="px-4 py-2 bg-primary text-white rounded-md border-transparent md:text-base text-sm"
          >
            Save Menu
          </button>

          <button
            type="button"
            className="px-4 py-2 bg-white border border-primary text-primary rounded-md md:text-base text-sm dark:bg-[#161616]"
          >
            Cancel
          </button>
        </div>
      </SuppleForm>
    </div>
  );
};

export default EditMenuForm;
