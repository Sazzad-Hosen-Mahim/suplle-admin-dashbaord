import SuppleForm from "@/components/Forms/SuplleForm";
import SuppleInput from "@/components/Forms/SuppleInput";
import Cookies from "js-cookie";
import axios from "axios";
import { toast } from "react-toastify";
import type { PurchaseDetails } from "./BuySubscription";
import { useAppDispatch } from "@/hooks/useRedux";
import { qrPaymentIntent } from "@/store/features/admin/qrOrderSlice";

interface TableQuantityProps {
  selectId: string;
  setPurchaseDetails: (details: PurchaseDetails) => void;
  setClientSecret: (clientSecret: string) => void;
}

const TableQuantity = ({
  selectId,
  setPurchaseDetails,
  setClientSecret,
}: TableQuantityProps) => {
  const token = Cookies.get("accessToken");

  const dispatch = useAppDispatch();

  const handleSubmit = async (data: { inputTable: string }) => {
    const payload = {
      qrCodeDesign: selectId,
      tableQuantity: Number(data.inputTable),
    };
    try {
      const response = await axios.post(
        `${
          import.meta.env.VITE_BACKEND_BASE_URL
        }/qr-code-purchase/qr-code-purchase`,
        payload,
        {
          headers: {
            Authorization: token ? token : "",
            "Content-Type": "application/json",
          },
        }
      );
      setPurchaseDetails(response.data.data);
      const purchaseId = response.data.data._id;
      const paymentIntentRes = await dispatch(
        qrPaymentIntent({ qrCodeDesignPurchaseId: purchaseId })
      );
      if (qrPaymentIntent.fulfilled.match(paymentIntentRes)) {
        setClientSecret(paymentIntentRes.payload.clientSecret);
      }
      console.log("Response:", response.data);
      toast.success("Qr code added successfully. Please pay for proceed.");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <SuppleForm defaultValues={{ inputTable: "" }} onSubmit={handleSubmit}>
        <SuppleInput
          name="inputTable"
          className=""
          containerClassName=""
          type="number"
          placeholder="Enter Table Quantity"
          required
        />
        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-primary text-white rounded cursor-pointer"
        >
          Submit
        </button>
      </SuppleForm>
    </div>
  );
};

export default TableQuantity;
