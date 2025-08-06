import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import {
  fetchRestaurants,
  editRestaurant,
} from "@/store/features/restaurant/restaurantSlice";
import { useEffect } from "react";
import { useState } from "react";
import { Modal } from "@/components/ui/modal";
import RestaurantUpdateForm from "@/components/restaurant/RestaurantUpdateForm";
import { toast } from "react-toastify";

const Pending = () => {
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDetailsData, setShowDetailsData] = useState<Restaurant | null>(
    null
  );
  const [showUpdateData, setShowUpdateData] = useState<Restaurant | null>(null);

  type Restaurant = {
    _id: string;
    restaurantName: string;
    logo?: string;
    coverPhoto?: string;
    status?: string;
    phone?: string;
    restaurantAddress?: string;
    description?: string;
    // Add other fields as needed
  };

  const dispatch = useAppDispatch();
  const { restaurants } = useAppSelector((state) => state.restaurant);

  useEffect(() => {
    dispatch(fetchRestaurants());
  }, [dispatch]);

  const handleClosePreviewModal = () => setShowPreviewModal(false);
  const handleCloseUpdateModal = () => setShowUpdateModal(false);

  const handleShowDetailsData = (restaurant: any) => {
    setShowDetailsData(restaurant);
    setShowPreviewModal(true);
  };

  const handleUpdateData = (restaurant: any) => {
    setShowUpdateData(restaurant);
    setShowUpdateModal(true);
  };

  const setShowModal = (open: any) => {
    setShowPreviewModal(open);
    setShowUpdateModal(open);
  };

  const pendingRestaurants = restaurants?.filter(
    (restaurant: any) => restaurant.status?.toLowerCase().trim() === "active"
  );
  return (
    <div className="space-y-4 mt-7">
      <h1 className="font-rubik text-sm sm:text-[18px] ">All Active</h1>
      {/* MAIN TABLE */}
      {pendingRestaurants && pendingRestaurants.length > 0 ? (
        <div>
          <Table>
            <TableBody>
              {pendingRestaurants.map((restaurant: any) => (
                <TableRow key={restaurant._id}>
                  <TableCell>
                    <div className="flex items-center gap-x-4">
                      <Avatar className="w-10 h-10">
                        <AvatarImage
                          src={restaurant.logo}
                          alt={restaurant.restaurantName}
                        />
                        <AvatarFallback>
                          {restaurant.restaurantName?.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <h1 className="text-xs sm:text-sm">
                        {restaurant.restaurantName}
                      </h1>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    {restaurant.status}
                  </TableCell>
                  <TableCell className="text-center">
                    {restaurant.phone}
                  </TableCell>
                  <TableCell className="text-center">
                    {restaurant.restaurantAddress}
                  </TableCell>
                  <TableCell colSpan={3} className="">
                    <div className="flex items-center justify-end space-x-4">
                      <button
                        onClick={() => handleShowDetailsData(restaurant)}
                        className="cursor-pointer"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z"
                            stroke="url(#paint0_linear_1118_20399)"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
                            stroke="url(#paint1_linear_1118_20399)"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <defs>
                            <linearGradient
                              id="paint0_linear_1118_20399"
                              x1="12"
                              y1="0.209106"
                              x2="13.1547"
                              y2="22.4486"
                              gradientUnits="userSpaceOnUse"
                            >
                              <stop stop-color="#56DAAB" />
                              <stop offset="1" stop-color="#0F9996" />
                            </linearGradient>
                            <linearGradient
                              id="paint1_linear_1118_20399"
                              x1="12"
                              y1="0.209106"
                              x2="13.1547"
                              y2="22.4486"
                              gradientUnits="userSpaceOnUse"
                            >
                              <stop stop-color="#56DAAB" />
                              <stop offset="1" stop-color="#0F9996" />
                            </linearGradient>
                          </defs>
                        </svg>
                      </button>
                      <div className="w-[1.5px] h-[15px] bg-gray-300" />
                      <button
                        onClick={() => handleUpdateData(restaurant)}
                        className="cursor-pointer"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M5.616 20C5.15533 20 4.771 19.846 4.463 19.538C4.155 19.23 4.00067 18.8453 4 18.384V5.61596C4 5.1553 4.15433 4.77096 4.463 4.46296C4.77167 4.15496 5.156 4.00063 5.616 3.99996H14.002L13.002 4.99996H5.616C5.462 4.99996 5.32067 5.06396 5.192 5.19196C5.06333 5.31996 4.99933 5.4613 5 5.61596V18.385C5 18.5383 5.064 18.6793 5.192 18.808C5.32 18.9366 5.461 19.0006 5.615 19H18.385C18.5383 19 18.6793 18.936 18.808 18.808C18.9367 18.68 19.0007 18.539 19 18.385V10.896L20 9.89596V18.385C20 18.845 19.846 19.2293 19.538 19.538C19.23 19.8466 18.8453 20.0006 18.384 20H5.616ZM10 14V11.385L18.944 2.44096C19.0547 2.3303 19.1707 2.25363 19.292 2.21096C19.4133 2.1683 19.5417 2.1473 19.677 2.14796C19.803 2.14796 19.9257 2.1693 20.045 2.21196C20.1643 2.25463 20.273 2.32463 20.371 2.42196L21.483 3.49996C21.5897 3.61063 21.6703 3.7323 21.725 3.86496C21.7797 3.99763 21.8073 4.13096 21.808 4.26496C21.8087 4.39896 21.7883 4.5263 21.747 4.64696C21.707 4.76696 21.6317 4.88196 21.521 4.99196L12.52 14H10ZM11 13H12.092L18.758 6.33396L18.212 5.78796L17.602 5.20396L11 11.806V13Z"
                            fill="url(#paint0_linear_1118_20401)"
                          />
                          <defs>
                            <linearGradient
                              id="paint0_linear_1118_20401"
                              x1="12.904"
                              y1="-2.08175"
                              x2="14.6756"
                              y2="22.6721"
                              gradientUnits="userSpaceOnUse"
                            >
                              <stop stop-color="#56DAAB" />
                              <stop offset="1" stop-color="#0F9996" />
                            </linearGradient>
                          </defs>
                        </svg>
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="text-center text-gray-500 mt-10">
          Sorry, there is no Pending restaurants.
        </div>
      )}
      <Modal
        open={showPreviewModal}
        onOpenChange={handleClosePreviewModal}
        trigger="Close"
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

      <Modal
        open={showUpdateModal}
        onOpenChange={handleCloseUpdateModal}
        trigger={<button style={{ display: "none" }} />}
        title="Update Restaurant Info"
      >
        {showUpdateData && (
          <RestaurantUpdateForm
            initialData={
              showUpdateData
                ? {
                    name: showUpdateData.restaurantName,
                    mail: showUpdateData.phone,
                    address: showUpdateData.restaurantAddress,
                    image: showUpdateData.logo,
                  }
                : undefined
            }
            onSave={(updatedData) => {
              if (!showUpdateData?._id) return;

              dispatch(
                editRestaurant({
                  id: showUpdateData._id,
                  restaurantName: updatedData.name,
                  phone: updatedData.mail,
                  restaurantAddress: updatedData.address,
                  logo: updatedData.image, // If you are uploading file, make sure it's a File object
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
