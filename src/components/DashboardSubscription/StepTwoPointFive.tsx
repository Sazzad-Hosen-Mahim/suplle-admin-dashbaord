import Cookies from "js-cookie";
import { useState } from "react";
import { toast } from "react-toastify";

const StepTwoPointFive = ({
  planId,
  month,
  setMonth,
  setClientSecret,
}: {
  planId: string | null;
  month: string;
  setMonth: (m: string) => void;
  setClientSecret: (secret: string) => void;
}) => {
  const [selectMonth, setSelectMonth] = useState("1");
  const [loading, setLoading] = useState(false);

  console.log(planId);

  const handleChange = (month: string) => {
    setSelectMonth(month);
    setMonth(month);
  };

  const token = Cookies.get("accessToken");

  const handleFetchIntent = async () => {
    if (!planId || !selectMonth) return;

    setLoading(true);

    try {
      const res = await fetch(
        `${
          import.meta.env.VITE_BACKEND_BASE_URL
        }/subscription/create-subscription-intent`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token ?? "",
          },
          body: JSON.stringify({
            planId,
            months: Number(selectMonth),
          }),
        }
      );
      toast.info("Creating payment intent...");
      if (!res.ok) {
        const errorData = await res.json();
        toast.error(
          `Error: ${errorData.message || "Failed to create payment intent"}`
        );
        return;
      }
      toast.success("Payment intent created successfully");
      const data = await res.json();
      setClientSecret(data.clientSecret);
      setMonth(selectMonth); // officially apply month selection
    } catch (err) {
      console.error("Failed to create payment intent", err);
    } finally {
      setLoading(false);
    }
  };

  //   console.log(selectMonth, "monthhhhhhhhhh");

  return (
    <div>
      <select
        name="month"
        className="border rounded px-2 py-1 w-full mt-6"
        required
        value={month}
        onChange={(e) => handleChange(e.target.value)}
      >
        <option value="">Select Month</option>
        {[...Array(12)].map((_, i) => (
          <option key={i + 1} value={i + 1}>
            {i + 1}
          </option>
        ))}
      </select>
      <button
        disabled={!selectMonth || !planId || loading}
        onClick={handleFetchIntent}
        className="mt-4 px-4 py-2 bg-primary text-white rounded cursor-pointer"
      >
        {loading ? "Loading..." : "Confirm Month"}
      </button>
    </div>
  );
};

export default StepTwoPointFive;
