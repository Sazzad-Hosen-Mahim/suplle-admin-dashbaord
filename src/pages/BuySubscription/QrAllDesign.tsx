import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import PlanCard from "./PlanCard";

interface QrPurchase {
  _id: string;
  price: number;
  name: string;
  tableQuantity: number;
  status: string;
  qrCodeDesign: string;
  image: string;
}

interface QrAllDesignProps {
  setSelectId: (id: string) => void;
}

// interface PlanCardDesign {
//   id: string;
//   status: "available" | "comingSoon" | "unavailable";
//   imageUrl: string;
//   name: string;
//   category: string;
//   description: string;
//   price: number;
// }

const QrAllDesign: React.FC<QrAllDesignProps> = ({ setSelectId }) => {
  const [purchases, setPurchases] = useState<QrPurchase[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    const token = Cookies.get("accessToken");
    fetch(
      `${
        import.meta.env.VITE_BACKEND_BASE_URL
      }/QrCodeDesign/get-all-QrCodeDesign?status=Available`,
      {
        headers: {
          Authorization: token || "",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setPurchases(data.data.result);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;

  console.log(selectedId, "id from here");

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {purchases.map((purchase) => (
        <div
          key={purchase._id}
          onClick={() => {
            setSelectedId(purchase._id);
            setSelectId(purchase._id);
          }}
          className={`rounded-lg transition-all cursor-pointer ${
            selectedId === purchase._id
              ? "border-2 border-primary ring-2 ring-primary"
              : "border border-gray-200 hover:border-primary"
          }`}
        >
          <PlanCard
            design={{
              id: purchase._id,
              status: ["available", "comingSoon", "unavailable"].includes(
                purchase.status
              )
                ? (purchase.status as
                    | "available"
                    | "comingSoon"
                    | "unavailable")
                : "unavailable",
              imageUrl: purchase.image,
              name: `Design Name: ${purchase.name}`,
              category: "QR Purchase",
              description: `Table Quantity: ${purchase.tableQuantity}`,
              price: purchase.price,
            }}
            onEdit={() => alert(`Edit purchase ${purchase._id}`)}
            onStatusChange={() => alert(`Change status for ${purchase._id}`)}
            statusChangeLabel={purchase.status}
          />
        </div>
      ))}
    </div>
  );
};

export default QrAllDesign;
