import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Cookies from "js-cookie";
import { toast } from "react-hot-toast";

import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import axios from "axios";

const workDaysOptions = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const userStatus = [
  { label: "Active", value: "Active" },
  { label: "Inactive", value: "Inactive" },
];

const roleOptions = [
  "manager",
  "waiter",
  "takeaway",
  "chef",
  "cashier",
  "maintenance",
  "staff",
];

// Zod schema
const schema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone must be at least 10 digits"),
  role: z.enum(
    [
      "manager",
      "waiter",
      "dine in",
      "takeaway",
      "chef",
      "cashier",
      "maintenance",
      "staff",
    ],
    { required_error: "Role is required" }
  ),
  workDays: z.array(z.string()).min(1, "Select at least one work day"),
  workTimeStart: z.string().min(1, "Start time is required"),
  workTimeEnd: z.string().min(1, "End time is required"),
  status: z.enum(["Active", "Inactive"], {
    required_error: "Status is required",
  }),
});

type FormData = z.infer<typeof schema>;

const inputClass =
  "border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-gray-300";

const CreateUserModal = ({ ButtonText }: { ButtonText: string }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      workDays: [],
    },
  });

  const closeModal = () => {
    setOpen(false);
    reset();
  };

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    const token = Cookies.get("accessToken");
    if (!token) {
      toast.error("Authorization token is missing");
      setLoading(false);
      return;
    }

    const formatTime = (time: string) => {
      return time.replace(/\./g, ":").replace(/\s+/g, " ").trim();
    };

    const payload = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      role: data.role,
      workDays: data.workDays,
      workTime: {
        start: formatTime(data.workTimeStart),
        end: formatTime(data.workTimeEnd),
      },
      status: data.status,
    };

    const formData = new FormData();
    formData.append("data", JSON.stringify(payload));

    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/staff/create-staff`,
        formData,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      toast.success("Staff created successfully!");
      closeModal();
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  const WorkDaysCheckboxGroup = () => (
    <div className="flex flex-wrap gap-4">
      {workDaysOptions.map((day) => (
        <label key={day} className="flex items-center space-x-2 cursor-pointer">
          <Controller
            name="workDays"
            control={control}
            render={({ field }) => {
              const checked = field.value.includes(day);
              return (
                <>
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => {
                      if (checked) {
                        field.onChange(field.value.filter((v) => v !== day));
                      } else {
                        field.onChange([...field.value, day]);
                      }
                    }}
                    className="cursor-pointer"
                  />
                  <span>{day}</span>
                </>
              );
            }}
          />
        </label>
      ))}
    </div>
  );

  return (
    <Modal
      open={open}
      onOpenChange={setOpen}
      trigger={<Button>{ButtonText}</Button>}
      title="Add New Staff Member"
      description="Fill in the details below to create a new staff member account"
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-h-[75vh] overflow-y-auto px-1 sm:px-4"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-1" htmlFor="name">
              Name
            </label>
            <input
              id="name"
              {...register("name")}
              placeholder="Name"
              type="text"
              className={inputClass}
            />
            {errors.name && (
              <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>
          <div>
            <label className="block font-medium mb-1" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              {...register("email")}
              placeholder="Email"
              type="email"
              className={inputClass}
            />
            {errors.email && (
              <p className="text-red-600 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block font-medium mb-1" htmlFor="phone">
              Phone
            </label>
            <input
              id="phone"
              {...register("phone")}
              placeholder="Phone"
              type="tel"
              className={inputClass}
            />
            {errors.phone && (
              <p className="text-red-600 text-sm mt-1">
                {errors.phone.message}
              </p>
            )}
          </div>
          <div>
            <label className="block font-medium mb-1" htmlFor="role">
              Role
            </label>
            <select id="role" {...register("role")} className={inputClass}>
              <option value="" disabled hidden>
                Select Role
              </option>
              {roleOptions.map((role) => (
                <option key={role} value={role}>
                  {role.charAt(0).toUpperCase() + role.slice(1)}
                </option>
              ))}
            </select>
            {errors.role && (
              <p className="text-red-600 text-sm mt-1">{errors.role.message}</p>
            )}
          </div>
        </div>

        <label className="block font-medium text-sm mb-1 mt-6">Work Days</label>
        <WorkDaysCheckboxGroup />
        {errors.workDays && (
          <p className="text-red-600 text-sm mt-1">
            {errors.workDays.message as string}
          </p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block font-medium mb-1" htmlFor="workTimeStart">
              Work Start Time
            </label>
            <input
              id="workTimeStart"
              {...register("workTimeStart")}
              placeholder="9:00 AM"
              type="text"
              className={inputClass}
            />
            {errors.workTimeStart && (
              <p className="text-red-600 text-sm mt-1">
                {errors.workTimeStart.message}
              </p>
            )}
          </div>
          <div>
            <label className="block font-medium mb-1" htmlFor="workTimeEnd">
              Work End Time
            </label>
            <input
              id="workTimeEnd"
              {...register("workTimeEnd")}
              placeholder="5:00 PM"
              type="text"
              className={inputClass}
            />
            {errors.workTimeEnd && (
              <p className="text-red-600 text-sm mt-1">
                {errors.workTimeEnd.message}
              </p>
            )}
          </div>
        </div>

        <div className="mt-6">
          <label className="block font-medium mb-1" htmlFor="status">
            Status
          </label>
          <select id="status" {...register("status")} className={inputClass}>
            <option value="" disabled hidden>
              Select Status
            </option>
            {userStatus.map((status) => (
              <option key={status.value} value={status.value}>
                {status.label}
              </option>
            ))}
          </select>
          {errors.status && (
            <p className="text-red-600 text-sm mt-1">{errors.status.message}</p>
          )}
        </div>

        <div className="flex items-center space-x-2 justify-end mt-8">
          <Button
            onClick={closeModal}
            type="button"
            variant="outline"
            className="bg-[#E7F6F6] dark:bg-[#E7F6F6] dark:text-[#161616]"
          >
            Cancel
          </Button>
          <Button type="submit" className="pl-8 pr-8" disabled={loading}>
            {loading ? "Adding..." : "Add"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateUserModal;
