import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Modal } from "../ui/modal";
import RestaurantUpdateForm from "./RestaurantUpdateForm";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import {
  fetchRestaurants,
  editRestaurant,
} from "@/store/features/restaurant/restaurantSlice";
import EyeButton from "../icons/EyeButton";
import { TfiPencilAlt } from "react-icons/tfi";
import { toast } from "react-toastify";
import Pagination from "@/utils/Pagination";

type Restaurant = {
  _id: string;
  logo: string;
  restaurantName: string;
  status: string;
  phone: string;
  restaurantAddress: string;
  coverPhoto?: string;
  description?: string;
};

const AllRestaurant = () => {
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDetailsData, setShowDetailsData] = useState<Restaurant | null>(null);
  const [showUpdateData, setShowUpdateData] = useState<Restaurant | null>(null);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [paginatedRestaurants, setPaginatedRestaurants] = useState<Restaurant[]>([]);

  const itemsPerPage = 10;

  const dispatch = useAppDispatch();
  const { restaurants, loading, error } = useAppSelector((state) => state.restaurant);

  useEffect(() => {
    dispatch(fetchRestaurants());
  }, [dispatch]);

  // ✅ Handle Pagination Locally
  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setPaginatedRestaurants(restaurants.slice(startIndex, endIndex));
  }, [restaurants, currentPage]);

  const handleShowDetailsData = (restaurant: Restaurant) => {
    setShowDetailsData(restaurant);
    setShowPreviewModal(true);
  };

  const handleUpdateData = (restaurant: Restaurant) => {
    setShowUpdateData(restaurant);
    setShowUpdateModal(true);
  };

  return (
    <div className="space-y-4 mt-7">
      <h1 className="font-rubik text-sm sm:text-[18px]">All Restaurants</h1>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500">Error: {error}</p>
      ) : (
        <>
          <Table>
            <TableBody>
              {paginatedRestaurants.map((restaurant) => (
                <TableRow key={restaurant._id}>
                  <TableCell>
                    <div className="flex items-center gap-x-4">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={restaurant.logo} alt="logo" />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                      <h1 className="text-xs sm:text-sm">
                        {restaurant.restaurantName}
                      </h1>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">{restaurant.status}</TableCell>
                  <TableCell className="text-center">{restaurant.phone}</TableCell>
                  <TableCell className="text-center">{restaurant.restaurantAddress}</TableCell>
                  <TableCell colSpan={3}>
                    <div className="flex items-center justify-end space-x-4">
                      <button
                        onClick={() => handleShowDetailsData(restaurant)}
                        className="cursor-pointer"
                      >
                        <EyeButton />
                      </button>
                      <div className="w-[1.5px] h-[15px] bg-gray-300" />
                      <button
                        onClick={() => handleUpdateData(restaurant)}
                        className="cursor-pointer"
                      >
                        <TfiPencilAlt className="text-[#56DAAB] w-4 h-4" />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* ✅ Pagination Component (without onPageChange) */}
          <Pagination
            data={restaurants}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            onPageChange={() => {}}
          />
        </>
      )}

      {/* 📦 Preview Modal */}
      <Modal
        open={showPreviewModal}
        onOpenChange={(open) => setShowPreviewModal(open)}
        trigger={<span />}
        title="Restaurant Details"
      >
        {showDetailsData && (
          <div className="text-center space-y-4">
            <img
              src={showDetailsData.coverPhoto || showDetailsData.logo}
              alt="cover"
              className="w-24 h-24 object-cover rounded mx-auto"
            />
            <h1 className="text-green-600 text-lg font-semibold">
              {showDetailsData.restaurantName}
            </h1>
            <p>Status: {showDetailsData.status}</p>
            <p>Phone: {showDetailsData.phone}</p>
            <p>Address: {showDetailsData.restaurantAddress}</p>
            <p>Description: {showDetailsData.description}</p>
          </div>
        )}
      </Modal>

      {/* ✏️ Update Modal */}
      <Modal
        open={showUpdateModal}
        onOpenChange={(open) => setShowUpdateModal(open)}
        trigger={<span />}
        title="Update Restaurant Info"
      >
        {showUpdateData && (
          <RestaurantUpdateForm
            initialData={{
              name: showUpdateData.restaurantName,
              mail: showUpdateData.phone,
              address: showUpdateData.restaurantAddress,
              image: showUpdateData.logo,
            }}
            loading={updateLoading}
            onSave={async (updatedData) => {
              if (!showUpdateData?._id) return;
              setUpdateLoading(true);

              try {
                await dispatch(
                  editRestaurant({
                    id: showUpdateData._id,
                    restaurantName: updatedData.name,
                    phone: updatedData.mail,
                    restaurantAddress: updatedData.address,
                    logo: updatedData.image,
                  })
                ).unwrap();

                toast.success("Restaurant updated successfully");
                setShowUpdateModal(false);
                dispatch(fetchRestaurants());
              } catch (err) {
                toast.error(`Update failed: ${err}`);
              } finally {
                setUpdateLoading(false);
              }
            }}
          />
        )}
      </Modal>
    </div>
  );
};

export default AllRestaurant;
