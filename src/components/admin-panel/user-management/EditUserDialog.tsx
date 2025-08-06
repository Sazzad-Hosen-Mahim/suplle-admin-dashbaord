import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import type { User } from "./user";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify"; // ✅ import toast

interface EditUserDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editUser: User | null;
  onSave: (user: User) => void;
  onCancel: () => void;
  setEditUser: (user: User) => void;
}

export const EditUserDialog = ({
  open,
  onOpenChange,
  editUser,
  onSave,
  onCancel,
  setEditUser,
}: EditUserDialogProps) => {
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editUser) return;

    try {
      const token = Cookies.get("accessToken");
      const formData = new FormData();
      formData.append("data", JSON.stringify({ name: editUser.name }));

      const res = await axios.put(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/users/update-user/${editUser.id}`,
        formData,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (res.status === 200) {
        toast.success("User updated successfully ✅"); // ✅ success toast
        onSave(editUser); // Trigger parent callback
        onOpenChange(false); // Close dialog
      }
    } catch (error: any) {
      console.error("Error updating user:", error);
      toast.error(error.response?.data?.message || "Failed to update user ❌"); // ✅ error toast
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-[24px] font-normal leading-normal font-[Rubik] bg-gradient-to-b from-[#56DAAB] via-[#31B8A0] to-[#0F9996] bg-clip-text text-transparent">
            Edit User
          </DialogTitle>
        </DialogHeader>
        {editUser && (
          <form onSubmit={handleSubmit} className="grid gap-4 py-4">
            <div className="flex flex-col items-center gap-4">
              <Avatar className="w-20 h-20">
                <AvatarImage src={editUser.image} alt={editUser.name} />
                <AvatarFallback>
                  {editUser.name?.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </div>

            <div className="grid gap-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={editUser.name}
                  onChange={(e) =>
                    setEditUser({ ...editUser, name: e.target.value })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="mail" className="text-right">
                  Email
                </Label>
                <Input
                  id="mail"
                  name="mail"
                  value={editUser.mail}
                  onChange={(e) =>
                    setEditUser({ ...editUser, mail: e.target.value })
                  }
                  className="col-span-3"
                  disabled
                />
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                className="h-[38px] rounded-[6px]"
              >
                Cancel
              </Button>
              <Button
                className="h-[38.44px] rounded-[6.989px] text-white bg-[linear-gradient(176deg,_#56DAAB_-18.78%,_#0F9996_111.3%)] hover:opacity-70 transition-opacity cursor-pointer"
                type="submit"
              >
                Save changes
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};
