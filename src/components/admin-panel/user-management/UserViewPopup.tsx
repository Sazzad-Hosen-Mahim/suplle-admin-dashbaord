// components/UserViewPopup.tsx
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { User } from "./user";

interface UserViewPopupProps {
  user: User | null;
  onClose: () => void;
}

export const UserViewPopup: React.FC<UserViewPopupProps> = ({
  user,
  onClose,
}) => {
  if (!user) return null;

  return (
    <Dialog open={!!user} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>User Details</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex flex-col items-center gap-4">
            <Avatar className="w-20 h-20">
              <AvatarImage src={user.image} alt={user.name} />
              <AvatarFallback>
                {user.name?.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <h2 className="text-xl font-semibold">{user.name}</h2>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p>{user.mail}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Role</p>
              <p>{user.role}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Status</p>
              <p>{user.status}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Vendor</p>
              <p>{user.vendor}</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
