import { useState, useEffect, useCallback, useRef } from "react";
import qrCode from "../../assets/demoQR.png";
import SectionHeader from "@/components/ui/sectionHeader";
import { IoMenu, IoClose } from "react-icons/io5";
import { cn } from "@/lib/utils";
import CreateLayoutModal from "@/components/dashboard/UserViewForOwner/CreateLayoutModal";
import FloorManagement from "./user/floor/FloorManagement";
import TableProperties from "./user/table/TableProperties";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

interface TableProps {
  id: number;
  qrCode: string;
}

interface Floor {
  _id: string;
  floorName: string;
}

const RestaurantLayout = () => {
  const [selectedFloor, setSelectedFloor] = useState<Floor | null>(null);
  const [numTables, setNumTables] = useState("12");
  const [capacity, setCapacity] = useState("6");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [tables, setTables] = useState<TableProps[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isLoadingTables, setIsLoadingTables] = useState(false);

  // Cache tables by floor ID to enable quick switching without refetch
  const floorTablesCache = useRef<Record<string, TableProps[]>>({});

  // Fetch tables for selected floor or load from cache
  useEffect(() => {
    if (!selectedFloor) {
      setTables([]);
      return;
    }

    // If cached, load from cache immediately
    if (floorTablesCache.current[selectedFloor._id]) {
      setTables(floorTablesCache.current[selectedFloor._id]);
      return;
    }

    // Otherwise fetch from API
    const fetchTables = async () => {
      const token = Cookies.get("accessToken");
      if (!token) return;

      setIsLoadingTables(true);
      setTables([]);

      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_BASE_URL}/table/get-all-table/${
            selectedFloor._id
          }`,
          { headers: { Authorization: token } }
        );

        if (res.data?.success) {
          interface ApiTable {
            qrCodeUrl?: string;
          }
          const fetchedTables = res.data.data.result.map(
            (table: ApiTable, index: number) => ({
              id: index + 1,
              qrCode: table.qrCodeUrl || qrCode,
            })
          );
          setTables(fetchedTables);

          // Cache tables for this floor
          floorTablesCache.current[selectedFloor._id] = fetchedTables;
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoadingTables(false);
      }
    };

    fetchTables();
  }, [selectedFloor]);

  const handleDownloadQR = useCallback(
    (tableId: number) => {
      const table = tables.find((t) => t.id === tableId);
      if (!table) return;

      const link = document.createElement("a");
      link.href = table.qrCode;
      link.download = `table_${tableId}_qr_code.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
    [tables]
  );

  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen((prev) => !prev);
  }, []);

  const handleGenerateQRCode = useCallback(async () => {
    if (!selectedFloor) {
      toast.error("Please select a floor first.");
      return;
    }

    const token = Cookies.get("accessToken");
    if (!token) {
      toast.error("No access token found. Please login.");
      return;
    }

    setIsGenerating(true);

    try {
      const res = await axios.post(
        `${
          import.meta.env.VITE_BACKEND_BASE_URL
        }/table/create-table-with-qrcode`,
        {
          numTables: Number(numTables),
          capacity: Number(capacity),
          floor: selectedFloor._id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );

      if (res.data?.success) {
        interface CreatedTable {
          qrCodeUrl?: string;
        }
        const createdTables = res.data.data.map(
          (table: CreatedTable, index: number) => ({
            // Continue id after existing tables length
            id: tables.length + index + 1,
            qrCode: table.qrCodeUrl || qrCode,
          })
        );

        // Merge new tables with existing ones
        setTables((prevTables) => {
          const updatedTables = [...prevTables, ...createdTables];
          // Update cache as well
          floorTablesCache.current[selectedFloor._id] = updatedTables;
          return updatedTables;
        });

        toast.success("Tables and QR codes generated successfully!");
      } else {
        toast.error("Failed to generate tables. Please try again.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error occurred while generating tables.");
    } finally {
      setIsGenerating(false);
    }
  }, [selectedFloor, numTables, capacity, tables.length]);

  return (
    <div className="min-h-screen">
      <div className="flex gap-4 items-center justify-between">
        <SectionHeader className="flex-1" title="Restaurant Layout" />
        <button
          type="button"
          aria-label="Toggle sidebar"
          className="md:hidden p-2 rounded-lg bg-teal-500 text-white"
          onClick={toggleSidebar}
        >
          {isSidebarOpen ? <IoClose size={24} /> : <IoMenu size={24} />}
        </button>
      </div>

      <div className="flex justify-end py-5">
        <CreateLayoutModal ButtonText="Create Layout" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 py-6 relative">
        {/* Sidebar */}
        <div
          className={cn(
            "space-y-6 col-span-3 md:col-span-1",
            "fixed md:relative top-0 right-0 h-full w-3/4 md:w-auto",
            "p-4 md:p-0 z-50 transform transition-transform duration-300 ease-in-out",
            "shadow-lg md:shadow-none bg-white dark:bg-primary-dark",
            isSidebarOpen
              ? "translate-x-0"
              : "translate-x-full md:translate-x-0"
          )}
        >
          <button
            type="button"
            aria-label="Close sidebar"
            className="md:hidden absolute top-4 left-4 p-2 rounded-lg bg-teal-500 text-white"
            onClick={toggleSidebar}
          >
            <IoClose size={24} />
          </button>

          <FloorManagement
            selectedFloor={selectedFloor}
            setSelectedFloor={setSelectedFloor}
          />

          <TableProperties
            numTables={numTables}
            setNumTables={setNumTables}
            capacity={capacity}
            setCapacity={setCapacity}
            onGenerateQRCode={handleGenerateQRCode}
            isGenerating={isGenerating}
          />
        </div>

        {/* Overlay */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
            onClick={toggleSidebar}
          />
        )}

        {/* Table Grid */}
        <div className="col-span-3">
          {isLoadingTables ? (
            <p className="text-center text-gray-500">Loading tables...</p>
          ) : tables.length === 0 ? (
            <p className="text-center text-gray-500">No tables available.</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
              {tables.map((table) => (
                <div
                  key={table.id}
                  className="bg-white dark:bg-primary-dark p-4 rounded-lg shadow text-center"
                >
                  <h3 className="font-medium mb-2">Table {table.id}</h3>
                  <img
                    src={table.qrCode}
                    onError={(e) => (e.currentTarget.src = qrCode)}
                    alt={`QR Code for Table ${table.id}`}
                    className="w-28 h-28 rounded mx-auto mb-2"
                  />
                  <button
                    type="button"
                    onClick={() => handleDownloadQR(table.id)}
                    className="w-full bg-teal-500 text-white p-1 md:py-2 md:px-3 rounded-full hover:bg-teal-600"
                  >
                    Download QR
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RestaurantLayout;
