import { Button } from "@/components/ui/button";
import SuppleInput from "@/components/Forms/SuppleInput";
import SuppleForm from "@/components/Forms/SuplleForm";
import SuppleSelect from "@/components/Forms/SuppleDropdown";
import { userRoles } from "@/constants/roles";
import { SelectItem } from "@/components/ui/select";
import type { FieldValues } from "react-hook-form";
import { Modal } from "@/components/ui/modal";
import React, { useState } from "react";
import type { User } from "@/pages/Dashboard/staff/StaffViewForOwner";
import { userStatus } from "../user-type";

// Types
interface EditUserModalProps {
  ButtonText: React.ReactNode;
  selectedUser: User;
  onEdit: (data: User) => void;
}

// Form Fields Component
const UserFormFields = () => (
  <>
    <div className="">
      <SuppleInput name="name" label="Name" placeholder="Name" type="text" />
    </div>

    <div className="">
      <SuppleInput
        name="email"
        label="Email"
        placeholder="Email"
        type="email"
      /> 
      <SuppleInput
        name="email"
        label="Email"
        placeholder="Email"
        type="email"
      />
    </div>

    <div className="">
      <SuppleSelect name="role" label="Role">
        {userRoles.map((role) => (
          <SelectItem key={role.value} value={role.value}>
            {role.label}
          </SelectItem>
        ))}
      </SuppleSelect>
    </div>

    <div className="">
      <SuppleSelect name="status" label="Status">
        {userStatus.map((status) => (
          <SelectItem key={status.value} value={status.value}>
            {status.label}
          </SelectItem>
        ))}
      </SuppleSelect>
    </div>
  </>
);

const EditUserModal = ({
  ButtonText,
  selectedUser,
  onEdit,
}: EditUserModalProps) => {
  const [open, setOpen] = useState(false);

  const defaultValues = {
    name: selectedUser.userName || "",
    phone: selectedUser.phone || "",
    email: selectedUser.email || "",
    role: selectedUser.role || "manager",
  };

  const onSubmit = (data: FieldValues) => {
    onEdit({
      ...selectedUser,
      ...data,
    } as User);
    setOpen(false);
  };

  const closeModal = () => {
    setOpen(false);
  };

  return (
    <Modal
      open={open}
      onOpenChange={setOpen}
      trigger={<button>{ButtonText}</button>}
      title="Create New Sub User Account"
      description="Fill in the details below to create a new sub user account"
    >
      <SuppleForm
        defaultValues={defaultValues}
        onSubmit={onSubmit}
        className="grid gap-2"
      >
        <UserFormFields />
        <div className="flex items-center space-x-2 justify-end">
          <Button
            onClick={closeModal}
            type="button"
            variant={"outline"}
            className="mt-4"
          >
            Cancel
          </Button>
          <Button type="submit" className="mt-4">
            Update User
          </Button>
        </div>
      </SuppleForm>
    </Modal>
  );
};

export default EditUserModal;
