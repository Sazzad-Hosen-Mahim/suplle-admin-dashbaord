import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
// import SuppleInput from "./SuppleInput";
import { IoMdCloseCircle } from "react-icons/io";
import { FiPlus, FiMinus } from "react-icons/fi";
import type { SubscriptionPlanData } from "@/components/dashboard/dashboardItem/data/Type";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { updateSubscriptionPlan } from "@/store/features/admin/plan/updatePlanSlice";
import { fetchSubscriptions } from "@/store/features/admin/plan/subscriptionPlan";
// import SuppleInput from "@/components/Forms/SuppleInput";

interface UpdateModalProps {
  showUpdateModal: boolean;
  setShowUpdateModal: (show: boolean) => void;
  planData: SubscriptionPlanData;
  onSubmit: (data: Partial<SubscriptionPlanData>) => void;
}

const UpdateModal = ({
  showUpdateModal,
  setShowUpdateModal,
  planData,
}: UpdateModalProps) => {
  const { control, handleSubmit, setValue } = useForm<
    Partial<SubscriptionPlanData>
  >({
    defaultValues: {
      name: planData.name,
      price: planData.price,
      maxRestaurants: planData.maxRestaurants,
      maxFloor: planData.maxFloor,
      maxTables: planData.maxTables,
      maxMenu: planData.maxMenu,
      features: [...planData.features],
      maxUsers: planData.maxUsers,
      maxQRCodes: planData.maxQRCodes,
    },
  });

  const [newFeature, setNewFeature] = useState("");

  const dispatch = useAppDispatch();

  const { loading } = useAppSelector((state) => state.updatePlan);

  const handleAddFeature = () => {
    if (newFeature.trim()) {
      setValue("features", [
        ...(control._formValues.features || []),
        newFeature,
      ]);
      setNewFeature("");
    }
  };

  const handleRemoveFeature = (index: number) => {
    const updatedFeatures = [...(control._formValues.features || [])];
    updatedFeatures.splice(index, 1);
    setValue("features", updatedFeatures);
  };

  const onFormSubmit = async (data: Partial<SubscriptionPlanData>) => {
    try {
      await dispatch(
        updateSubscriptionPlan({
          planId: planData._id, // assuming your planData has an _id field
          planData: data,
        })
      ).unwrap();

      await dispatch(fetchSubscriptions()).unwrap();

      // If successful:
      setShowUpdateModal(false);
      // You might want to refresh the plans list or show a success message here
    } catch (error) {
      // Handle error (you might want to show an error message)
      console.error("Failed to update plan:", error);
    }
  };

  if (!showUpdateModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-blur bg-opacity-50 backdrop-blur-md ">
      <div className="bg-white dark:bg-primary-dark p-5 rounded-lg shadow-lg w-full max-w-lg max-h-[90vh] overflow-y-auto relative border-2 border-primary/40">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold">Update Plan</h1>
          <button onClick={() => setShowUpdateModal(false)}>
            <IoMdCloseCircle className="text-red-500 w-7 h-7 hover:text-red-700" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
          {/* Name */}
          <Label className="text-sm font-medium px-1 mb-1">Plan Name</Label>
          <Controller
            name="name"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Input {...field} placeholder="Plan Name" required />
            )}
          />

          {/* Price */}

          <Label className="text-sm font-medium px-1 mb-1">Price</Label>
          <Controller
            name="price"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Input {...field} placeholder="Price" type="number" required />
            )}
          />

          <div className="grid grid-cols-2 gap-4">
            {/* Max Restaurants */}
            <div>
              <Label className="text-sm font-medium px-1 mb-1">
                Max Restaurants
              </Label>
              <Controller
                name="maxRestaurants"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Max Restaurants"
                    type="number"
                    required
                  />
                )}
              />
            </div>
            {/* Max Floors */}
            <div>
              <Label className="text-sm font-medium px-1 mb-1">Max Floor</Label>
              <Controller
                name="maxFloor"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Max Floors"
                    type="number"
                    required
                  />
                )}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Max Tables */}
            <div>
              <Label className="text-sm font-medium px-1 mb-1">
                Max Tables
              </Label>
              <Controller
                name="maxTables"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Max Tables"
                    type="number"
                    required
                  />
                )}
              />
            </div>
            {/* Max Menu Items */}
            <div>
              <Label className="text-sm font-medium px-1 mb-1">
                Max Menu Items
              </Label>
              <Controller
                name="maxMenu"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Max Menu Items"
                    type="number"
                    required
                  />
                )}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Max Users */}
            <div>
              <Label className="text-sm font-medium px-1 mb-1">Max Users</Label>
              <Controller
                name="maxUsers"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Max Users"
                    type="number"
                    required
                  />
                )}
              />
            </div>
            {/* Max QR Codes */}
            <div>
              <Label className="text-sm font-medium px-1 mb-1">
                Max QR Codes
              </Label>
              <Controller
                name="maxQRCodes"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Max QR Codes"
                    type="number"
                    required
                  />
                )}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium">Features</Label>
            <div className="space-y-2">
              {control._formValues.features?.map(
                (feature: string, index: number) => (
                  <div key={index} className="flex items-center gap-2">
                    <Input
                      value={feature}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const updatedFeatures: string[] = [
                          ...(control._formValues.features as string[]),
                        ];
                        updatedFeatures[index] = e.target.value;
                        setValue("features", updatedFeatures);
                      }}
                      className="flex-1"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveFeature(index)}
                      className="text-red-500 hover:text-red-700 p-2"
                    >
                      <FiMinus />
                    </button>
                  </div>
                )
              )}
            </div>

            <div className="flex items-center gap-2">
              <Input
                value={newFeature}
                onChange={(e) => setNewFeature(e.target.value)}
                placeholder="Add new feature"
                className="flex-1"
              />
              <button
                type="button"
                onClick={handleAddFeature}
                className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded"
              >
                <FiPlus />
              </button>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <button
              type="button"
              onClick={() => setShowUpdateModal(false)}
              className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              disabled={loading} // Disable button while loading
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Updating...
                </span>
              ) : (
                "Update Plan"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateModal;
