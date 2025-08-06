import { useAppDispatch } from "@/hooks/useRedux";
import type { PurchaseDetails } from "./BuySubscription";
import { useEffect, useState } from "react";
import { qrPaymentIntent } from "@/store/features/admin/qrOrderSlice";
import { toast } from "react-toastify";
import axios from "axios";

const PurchaseQrCode = ({
  purchaseDetails,
  setClientSecret,
}: {
  purchaseDetails: PurchaseDetails | null;
  setClientSecret?: (clientSecret: string) => void;
}) => {
  const dispatch = useAppDispatch();
  const [, setPaymentIntent] = useState<Record<string, unknown> | null>(null);
  const [latestDetails, setLatestDetails] = useState<PurchaseDetails | null>(
    purchaseDetails
  );

  useEffect(() => {
    if (!latestDetails || latestDetails.status === "approved") return;
    const interval = setInterval(async () => {
      try {
        const token = localStorage.getItem("accessToken") || "";
        const res = await axios.get(
          `${
            import.meta.env.VITE_BACKEND_BASE_URL
          }/qr-code-purchase/get-single-qr-purchase/${latestDetails._id}`,
          { headers: { Authorization: token } }
        );
        if (res.data?.data?.status) {
          setLatestDetails((prev) => ({
            ...prev!,
            status: res.data.data.status,
          }));
        }
      } catch {
        console.error("Error fetching latest purchase details");
      }
    }, 3000); // poll every 3 seconds
    return () => clearInterval(interval);
  }, [latestDetails]);

  if (!latestDetails) return <div>No purchase details.</div>;

  const handlePaymentIntent = async () => {
    if (!purchaseDetails) {
      toast.error("Purchase details are missing.");
      return;
    }
    const resultAction = await dispatch(
      qrPaymentIntent({ qrCodeDesignPurchaseId: purchaseDetails._id })
    );
    if (qrPaymentIntent.fulfilled.match(resultAction)) {
      setPaymentIntent(resultAction.payload);
      // You can handle the payment intent result here (e.g., show Stripe, etc.)
      toast.success("Payment intent created successfully");
      console.log("Payment Intent:", resultAction.payload);
      setClientSecret?.(resultAction.payload.clientSecret || "");
    } else {
      // Handle error
      toast.error("Failed to create payment intent");
    }
  };
  console.log(purchaseDetails, "purchase details");
  return (
    <div>
      <h2>Purchase Summary</h2>
      <p>Design: {latestDetails.qrCodeDesign}</p>
      <p>Table Quantity: {latestDetails.tableQuantity}</p>
      <p>Price: ${latestDetails.price}</p>
      <p>Status: {latestDetails.status}</p>
      <p>Created: {new Date(latestDetails.createdAt).toLocaleString()}</p>
      {latestDetails.status !== "approved" ? (
        <div className="mt-4 text-yellow-600">
          Please wait for admin approval before proceeding to payment.
        </div>
      ) : (
        <button
          className="mt-4 px-4 py-2 bg-primary text-white rounded cursor-pointer"
          onClick={handlePaymentIntent}
        >
          Pay Now
        </button>
      )}
    </div>
  );
};

export default PurchaseQrCode;
