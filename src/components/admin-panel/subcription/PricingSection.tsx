import React, { useEffect, useState } from "react";
import PricingCard from "./PricingCard";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { fetchSubscriptions } from "@/store/features/admin/plan/subscriptionPlan";
// import { Button } from "@/components/ui/button";
import UpdateModal from "./UpdateModal";
import { deleteSubscriptionPlan } from "@/store/features/admin/plan/deletePlanSlice";

const PricingSection: React.FC = () => {
  const dispatch = useAppDispatch();
  const { subscriptions } = useAppSelector((state) => state.subscriptionPlan);

  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<any>(null); // Track which plan is selected

  console.log("Subscriptions:", subscriptions);

  const { loading: deleteLoading } = useAppSelector(
    (state) => state.deletePlan
  );

  useEffect(() => {
    dispatch(fetchSubscriptions());
  }, [dispatch]);

  // const handleUpdateClick = (plan: any) => {
  //   setSelectedPlan(plan);
  //   setShowUpdateModal(true);
  // };

  const handleUpdateSubmit = async (updatedData: any) => {
    try {
      // Here you would call your API to update the plan
      // For example:
      // await updateSubscriptionPlan(selectedPlan._id, updatedData);
      console.log("Updating plan:", selectedPlan._id, updatedData);

      // Refresh the subscriptions after update
      dispatch(fetchSubscriptions());
      setShowUpdateModal(false);
    } catch (error) {
      console.error("Failed to update plan:", error);
    }
  };

  return (
    <div>
      <p className="mt-3 text-2xl text-[#101828] dark:text-white text-center font-semibold">
        Simple, transparent pricing
      </p>
      <p className="mt-6 text-lg font-normal text-[#667085] dark:text-white text-center">
        We believe Untitled should be accessible to all companies, no matter the
        size.
      </p>

      <div className="md:mt-[100px] mt-10 space-y-12 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-x-8">
        {[...subscriptions].map((sub, idx) => (
          <div
            key={sub._id || idx}
            className="relative mt-[80px] lg:mt-0 h-full"
          >
            <PricingCard
              key={sub._id || idx}
              price={`$${sub.price}`}
              name={sub.name}
              features={sub.features}
              onUpdateClick={() => {
                setSelectedPlan(sub); // Set the selected plan
                setShowUpdateModal(true);
              }}
              onDeleteClick={() => {
                setSelectedPlan(sub); // Set the selected plan
                setShowDeleteModal(true);
              }}
            />
          </div>
        ))}
      </div>

      {showUpdateModal && selectedPlan && (
        <UpdateModal
          showUpdateModal={showUpdateModal}
          setShowUpdateModal={setShowUpdateModal}
          planData={selectedPlan}
          onSubmit={handleUpdateSubmit}
        />
      )}

      {showDeleteModal && selectedPlan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-transparent backdrop-blur">
          <div className="bg-white dark:bg-primary-dark p-5 rounded-lg shadow-lg w-full max-w-lg relative border-2 border-primary/40">
            <div className="flex flex-col">
              <h1 className="text-lg font-semibold">
                Are you sure you want to delete the "{selectedPlan.name}" plan?
              </h1>
              <p className="mt-2 text-red-500 text-sm">
                This action cannot be undone.
              </p>
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-70"
                disabled={deleteLoading}
              >
                Cancel
              </button>
              <button
                onClick={async () => {
                  try {
                    await dispatch(
                      deleteSubscriptionPlan(selectedPlan._id)
                    ).unwrap();
                    await dispatch(fetchSubscriptions()).unwrap();
                    setShowDeleteModal(false);
                    // Optional: Show success toast
                  } catch (error) {
                    console.error("Failed to delete plan:", error);
                    // Optional: Show error toast
                  }
                }}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                disabled={deleteLoading}
              >
                {deleteLoading ? (
                  <>
                    <svg
                      className="animate-spin h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Deleting...
                  </>
                ) : (
                  "Delete Plan"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PricingSection;
