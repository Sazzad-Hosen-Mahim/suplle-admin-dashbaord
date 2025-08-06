import React from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { CircleDollarSign, Upload } from "lucide-react";
import { toast } from "react-toastify";

import type { Design } from "./data/type";
import SuppleTextarea from "@/components/Forms/SuppleTextarea";
import SuppleFileUpload from "@/components/Forms/SuppleFileUpload";
import SuppleForm from "@/components/Forms/SuplleForm";
import SuppleInput from "@/components/Forms/SuppleInput";

interface NewDesignFormProps {
  initialData?: Partial<Design>;
  onCancel?: () => void;
  buttonLabel?: string;
  onSuccess?: (responseData: any) => void;
}

export const NewDesignForm: React.FC<NewDesignFormProps> = ({
  initialData = {},
  onCancel,
  buttonLabel = "Save New Design",
  onSuccess,
}) => {
  const handleSubmit = async (data: Partial<Design>) => {
    try {
      const token = Cookies.get("accessToken");
      if (!token) throw new Error("Authentication token missing");


      const payload = {
      name: data.name || "",
      category: data.category || "",
      description: data.description || "",
      price: data.price !== undefined ? Number(data.price) : 0,
      createdBy: "Admin",
    };

      const formData = new FormData();
    formData.append("data", JSON.stringify(payload));

      // Send image as File
      if (data.imageUrl && data.imageUrl instanceof File) {
        formData.append("image", data.imageUrl);
      } else {
        toast.error("Please upload a valid image file.");
        return;
      }

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/QrCodeDesign/post-QrCodeDesign`,
        formData,
        {
          headers: {
            Authorization: token,
           
          },
        }
      );

      if (!response.data.success) {
        throw new Error(response.data.message || "Request failed");
      }

      toast.success("Design created successfully!");
      
      onSuccess?.(response.data.data);
    } catch (error: any) {
      console.error("Design submission error:", error);
      const message =
        error.response?.data?.message || error.message || "Failed to save design";
      toast.error(message);
    }
  };

  return (
    <SuppleForm<Partial<Design>>
      onSubmit={handleSubmit}
      defaultValues={{
        name: initialData.name || "",
        description: initialData.description || "",
        price: initialData.price || undefined,
        imageUrl: initialData.imageUrl || "",
        category: initialData.category || "",
      }}
      className="space-y-4"
    >
      <SuppleInput
        name="name"
        label="Design Name"
        placeholder="Enter Design Name"
        required
        fullWidth
        className="h-[45px]"
      />

      <SuppleInput
        name="category"
        label="Category"
        placeholder="Enter QR code category"
        required
        fullWidth
        className="h-[45px]"
      />

      <SuppleTextarea
        name="description"
        label="Description"
        placeholder="Short Description..."
        rows={5}
        required
        fullWidth
      />

      <SuppleInput
        name="price"
        label="Price (USD)"
        type="number"
        step="0.01"
        min="0"
        placeholder="USD"
        fullWidth
        endIcon={<CircleDollarSign className="w-4 h-4" />}
        className="h-[45px]"
      />

      <SuppleFileUpload
        name="imageUrl"
        label="Upload Image"
        helperText="Click to upload image (JPG, PNG, max 5MB)"
        accept="image/*"
        required={!initialData.imageUrl}
        icon={<Upload className="w-4 h-4 text-gray-400" />}
        InputClassName="px-4 py-6 text-center dark:bg-black"
      />

      <div className="flex space-x-4 pt-2">
        <button
          type="submit"
          className="px-4 py-2 bg-primary text-white rounded-md border-transparent md:text-base text-sm hover:bg-primary/50 transition-colors disabled:opacity-50"
        >
          {buttonLabel}
        </button>

        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-white border border-primary text-primary rounded-md md:text-base text-sm dark:bg-[#161616] hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
        )}
      </div>
    </SuppleForm>
  );
};
