import { Button } from "@/components/ui/button";
import SectionHeader from "@/components/ui/sectionHeader";
import { useAppDispatch } from "@/hooks/useRedux";
import { switchAccount } from "@/store/features/Switch Account/switchAccount";
import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Restaurant {
  _id: string;
  restaurantName: string;
  restaurantAddress?: string;
}

const DashbordComponent = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    restaurantName: "",
    restaurantAddress: "",
    phone: "",
    tagline: "",
    description: "",
  });
  const [creating, setCreating] = useState(false);
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  useEffect(() => {
    const user = Cookies.get("user");
    if (!user) {
      navigate("/login");
      return;
    }
    try {
      const parsedUser = JSON.parse(user);
      // Fetch the latest user data from the backend
      axios
        .get(
          `${import.meta.env.VITE_BACKEND_BASE_URL}/users/single-user/${
            parsedUser._id
          }`,
          {
            headers: {
              Authorization: Cookies.get("accessToken") || "",
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          const restaurantArr = res.data?.data?.restaurant || [];
          setRestaurants(Array.isArray(restaurantArr) ? restaurantArr : []);
        })
        .catch(() => {
          setRestaurants([]);
        });
    } catch {
      setRestaurants([]);
    }
  }, [navigate]);

  console.log(restaurants, "restaurants in alimmmmmmmmmmm");

  const handleSelect = async (restaurantId: string) => {
    const user = Cookies.get("user");
    if (!user) return;
    const parsedUser = JSON.parse(user);
    if (!parsedUser.email) return;
    try {
      setLoading(true);
      await dispatch(
        switchAccount({ email: parsedUser.email, restaurantId })
      ).unwrap();
      navigate(`/dashboard/menu/add`);
    } catch {
      alert("Failed to switch account. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCreateRestaurant = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreating(true);
    try {
      const token = Cookies.get("accessToken");
      await axios.post(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/restaurant/create-restaurant`,
        form,
        {
          headers: {
            Authorization: token ? token : "",
            "Content-Type": "application/json",
          },
        }
      );
      setShowModal(false);
      setForm({
        restaurantName: "",
        restaurantAddress: "",
        phone: "",
        tagline: "",
        description: "",
      });
      // Optionally, refresh restaurant list here
      window.location.reload();
    } catch {
      alert("Failed to create restaurant. Please try again.");
    } finally {
      setCreating(false);
    }
  };

  return (
    <>
      <SectionHeader
        title="All Restaurant"
        rightContent={
          <Button onClick={() => setShowModal(true)}>Create Restaurant</Button>
        }
      />
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-lg bg-opacity-30 z-50">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-opacity-40">
          <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
            <button
              className="absolute top-2 right-3 text-xl"
              onClick={() => setShowModal(false)}
              aria-label="Close"
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-4">Create Restaurant</h2>
            <form onSubmit={handleCreateRestaurant} className="space-y-3">
              <input
                name="restaurantName"
                value={form.restaurantName}
                onChange={handleInputChange}
                placeholder="Restaurant Name"
                required
                className="w-full border rounded px-3 py-2"
              />
              <input
                name="restaurantAddress"
                value={form.restaurantAddress}
                onChange={handleInputChange}
                placeholder="Restaurant Address"
                required
                className="w-full border rounded px-3 py-2"
              />
              <input
                name="phone"
                value={form.phone}
                onChange={handleInputChange}
                placeholder="Phone"
                required
                className="w-full border rounded px-3 py-2"
              />
              <input
                name="tagline"
                value={form.tagline}
                onChange={handleInputChange}
                placeholder="Tagline"
                required
                className="w-full border rounded px-3 py-2"
              />
              <textarea
                name="description"
                value={form.description}
                onChange={handleInputChange}
                placeholder="Description"
                required
                className="w-full border rounded px-3 py-2"
                rows={3}
              />
              <Button type="submit" className="w-full mt-2" disabled={creating}>
                {creating ? "Creating..." : "Create"}
              </Button>
            </form>
          </div>
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
        {restaurants.length === 0 && (
          <div className="text-gray-500 col-span-full">
            No restaurants found.
          </div>
        )}
        {restaurants.map((restaurant) => (
          <div
            key={restaurant._id}
            className="cursor-pointer border rounded-lg p-4 shadow hover:shadow-lg transition bg-primary/30 h-[120px]"
            onClick={() => handleSelect(restaurant._id)}
          >
            <h3 className="font-bold text-lg">{restaurant.restaurantName}</h3>
            {restaurant.restaurantAddress && (
              <p className="text-gray-500 text-sm">
                {restaurant.restaurantAddress}
              </p>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default DashbordComponent;
