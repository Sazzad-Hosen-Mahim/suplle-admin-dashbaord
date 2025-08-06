import { Trash2 } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteUser } from "@/store/features/user/userSlice";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import type { AppDispatch } from "@/store/store";

interface DeleteUserButtonProps {
  userId: string;
  onDeleteSuccess?: () => void;
}

const DeleteUserButton = ({ userId, onDeleteSuccess }: DeleteUserButtonProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      await dispatch(deleteUser(userId)).unwrap();
      toast.success("User deleted successfully");
      onDeleteSuccess?.();
      setOpen(false);
    } catch (error: any) {
      toast.error(error?.message || "Failed to delete user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {/* ⚠️ Use <span> instead of <button> to avoid nesting inside another button */}
        <span
          className="text-red-600 hover:text-red-800 cursor-pointer"
          title="Delete User"
        >
          <Trash2 className="h-4 w-4" />
        </span>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure you want to delete this user?</DialogTitle>
        </DialogHeader>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={loading}
          >
            {loading ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteUserButton;
