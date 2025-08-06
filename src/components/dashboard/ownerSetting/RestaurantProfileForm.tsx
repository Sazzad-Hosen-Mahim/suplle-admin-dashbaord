import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import SuppleForm from "@/components/Forms/SuplleForm";
import SuppleInput from "@/components/Forms/SuppleInput";
import SuppleFileUpload from "@/components/Forms/SuppleFileUpload";
import SuppleTextarea from "@/components/Forms/SuppleTextarea";
import { FileUp } from "lucide-react";
import owner1 from "../../../assets/ownerset1.jpg";
import owner2 from "../../../assets/ownerset2.jpg";
import owner3 from "../../../assets/ownerset3.jpg";
import Cookies from "js-cookie";
import { fetchRestaurantById } from "@/store/features/restaurant/fetchrestaurantSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { toast } from "react-toastify";

const defaultValues = {
  restaurantName: "",
  logo: "",
  tagline: "",
  coverUpload: "",
  description: "",

  // Business info
  businessName: "",
  businessEmail: "",
  businessPhone: "",
  address: "",
  gstRate: "",
  cgstRate: "",
  sgstRate: "",

  // Account info
  currentPassword: "",
  newPassword: "",
  oldPassword: "",
};

const RestaurantProfileForm: React.FC = () => {
  const [coverImages, setCoverImages] = useState<string[]>([
    owner1,
    owner2,
    owner3,
  ]);
  const dispatch = useAppDispatch();
  const restaurantState = useAppSelector((state) => state.fetchRestaurant);
  console.log(
    restaurantState.data,
    "restaurantState in restaurant profile form"
  );
  const { description, restaurantName, tagline } = restaurantState.data ?? {};
  console.log(restaurantName, "restaurantName in restaurant profile form");
  const [formDefaults, setFormDefaults] = useState(defaultValues);
  const [businessFormDefaults, setBusinessFormDefaults] =
    useState(defaultValues);

  const businessEmail = Cookies.get("user")
    ? JSON.parse(Cookies.get("user") || "{}").email
    : "";

  useEffect(() => {
    if (restaurantState.data) {
      setFormDefaults({
        ...defaultValues,
        restaurantName: restaurantState.data.restaurantName || "",
        tagline: restaurantState.data.tagline || "",
        description: restaurantState.data.description || "",
      });

      // Business form data setting
      setBusinessFormDefaults({
        ...defaultValues,
        businessName: restaurantState.data.restaurantName || "",
        businessEmail: businessEmail || "",
        businessPhone: restaurantState.data.phone || "",
        address: restaurantState.data.restaurantAddress || "",
        gstRate: restaurantState.data.taxInfo?.gstRate || "",
        cgstRate: restaurantState.data.taxInfo?.cgstRate || "",
        sgstRate: restaurantState.data.taxInfo?.sgstRate || "",
      });
    }
  }, [restaurantState.data]);

  const userString = Cookies.get("user");
  const user = userString ? JSON.parse(userString) : null;
  const restaurantId = user?.restuarant;
  console.log(restaurantId, "restaurantId in restaurant profile form");

  useEffect(() => {
    if (restaurantId) {
      dispatch(fetchRestaurantById(restaurantId));
    }
  }, [dispatch, restaurantId]);

  const handleError = (error: unknown) => {
    console.error("Form Error:", error);
  };

  const handleRestaurantInfo = async (data: typeof defaultValues) => {
    try {
      const token = Cookies.get("accessToken");
      if (!token) throw new Error("No token found");

      const userString = Cookies.get("user");
      const user = userString ? JSON.parse(userString) : null;
      const restaurantId = user?.restuarant;

      if (!restaurantId) throw new Error("No restaurant ID found");

      const payload = {
        restaurantName: data.restaurantName,
        tagline: data.tagline,
        description: data.description,
        logo: data.logo,
        coverUpload: data.coverUpload,
      };
      console.log(payload, "payload in handleRestaurantInfo");

      const formData = new FormData();
      formData.append("data", JSON.stringify(payload));
      if (data.logo) formData.append("logo", data.logo);
      if (data.coverUpload) {
        formData.append("coverPhoto", data.coverUpload);

        // Add preview image to coverImages
        if (
          data.coverUpload &&
          typeof data.coverUpload !== "string" &&
          typeof data.coverUpload === "object" &&
          typeof window !== "undefined" &&
          typeof window.Blob !== "undefined" &&
          (data.coverUpload as any) instanceof window.Blob
        ) {
          const newCoverPreview = URL.createObjectURL(data.coverUpload as Blob);
          setCoverImages((prev) => [...prev, newCoverPreview]);
        }
      }
      const formDataObject: { [key: string]: any } = {};
      formData.forEach((value, key) => {
        formDataObject[key] = value;
      });
      console.log(formDataObject);

      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/restaurant/update-restaurant`,
        {
          method: "PUT",
          headers: {
            Authorization: ` ${token}`,
          },
          body: formData,
        }
      );

      const result = await res.json();
      if (!res.ok)
        throw new Error(result.message || "Failed to update restaurant");

      toast.success("Restaurant Info Updated Successfully"); // <-- Success toast
      console.log("Update Success:", result);
    } catch (error: any) {
      toast.error(error.message || "Update Failed"); // <-- Error toast
      console.error("Update Failed:", error);
    }
  };

  useEffect(() => {
    return () => {
      coverImages.forEach((img) => {
        if (img.startsWith("blob:")) URL.revokeObjectURL(img);
      });
    };
  }, [coverImages]);
  ``;
  const handleBussinessInfo = async (data: typeof defaultValues) => {
    try {
      const token = Cookies.get("accessToken");
      if (!token) throw new Error("No token found");

      const requestData = {
        businessName: data.businessName,
        businessEmail: data.businessEmail,
        restaurantAddress: data.address,
        // referralCode: data.referralCode,
        taxInfo: {
          gstRate: data.gstRate,
          cgstRate: data.cgstRate,
          sgstRate: data.sgstRate,
        },
      };

      console.log(requestData, "requestData in handleBussinessInfo");

      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/owner/update-owner`,
        {
          method: "PUT",
          headers: {
            Authorization: `${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        }
      );

      const result = await res.json();
      console.log("Response:", result);

      if (!res.ok)
        throw new Error(result.message || "Failed to update business info");

      toast.success("Business Info Updated Successfully"); // <-- Success toast
      console.log("Business Info Updated Successfully");
    } catch (error: any) {
      toast.error(error.message || "Update Failed"); // <-- Error toast
      console.error("Update Failed:", error);
    }
  };

  const handleAccountInfo = async (data: typeof defaultValues) => {
    try {
      const token = Cookies.get("accessToken");
      if (!token) throw new Error("No token found");

      const payload = {
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
      };
      console.log(payload, "payload in handleAccountInfo");

      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/restaurant/account-settings`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "Password change failed");

      toast.success("Password changed successfully"); // <-- Success toast
      console.log("Password changed successfully");
    } catch (error: any) {
      toast.error(error.message || "Password Change Failed"); // <-- Error toast
      console.error("Password Change Failed:", error);
    }
  };

  return (
    <div>
      <SuppleForm
        key={`restaurant-${formDefaults.restaurantName}`}
        onSubmit={handleRestaurantInfo}
        onError={handleError}
        defaultValues={formDefaults}
        className="mx-auto space-y-10"
      >
        {/* Restaurant Info */}
        <div className=" shadow-[0px_0px_1px_2px_rgba(0,0,0,.04)] rounded-md">
          <div className="space-y-6 p-6 bg-white rounded-md dark:bg-[#161616]">
            <h2 className="text-lg font-normal text-[#333333] dark:text-white">
              Restaurant Information
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <SuppleInput
                name="restaurantName"
                label="Restaurant Name"
                // placeholder={restaurantName}
                // defaultValue={restaurantName ? restaurantName : ""}
                className="h-[45px]"
              />

              <SuppleFileUpload
                name="logo"
                label="Logo"
                accept="image/*"
                helperText="Upload Image"
                InputClassName="px-4 py-3 dark:bg-[#161616]"
                icon={<FileUp className="w-4 h-4 text-gray-400" />}
              />

              <SuppleInput
                name="tagline"
                label="Tagline"
                // placeholder={tagline}
                defaultValue={tagline}
                className="h-[45px]"
              />

              <SuppleFileUpload
                name="coverUpload"
                label="Upload Your Own Cover Image"
                accept="image/*"
                helperText="Upload Cover Image"
                InputClassName="px-4 py-3 dark:bg-[#161616]"
                icon={<FileUp className="w-4 h-4 text-gray-400" />}
              />
            </div>

            <div>
              <label className="text-sm font-medium block mb-2">
                Select Your Cover Image
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {coverImages.map((img, idx) => (
                  <div
                    key={idx}
                    className="h-[300px] rounded overflow-hidden border border-gray-300"
                  >
                    <img
                      src={img}
                      alt={`cover-${idx}`}
                      className=" h-full w-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            <SuppleTextarea
              name="description"
              label="Description"
              // placeholder={description}
              defaultValue={description}
              rows={5}
            />

            <Button
              type="submit"
              className="bg-[#E7F6F6]  text-[#11A8A5] hover:text-white"
            >
              Save Changes
            </Button>
          </div>
        </div>
      </SuppleForm>

      <SuppleForm
        key={`business-${businessFormDefaults.businessName}`}
        onSubmit={handleBussinessInfo}
        onError={handleError}
        defaultValues={businessFormDefaults}
        className="mx-auto space-y-10"
      >
        {/* Business Info */}
        <div className="shadow-[0px_0px_1px_2px_rgba(0,0,0,.04)] rounded-md">
          <div className="space-y-4 p-6 bg-white dark:bg-[#161616]">
            <h2 className="text-lg font-normal text-[#333333] dark:text-white">
              Business Information
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <SuppleInput
                name="businessName"
                label="Business Name"
                // placeholder="Business Name"
                className="h-[45px]"
              />
              <SuppleInput
                name="businessEmail"
                label="Business Email"
                // placeholder="Business Email"
                type="email"
                className="h-[45px] cursor-not-allowed"
                readOnly
              />
              <SuppleInput
                name="businessPhone"
                label="Business Phone Number"
                placeholder="Business Phone Number"
                className="h-[45px]"
              />
              <SuppleInput
                name="address"
                label="Address"
                placeholder="Address"
                className="h-[45px]"
              />
            </div>
            <div className="space-y-4">
              <h2 className="text-base font-normal text-[#203849] dark:text-white">
                Tax Information
              </h2>

              <div className="grid md:grid-cols-3 gap-4">
                <SuppleInput
                  name="gstRate"
                  placeholder="GST Rate (%)"
                  type="string"
                  className="h-[45px]"
                />
                <SuppleInput
                  name="cgstRate"
                  placeholder="CGST Rate (%)"
                  type="string"
                  className="h-[45px]"
                />
                <SuppleInput
                  name="sgstRate"
                  placeholder="SGST Rate (%)"
                  type="string"
                  className="h-[45px]"
                />
              </div>
              <Button
                type="submit"
                className="bg-[#E7F6F6]  text-[#11A8A5] hover:text-white"
              >
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      </SuppleForm>

      <SuppleForm
        onSubmit={handleAccountInfo}
        onError={handleError}
        defaultValues={defaultValues}
        className="mx-auto space-y-10"
      >
        {/* Account Settings */}
        <div className="shadow-[0px_0px_1px_2px_rgba(0,0,0,.04)] rounded-md">
          <div className="space-y-4 p-6 bg-white dark:bg-[#161616]">
            <h2 className="text-lg font-normal text-[#333333] dark:text-white">
              Account Settings
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <SuppleInput
                name="oldPassword"
                label="Old Password"
                placeholder="Old password"
                className="h-[45px]"
              />
              <SuppleInput
                name="newPassword"
                label="New Password"
                placeholder="New password"
                className="h-[45px]"
              />
            </div>
            <Button
              type="submit"
              className="bg-[#E7F6F6] text-[#11A8A5] hover:text-white"
            >
              Save Changes
            </Button>
          </div>
        </div>
      </SuppleForm>
    </div>
  );
};
export default RestaurantProfileForm;
