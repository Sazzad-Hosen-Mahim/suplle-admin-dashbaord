import { Button } from "@/components/ui/button";
import SuppleInput from "@/components/Forms/SuppleInput";
import SuppleForm from "@/components/Forms/SuplleForm";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Modal } from "@/components/ui/modal";
import { useState } from "react";

import { editUser } from "@/store/features/user/userSlice";
import { toast } from "react-toastify";
import type { User } from "@/store/features/user/userSlice";
import { useAppDispatch } from "@/hooks/useRedux";

interface EditUserModalProps {
  ButtonText: React.ReactNode;
  selectedUser: User;
  onEdit: (updatedUser: User) => void; // Optional now, but keep if you want callback
}

const EditUserModal = ({ ButtonText, selectedUser, onEdit }: EditUserModalProps) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  const validData = z.object({
    userName: z.string().min(1, { message: "Name is required" }),
  });

  type FormData = z.infer<typeof validData>;

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const resultAction = await dispatch(
        editUser({ id: selectedUser.id, userName: data.userName })
      );

      if (editUser.fulfilled.match(resultAction)) {
        toast.success("User updated successfully");
        onEdit(resultAction.payload); 
        setOpen(false);
      } else {
        // rejected case
        toast.error(resultAction.payload || "Failed to update user");
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to update user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      open={open}
      onOpenChange={setOpen}
      trigger={
        <Button variant="outline" aria-label="Open edit user modal">
          {ButtonText}
        </Button>
      }
      title="Update User Name"
      description="Edit the user's name below"
    >
      <SuppleForm<FormData>
        defaultValues={{ userName: selectedUser.userName || "" }}
        resolver={zodResolver(validData)}
        onSubmit={onSubmit}
        className="grid gap-2"
      >
        <SuppleInput
          name="userName"
          label="Name"
          placeholder="Enter new name"
          type="text"
          disabled={loading}
        />
        

        <div className="flex items-center justify-end gap-2 mt-4">
          <Button
            onClick={() => setOpen(false)}
            type="button"
            variant="outline"
            disabled={loading}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? "Updating..." : "Update Name"}
          </Button>
        </div>
      </SuppleForm>
    </Modal>
  );
};

export default EditUserModal;
