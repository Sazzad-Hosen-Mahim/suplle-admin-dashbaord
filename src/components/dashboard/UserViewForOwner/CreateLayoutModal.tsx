import { Button } from "@/components/ui/button";
import SuppleInput from "@/components/Forms/SuppleInput";
import SuppleForm from "@/components/Forms/SuplleForm";
import SuppleSelect from "@/components/Forms/SuppleDropdown";
import { SelectItem } from "@/components/ui/select";
import { z } from "zod";
import type { FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Modal } from "@/components/ui/modal";
import { useState } from "react";
import { zoneType } from "@/constants/zone";
import Cookies from "js-cookie";
import axios from "axios";

const CreateLayoutModal = ({ ButtonText }: { ButtonText: string }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validData = z.object({
    zoneName: z.string().min(1, { message: "Zone name is required" }),
    zoneType: z.string().min(1, { message: "Zone type is required" }),
    tableName: z.string().min(1, { message: "Table name is required" }),
    tableSetting: z.string().min(1, { message: "Table setting is required" }),
    seatingCapability: z.coerce
      .number()
      .min(1, { message: "Seating capability is required" }),
  });

  const onSubmit = async (data: FieldValues) => {
    setLoading(true);
    setError(null);

    const token = Cookies.get("accessToken");
    if (!token) {
      console.error("No token found in cookies");

      return;
    }

    const payload = {
      zoneName: data.zoneName,
      zoneType: data.zoneType,
      tableName: data.tableName,
      tableSetting: data.tableSetting,
      seatingCapacity: data.seatingCapability,
    };

    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/zone/create-zone`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );

      alert("Zone created successfully");
      setOpen(false);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "Failed to create zone");
      } else {
        setError("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setOpen(false);
    setError(null);
  };

  return (
    <Modal
      open={open}
      onOpenChange={setOpen}
      trigger={<Button>{ButtonText}</Button>}
      title="Create A Layout"
      description="Fill in the details below to create a new zone"
    >
      <SuppleForm
        resolver={zodResolver(validData)}
        onSubmit={onSubmit}
        className="grid gap-2"
      >
        <div>
          <SuppleInput
            name="zoneName"
            label="Zone Name"
            placeholder="Enter zone name"
          />
        </div>

        <div>
          <SuppleSelect name="zoneType" label="Zone Type">
            {zoneType.map((zone) => (
              <SelectItem key={zone.value} value={zone.value}>
                {zone.label}
              </SelectItem>
            ))}
          </SuppleSelect>
        </div>

        <div>
          <SuppleInput
            name="tableName"
            label="Table Name"
            placeholder="Enter table name"
          />
        </div>

        <div>
          <SuppleInput
            name="tableSetting"
            label="Table Setting"
            placeholder="Enter table setting"
          />
        </div>

        <div>
          <SuppleInput
            name="seatingCapability"
            label="Seating Capability"
            placeholder="Enter seating capacity"
            type="number"
          />
        </div>

        {error && (
          <p className="text-red-600 text-sm font-medium mt-2">{error}</p>
        )}

        <div className="flex items-center space-x-2 justify-end">
          <Button
            onClick={closeModal}
            type="button"
            variant={"outline"}
            className="mt-4"
            disabled={loading}
          >
            Cancel
          </Button>
          <Button type="submit" className="mt-4" disabled={loading}>
            {loading ? "Creating..." : "Create"}
          </Button>
        </div>
      </SuppleForm>
    </Modal>
  );
};

export default CreateLayoutModal;
