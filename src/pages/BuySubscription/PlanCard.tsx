import React from "react";

export interface PlanCard {
  id: string;
  name: string;
  description: string;
  imageUrl?: string | File; // updated to allow File type here
  status: "available" | "comingSoon" | "unavailable";
  category?: string;
  price?: number;
}

interface DesignCardProps {
  design: PlanCard;
  onEdit: () => void;
  onStatusChange: () => void;
  statusChangeLabel: string;
}

const PlanCard: React.FC<DesignCardProps> = ({
  design,
  //   onEdit,
  //   onStatusChange,
  //   statusChangeLabel,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden transition-all duration-200 hover:shadow-md md:p-6 p-2 dark:bg-[#161616] ">
      <div className="flex justify-center items-center py-[10px]">
        <img
          src={
            typeof design.imageUrl === "string"
              ? design.imageUrl
              : design.imageUrl instanceof File
              ? URL.createObjectURL(design.imageUrl)
              : undefined
          }
          alt={design.name}
          className="h-[100px] w-[100px]"
        />
      </div>

      <div className=" flex flex-col gap-2 ">
        <div className=" text-base font-normal text-[#667085] dark:text-white text-center">
          {design.category || "Unknown"}
        </div>
        <h3 className="text-[20px] font-normal text-[#565656] dark:text-white text-center">
          {design.name}
        </h3>
        <p className=" text-sm text-[#667085] dark:text-white font-normal line-clamp-2 text-center">
          {design.description}
        </p>

        {design.price && (
          <div className=" text-base font-normal text-[#565656] dark:text-white text-center">
            Cost Per QR code ${design.price.toFixed(2)}
          </div>
        )}

        {/* <div className=" flex justify-center gap-4 items-center ">
          <button
            onClick={onEdit}
            className="px-6 py-2  bg-primary text-white rounded-md  md:text-base text-sm dark:bg-[#030303] dark:text-primary hover:opacity-50 transition-opacity cursor-pointer"
          >
            Edit
          </button>
          <button
            onClick={onStatusChange}
            className="px-6 py-2 bg-[#E7F6F6] text-[#0C7775] rounded-md  md:text-base text-sm dark:bg-[#030303] dark:text-primary hover:bg-teal-500 hover:text-white
            "
          >
            {statusChangeLabel}
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default PlanCard;
