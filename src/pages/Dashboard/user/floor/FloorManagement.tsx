import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

interface Floor {
  _id: string;
  floorName: string;
}

interface FloorManagementProps {
  selectedFloor: Floor | null;
  setSelectedFloor: (floor: Floor) => void;
}

const FloorManagement: React.FC<FloorManagementProps> = ({
  selectedFloor,
  setSelectedFloor,
}) => {
  const [floors, setFloors] = useState<Floor[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newFloor, setNewFloor] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  const fetchFloors = async () => {
    const token = Cookies.get("accessToken");
    try {
      setIsFetching(true);
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/floor/all-floor`,
        {
          headers: {
            Authorization: token || "",
          },
        }
      );

      const data: Floor[] = res.data?.data?.result || [];
      setFloors(data);

      // Auto-select first floor if none selected
      if (!selectedFloor && data.length > 0) {
        setSelectedFloor(data[0]);
      }
    } catch (err) {
      console.error("Failed to fetch floors", err);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchFloors();
  }, []);

  const handleAddFloor = async () => {
    const trimmedName = newFloor.trim();
    if (!trimmedName || floors.some((f) => f.floorName === trimmedName)) return;

    const token = Cookies.get("accessToken");

    try {
      setIsLoading(true);
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/floor/create-floor`,
        { floorName: trimmedName },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token || "",
          },
        }
      );

      if (res.data?.success) {
        const createdFloor: Floor = res.data.data;
        setFloors((prev) => [...prev, createdFloor]);
        setSelectedFloor(createdFloor);
        setNewFloor("");
        setIsModalOpen(false);
        toast.success("Floor created");
      } else {
        alert("Failed to add floor. Try again.");
      }
    } catch (err) {
      console.error(err);
      alert("Error occurred while creating floor.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="bg-white p-4 rounded-lg shadow mt-12 md:mt-0 dark:bg-primary-dark">
        <h2 className="font-medium mb-4 dark:text-white">Floors</h2>

        <button
          className="w-full bg-teal-500 text-white py-2 px-4 rounded-full hover:bg-teal-600 mb-4"
          onClick={() => setIsModalOpen(true)}
        >
          Add New Floor
        </button>

        {isFetching ? (
          <div className="text-center text-gray-600 dark:text-gray-300">
            Loading floors...
          </div>
        ) : floors.length === 0 ? (
          <div className="text-center text-gray-600 dark:text-gray-300">
            No floors found.
          </div>
        ) : (
          floors.map((floor) => (
            <button
              key={floor._id}
              className={cn(
                "w-full py-2 px-4 rounded-md mb-2",
                selectedFloor?._id === floor._id
                  ? "bg-teal-500 text-white"
                  : "bg-gray-400 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600"
              )}
              onClick={() => setSelectedFloor(floor)}
            >
              {floor.floorName}
            </button>
          ))
        )}
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Floor</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              placeholder="Enter floor name"
              value={newFloor}
              onChange={(e) => setNewFloor(e.target.value)}
            />
            <Button
              onClick={handleAddFloor}
              disabled={isLoading || !newFloor.trim()}
              className="w-full"
            >
              {isLoading ? "Adding..." : "Add Floor"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default FloorManagement;
