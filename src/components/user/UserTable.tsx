import { Button } from "@/components/ui/button";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { Modal } from "@/components/ui/modal";
import SuppleForm from "@/components/Forms/SuplleForm";
import SuppleInput from "@/components/Forms/SuppleInput";
import SuppleSelect from "@/components/Forms/SuppleDropdown";
import { SelectItem } from "@/components/ui/select";
import { userRoles } from "@/constants/roles";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import type { FieldValues } from "react-hook-form";
import type { User } from "../dashboard/StaffViewForOwner/user-type";

interface UserTableProps {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
}

export default function UserTable({ users, onEdit, onDelete }: UserTableProps) {
  const [viewModalOpen, setViewModalOpen] = useState(false);

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const validData = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    phone: z.string().min(1, { message: "Phone is required" }),
    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long" }),
    role: z.enum([
      "manager",
      "dine-in",
      "waiter",
      "takeaway",
      "chef",
      "cashier",
      "maintenance",
    ]),
  });

  type UserFormData = z.infer<typeof validData>;

  const handleView = (user: User) => {
    setSelectedUser(user);
    setViewModalOpen(true);
  };

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setEditModalOpen(true);
  };

  const handleEditSubmit = (data: FieldValues) => {
    if (selectedUser) {
      onEdit({ ...selectedUser, ...data });
      setEditModalOpen(false);
    }
  };

  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3">
              Sl.
            </th>
            <th scope="col" className="px-6 py-3">
              User Name
            </th>
            <th scope="col" className="px-6 py-3">
              Email
            </th>
            <th scope="col" className="px-6 py-3">
              Role
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id} className="bg-white border-b">
              <td className="px-6 py-4">{index + 1}</td>
              <td className="px-6 py-4">{user.Name}</td>
              <td className="px-6 py-4">{user.email}</td>
              <td className="px-6 py-4">{user.role}</td>
              <td className="px-6 py-4">
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    user.status === "Active"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {user.status}
                </span>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleView(user)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleEdit(user)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onDelete(user)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* View Modal */}
      <Modal
        open={viewModalOpen}
        onOpenChange={setViewModalOpen}
        trigger={<></>}
        title="User Details"
      >
        {selectedUser && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Name</label>
                <p className="mt-1">{selectedUser.Name}</p>
              </div>
              <div>
                <label className="text-sm font-medium">Email</label>
                <p className="mt-1">{selectedUser.email}</p>
              </div>
              <div>
                <label className="text-sm font-medium">Role</label>
                <p className="mt-1">{selectedUser.role}</p>
              </div>
              <div>
                <label className="text-sm font-medium">Status</label>
                <p className="mt-1">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      selectedUser.status === "Active"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {selectedUser.status}
                  </span>
                </p>
              </div>
            </div>
            <div className="flex justify-end">
              <Button onClick={() => setViewModalOpen(false)} type="button">
                Close
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Edit Modal */}
      <Modal
        open={editModalOpen}
        onOpenChange={setEditModalOpen}
        trigger={<></>}
        title="Edit User"
      >
        <SuppleForm<UserFormData>
          resolver={zodResolver(validData)}
          onSubmit={handleEditSubmit}
          className="grid gap-2"
          defaultValues={{
            name: selectedUser?.Name ?? "",
            email: selectedUser?.email ?? "",
            role: selectedUser?.role ?? undefined,
          }}
        >
          <div className="">
            <SuppleInput
              name="name"
              label="Name"
              placeholder="Name"
              type="text"
            />
          </div>
          <div className="">
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
          <div className="flex items-center space-x-2 justify-end">
            <Button
              onClick={() => setEditModalOpen(false)}
              type="button"
              variant="outline"
            >
              Cancel
            </Button>
            <Button type="submit">Save Changes</Button>
          </div>
        </SuppleForm>
      </Modal>
    </div>
  );
}

export const EditUser = ({ ButtonText }: { ButtonText: string }) => {
  const [open, setOpen] = useState(false);
  const validData = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    phone: z.string().min(1, { message: "Phone is required" }),
    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long" }),
    role: z.enum([
      "manager",
      "dine-in",
      "waiter",
      "takeaway",
      "chef",
      "cashier",
      "maintenance",
    ]),
  });

  const onSubmit = (data: FieldValues) => {
    console.log("Form data:", data);
    setOpen(false);
  };

  const closeModal = () => {
    setOpen(false);
  };

  return (
    <Modal
      open={open}
      onOpenChange={setOpen}
      trigger={<Button>{ButtonText}</Button>}
      title="Create New Sub User Account"
      description="Fill in the details below to create a new sub user account"
    >
      <SuppleForm
        resolver={zodResolver(validData)}
        onSubmit={onSubmit}
        className="grid gap-2"
      >
        <div className="">
          <SuppleInput
            name="name"
            label="Name"
            placeholder="Name"
            type="text"
          />
        </div>
        <div className="">
          <SuppleInput
            name="phone"
            label="Phone"
            placeholder="Phone"
            type="tel"
          />
        </div>
        <div className="">
          <SuppleInput
            name="email"
            label="Email"
            placeholder="Email"
            type="email"
          />
        </div>
        <div className="">
          <SuppleInput
            name="password"
            label="Password"
            placeholder="Password"
            type="password"
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
            Create User
          </Button>
        </div>
      </SuppleForm>
    </Modal>
  );
};
