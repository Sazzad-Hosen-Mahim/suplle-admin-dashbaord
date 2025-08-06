import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { userRoles } from "@/constants/roles";
import { SearchIcon } from "lucide-react";

interface SearchAndFilterBarProps {
  onRoleChange?: (role: string) => void;
  onStatusChange?: (status: string) => void;
  onSearch?: (query: string) => void;
}

const SearchAndFilterBar = ({ onRoleChange, onStatusChange, onSearch }: SearchAndFilterBarProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="space-y-2">
        <Label htmlFor="userRole">User Role</Label>
        <Select onValueChange={onRoleChange}>
          <SelectTrigger id="userRole" className="w-full">
            <SelectValue placeholder="Select user role" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>User Role</SelectLabel>
              {
                userRoles.map((role) => (
                  <SelectItem key={role.value} value={role.value}>
                    {role.label}
                  </SelectItem>
                ))
              }
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="status">Status</Label>
        <Select onValueChange={onStatusChange}>
          <SelectTrigger id="status" className="w-full">
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Status</SelectLabel>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="search">Search Users</Label>
        <div className="relative">
          <Input
            name="search"
            id="search"
            placeholder="Search by name, role..."
            className="pl-3 pr-10"
            onChange={(e) => onSearch?.(e.target.value)}
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
            <SearchIcon className="h-4 w-4" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchAndFilterBar; 