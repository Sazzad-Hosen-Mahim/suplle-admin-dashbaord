import { Check } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { fetchSubscriptions } from "@/store/features/admin/plan/subscriptionPlan";
import { useEffect, useState, type SetStateAction, type Dispatch } from "react";

const StepTwo = ({
  selectedId,
  setSelectedId,
}: {
  selectedId: string | null;
  setSelectedId: Dispatch<SetStateAction<string | null>>;
}) => {
  const dispatch = useAppDispatch();
  const { subscriptions } = useAppSelector((state) => state.subscriptionPlan);

  // State to keep track of selected subscription
  const [, setPlanId] = useState<string | null>(null);

  // console.log(planId, "selectedID");

  const handleClick = (id: string) => {
    setSelectedId(id);
    setPlanId(id);
  };

  useEffect(() => {
    dispatch(fetchSubscriptions());
  }, [dispatch]);

  return (
    <div className="mt-10 rounded-sm flex gap-6">
      {[...subscriptions].reverse().map((sub) => (
        <div
          key={sub._id}
          onClick={() => handleClick(sub._id)}
          className={`border rounded-lg p-6 cursor-pointer transition-colors min-w-[250px] flex-1
            ${
              selectedId === sub._id
                ? "border-primary ring-2 ring-primary"
                : "border-gray-200 hover:border-teal-500"
            }
          `}
        >
          <h3 className="font-medium text-lg">{sub.name}</h3>
          <p className="text-2xl font-bold mt-2">
            ${sub.price}
            <span className="text-sm font-normal text-gray-500">/month</span>
          </p>
          <ul className="mt-4 space-y-2">
            {sub.features.map((feature: string, idx: number) => (
              <li key={idx} className="flex items-center gap-2">
                <Check className="h-4 w-4 text-teal-500" />
                <span className="text-sm font-light">{feature}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 text-xs text-gray-500">
            Max Restaurants: {sub.maxRestaurants}
          </div>
          <div className="text-xs text-gray-500 capitalize">
            Billing: {sub.billingCycle}
          </div>
        </div>
      ))}
    </div>
  );
};

export default StepTwo;
