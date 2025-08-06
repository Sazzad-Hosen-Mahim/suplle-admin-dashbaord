import React, { useState } from "react";
import PricingSection from "@/components/admin-panel/subcription/PricingSection";
import PrimaryButton from "@/components/shared/PrimaryButton";
import SectionHeader from "@/components/ui/sectionHeader";
import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/hooks/useRedux";
import { addSubscription } from "@/store/features/admin/plan/subscriptionPlan";
import { toast } from "react-toastify";

const AdminSubscription = () => {
  const [form, setForm] = useState({
    state: "starter" as "starter" | "pro" | "premium" | "enterprise",
    name: "",
    price: "",
    target: "restaurant", // default value
    maxRestaurants: "",
    maxFloor: "",
    maxTables: "",
    maxMenu: "",
    maxUsers: "",
    features: [""],
    billingCycle: "monthly" as "monthly" | "yearly",
    isMenuUploadViaExcel: false,
    isEccessSubUser: false,
    mostPopular: false,
  });
  const [showModal, setShowModal] = useState(false);

  const dispatch = useAppDispatch();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    idx?: number
  ) => {
    const { name, value } = e.target;
    if (name === "features" && typeof idx === "number") {
      const newFeatures = [...form.features];
      newFeatures[idx] = value;
      setForm({ ...form, features: newFeatures });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  // const addFeature = () => {
  //   setForm({ ...form, features: [...form.features, ""] });
  // };

  // const removeFeature = (idx: number) => {
  //   const newFeatures = form.features.filter((_, i) => i !== idx);
  //   setForm({ ...form, features: newFeatures });
  // };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      state: form.state,
      name: form.name,
      price: Number(form.price),
      target: form.target,
      maxRestaurants: Number(form.maxRestaurants),
      maxFloor: form.state === "pro" ? null : Number(form.maxFloor),
      maxTables: form.state === "pro" ? null : Number(form.maxTables),
      maxMenu: Number(form.maxMenu),
      maxUsers: Number(form.maxUsers),
      features: form.features.filter((f) => f.trim() !== ""),
      billingCycle: form.billingCycle,
      isMenuUploadViaExcel: form.isMenuUploadViaExcel,
      isEccessSubUser: form.isEccessSubUser,
      mostPopular: form.mostPopular,
    };
    console.log("Submitting:", payload);
    setShowModal(false);
    try {
      const resultAction = await dispatch(addSubscription(payload));
      // If using createAsyncThunk, check for fulfilled
      if (addSubscription.fulfilled.match(resultAction)) {
        toast.success("Subscription plan created successfully!");
      } else {
        toast.error("Failed to create subscription plan.");
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "An unexpected error occurred."
      );
    }
  };

  return (
    <div>
      <SectionHeader
        className="mb-5 text-primary"
        title="Subscription"
        rightContent={
          <Button onClick={() => setShowModal(true)}>Create Plan</Button>
        }
      />
      <PricingSection />

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-transparent backdrop-blur">
          <div className="bg-white dark:bg-primary-dark p-5 rounded-lg shadow-lg w-full max-w-lg relative overflow-y-scroll h-[800px]">
            <button
              className="absolute top-2 right-2 text-xl text-gray-500 hover:text-gray-700"
              onClick={() => setShowModal(false)}
              aria-label="Close"
            >
              &times;
            </button>
            <h1 className="text-xl font-bold mb-8">Create Subscription Plan</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {/* State Field */}
              <label>
                State:
                <select
                  name="state"
                  value={form.state}
                  onChange={handleChange}
                  required
                  className="border rounded px-2 py-1 w-full"
                >
                  <option value="starter">Starter</option>
                  <option value="pro">Pro</option>
                  <option value="premium">Premium</option>
                  <option value="enterprise">Enterprise</option>
                </select>
              </label>

              {/* Target Field */}
              <label>
                Target:
                <select
                  name="target"
                  value={form.target}
                  onChange={handleChange}
                  required
                  className="border rounded px-2 py-1 w-full"
                >
                  <option value="restaurant">Restaurant</option>
                  <option value="business">Business</option>
                </select>
              </label>

              {/* Name Field */}
              <label>
                Name:
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="border rounded px-2 py-1 w-full"
                />
              </label>

              {/* Price Field */}
              <label>
                Price:
                <input
                  type="number"
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                  required
                  className="border rounded px-2 py-1 w-full"
                />
              </label>

              {/* Max Restaurants */}
              <label>
                Max Restaurants:
                <input
                  type="number"
                  name="maxRestaurants"
                  value={form.maxRestaurants}
                  onChange={handleChange}
                  required
                  className="border rounded px-2 py-1 w-full"
                />
              </label>

              {/* Max Floor (conditional) */}
              {form.state !== "pro" && (
                <label>
                  Max Floors:
                  <input
                    type="number"
                    name="maxFloor"
                    value={form.maxFloor}
                    onChange={handleChange}
                    required={true}
                    className="border rounded px-2 py-1 w-full"
                  />
                </label>
              )}

              {/* Max Tables (conditional) */}
              {form.state !== "pro" && (
                <label>
                  Max Tables:
                  <input
                    type="number"
                    name="maxTables"
                    value={form.maxTables}
                    onChange={handleChange}
                    required={true}
                    className="border rounded px-2 py-1 w-full"
                  />
                </label>
              )}

              {/* Max Menu Items */}
              <label>
                Max Menu Items:
                <input
                  type="number"
                  name="maxMenu"
                  value={form.maxMenu}
                  onChange={handleChange}
                  required
                  className="border rounded px-2 py-1 w-full"
                />
              </label>

              {/* Max Users */}
              <label>
                Max Users:
                <input
                  type="number"
                  name="maxUsers"
                  value={form.maxUsers}
                  onChange={handleChange}
                  required
                  className="border rounded px-2 py-1 w-full"
                />
              </label>

              {/* Features (existing code) */}
              {/* ... existing features code ... */}

              {/* Billing Cycle */}
              <label>
                Billing Cycle:
                <select
                  name="billingCycle"
                  value={form.billingCycle}
                  onChange={handleChange}
                  required
                  className="border rounded px-2 py-1 w-full"
                >
                  <option value="monthly">Monthly</option>
                  <option value="yearly">Yearly</option>
                </select>
              </label>

              {/* Additional Checkboxes */}
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="isMenuUploadViaExcel"
                  checked={form.isMenuUploadViaExcel}
                  onChange={(e) =>
                    setForm({ ...form, isMenuUploadViaExcel: e.target.checked })
                  }
                />
                Allow menu upload via Excel
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="isEccessSubUser"
                  checked={form.isEccessSubUser}
                  onChange={(e) =>
                    setForm({ ...form, isEccessSubUser: e.target.checked })
                  }
                />
                Allow sub-user access
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="mostPopular"
                  checked={form.mostPopular}
                  onChange={(e) =>
                    setForm({ ...form, mostPopular: e.target.checked })
                  }
                />
                Mark as Most Popular
              </label>

              <PrimaryButton type="submit">Create Plan</PrimaryButton>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminSubscription;
