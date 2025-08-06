import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { fetchRestaurants, editRestaurant } from "@/store/features/restaurant/restaurantSlice";
import { Modal } from "@/components/ui/modal";
import RestaurantUpdateForm from "@/components/restaurant/RestaurantUpdateForm";
import { toast } from "react-toastify";
import Pagination from "@/utils/Pagination";  // Import your Pagination component here

const Pending = () => {
  type Restaurant = {
    _id: string;
    restaurantName: string;
    logo?: string;
    coverPhoto?: string;
    status?: string;
    phone?: string;
    restaurantAddress?: string;
    description?: string;
  };

  const dispatch = useAppDispatch();
  const { restaurants, loading, error } = useAppSelector((state) => state.restaurant);

  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDetailsData, setShowDetailsData] = useState<Restaurant | null>(null);
  const [showUpdateData, setShowUpdateData] = useState<Restaurant | null>(null);

  // Pagination state for current page and the sliced data
  const [currentPage, setCurrentPage] = useState(1);
  const [paginatedRestaurants, setPaginatedRestaurants] = useState<Restaurant[]>([]);

  useEffect(() => {
    dispatch(fetchRestaurants());
  }, [dispatch]);

  // Reset page if restaurants change (optional)
  useEffect(() => {
    setCurrentPage(1);
  }, [restaurants]);

  const handleClosePreviewModal = () => setShowPreviewModal(false);
  const handleCloseUpdateModal = () => setShowUpdateModal(false);

  const handleShowDetailsData = (restaurant: Restaurant) => {
    setShowDetailsData(restaurant);
    setShowPreviewModal(true);
  };

  const handleUpdateData = (restaurant: Restaurant) => {
    setShowUpdateData(restaurant);
    setShowUpdateModal(true);
  };

  const setShowModal = (open: boolean) => {
    setShowPreviewModal(open);
    setShowUpdateModal(open);
  };

  // Filter pending restaurants
  const pendingRestaurants = restaurants?.filter(
    (restaurant: Restaurant) => restaurant.status?.toLowerCase().trim() === "pending"
  ) || [];

  return (
    <div className="space-y-4 mt-7">
      <h1 className="font-rubik text-sm sm:text-[18px]">All Pending</h1>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500">Error: {error}</p>
      ) : pendingRestaurants.length === 0 ? (
        <div className="text-center text-gray-500 mt-10">Sorry, there is no Pending restaurants.</div>
      ) : (
        <>
          <Table>
            <TableBody>
              {paginatedRestaurants.map((restaurant) => (
                <TableRow key={restaurant._id}>
                  <TableCell>
                    <div className="flex items-center gap-x-4">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={restaurant.logo} alt={restaurant.restaurantName} />
                        <AvatarFallback>{restaurant.restaurantName?.slice(0, 2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <h1 className="text-xs sm:text-sm">{restaurant.restaurantName}</h1>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">{restaurant.status}</TableCell>
                  <TableCell className="text-center">{restaurant.phone}</TableCell>
                  <TableCell className="text-center">{restaurant.restaurantAddress}</TableCell>
                  <TableCell colSpan={3} className="">
                    <div className="flex items-center justify-end space-x-4">
                      <button onClick={() => handleShowDetailsData(restaurant)} className="cursor-pointer">
                        {/* Eye icon SVG */}
                        {/* ... */}
                      </button>
                      <div className="w-[1.5px] h-[15px] bg-gray-300" />
                      <button onClick={() => handleUpdateData(restaurant)} className="cursor-pointer">
                        {/* Pencil icon SVG */}
                        {/* ... */}
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Use Pagination component here */}
          <Pagination
            data={pendingRestaurants}
            itemsPerPage={10}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            onPageChange={(items) => setPaginatedRestaurants(items as Restaurant[])}
          />
        </>
      )}

      {/* Preview Modal */}
      <Modal open={showPreviewModal} onOpenChange={handleClosePreviewModal} trigger="Close" title="Restaurant Details">
        {showDetailsData && (
          <div className="text-center space-y-4">
            <img
              src={showDetailsData.coverPhoto || showDetailsData.logo}
              alt="cover"
              className="w-24 h-24 object-cover rounded mx-auto"
            />
            <h1 className="text-green-600 text-lg font-semibold">{showDetailsData.restaurantName}</h1>
            <p>Status: {showDetailsData.status}</p>
            <p>Phone: {showDetailsData.phone}</p>
            <p>Address: {showDetailsData.restaurantAddress}</p>
            <p>Description: {showDetailsData.description}</p>
          </div>
        )}
      </Modal>

      {/* Update Modal */}
      <Modal open={showUpdateModal} onOpenChange={handleCloseUpdateModal} trigger={<button style={{ display: "none" }} />} title="Update Restaurant Info">
        {showUpdateData && (
          <RestaurantUpdateForm
            initialData={{
              name: showUpdateData.restaurantName,
              mail: showUpdateData.phone,
              address: showUpdateData.restaurantAddress,
              image: showUpdateData.logo,
            }}
            onSave={(updatedData) => {
              if (!showUpdateData?._id) return;

              dispatch(
                editRestaurant({
                  id: showUpdateData._id,
                  restaurantName: updatedData.name,
                  phone: updatedData.mail,
                  restaurantAddress: updatedData.address,
                  logo: updatedData.image,
                })
              )
                .unwrap()
                .then(() => {
                  toast.success("Restaurant updated successfully");
                  setShowModal(false);
                })
                .catch((err) => {
                  toast.error(`Update failed: ${err}`);
                });
            }}
          />
        )}
      </Modal>
    </div>
  );
};

export default Pending;
