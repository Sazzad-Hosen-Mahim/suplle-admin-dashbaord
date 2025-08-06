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
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import type { User } from "./user";
import { toast } from "react-toastify";

interface ViewUserDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedUser: User | null;
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
}

export const ViewUserDialog = ({
  open,
  onOpenChange,
  selectedUser,
  setUsers,
}: ViewUserDialogProps) => {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [loading, setLoading] = useState(false);


  const handleDeleteUser = async () => {
    if (!selectedUser) return;

    try {
      setLoading(true);
      const token = Cookies.get("accessToken");

      const response = await axios.delete(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/users/delete-user/${selectedUser.id}`,
        {
          headers: { Authorization: token },
        }
      );

      console.log("Delete response:", response.data);

      // Remove from UI
      setUsers((prev) =>
        prev.filter((u) => u.id !== selectedUser.id && u.id !== selectedUser.id)
      );

      toast.success("User deleted successfully");
      setIsConfirmOpen(false);
      onOpenChange(false);
    } catch (error: any) {
      console.error("Failed to delete user:", error);
      const errorMessage =
        error?.response?.data?.message || "Failed to delete user";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-[24px] font-normal leading-normal font-[Rubik] bg-gradient-to-b from-[#56DAAB] via-[#31B8A0] to-[#0F9996] bg-clip-text text-transparent">
              User Details
            </DialogTitle>
          </DialogHeader>
          {selectedUser && (
            <div className="grid gap-4 py-4">
              <div className="flex flex-col items-center gap-4">
                <Avatar className="w-20 h-20">
                  <AvatarImage src={selectedUser.image} alt={selectedUser.name} />
                  <AvatarFallback>
                    {selectedUser.name?.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <h2 className="text-xl text-[24px] font-normal leading-normal font-[Rubik] bg-gradient-to-b from-[#56DAAB] via-[#31B8A0] to-[#0F9996] bg-clip-text text-transparent">
                  {selectedUser.name}
                </h2>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p>{selectedUser.mail}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Role</p>
                  <p>{selectedUser.role}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <p>{selectedUser.status}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Vendor</p>
                  <p>{selectedUser.vendor}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Time</p>
                  <p>{selectedUser.time}</p>
                </div>
              </div>

              <div className="flex justify-end mt-4">
                <Button
                  variant="destructive"
                  onClick={() => setIsConfirmOpen(true)}
                  className="flex items-center gap-2 rounded-md"
                  disabled={loading}
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Confirm Delete Modal */}
      <Dialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Delete Confirmation</DialogTitle>
          </DialogHeader>
          <p className="py-2">Are you sure you want to delete this user?</p>
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setIsConfirmOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteUser}
              disabled={loading}
            >
              {loading ? "Deleting..." : "Confirm"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
