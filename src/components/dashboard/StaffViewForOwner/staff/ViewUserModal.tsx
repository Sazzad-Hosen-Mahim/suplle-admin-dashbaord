import { Button } from "@/components/ui/button";
import EyeIcon from "@/components/ui/EyeIcon";
import { Modal } from "@/components/ui/modal";
// import type { User } from "@/pages/Dashboard/user/UserViewForOwner";
import { useState } from "react";
import type { User } from "../user-type";

// Types
interface ViewUserModalProps {
  selectedUser: User;
}

// User Details Component
const UserDetails = ({ user }: { user: User }) => (
  <div className="grid grid-cols-2 gap-4">
    <div>
      <label className="text-sm font-medium">Name</label>
      <p className="mt-1">{user.Name}</p>
    </div>
    <div>
      <label className="text-sm font-medium">Email</label>
      <p className="mt-1">{user.email}</p>
    </div>
    <div>
      <label className="text-sm font-medium">Roles</label>
      <p className="mt-1">{user.role}</p>
    </div>
    <div>
      <label className="text-sm font-medium">Status</label>
      <p className="mt-1">
        <span
          className={`px-2 py-1 rounded-full text-xs ${
            user.status === "Active"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {user.status}
        </span>
      </p>
    </div>
  </div>
);

const ViewUserModal = ({ selectedUser }: ViewUserModalProps) => {
  const [viewModalOpen, setViewModalOpen] = useState(false);

  const handleClose = () => {
    setViewModalOpen(false);
  };

  return (
    <Modal
      open={viewModalOpen}
      onOpenChange={setViewModalOpen}
      trigger={<button>{<EyeIcon className="h-4 w-4" />}</button>}
      title="User Details"
    >
      <div className="space-y-4">
        <UserDetails user={selectedUser} />
        <div className="flex justify-end">
          <Button
            className="cursor-pointer"
            onClick={handleClose}
            type="button"
          >
            Close
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ViewUserModal;
