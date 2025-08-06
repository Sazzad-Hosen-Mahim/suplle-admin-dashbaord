import React from "react";
import { Eye, Pencil } from "lucide-react";

// interface OrderItem {
//   name: string;
//   quantity: number;
// }

export interface OrderCardProps {
  orderId: string;
  table: string;
  type: string;
  people: number;
  status: string;
  items: { name: string; quantity: number }[];
  time: string;
  total: string;
  view?: "grid" | "list"; // ✅ Add this line
  onView?: () => void;
  onEdit?: () => void;
}
const OrderCard: React.FC<OrderCardProps> = ({
  orderId,
  table,
  type,
  people,
  status,
  items,
  time,
  total,
  onView,
  onEdit,
  view = "grid",
}) => {
  return (
    <div
      className={`rounded-xl border p-4 shadow-sm bg-white w-full ${
        view === "list" ? "flex justify-between items-start" : ""
      }`}
    >
      <div className="bg-white rounded-xl p-4 md:p-6 w-full border shadow-sm">
        {/* Header Row */}
        <div className="flex justify-between items-start mb-2">
          <div>
            <p className="font-semibold text-sm">{orderId}</p>
            <p className="text-xs text-gray-500">
              {table} • {type}
            </p>
          </div>
          <div className="flex flex-col items-end space-y-1">
            <div className="flex items-center text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
              <span className="mr-1">👤</span>
              {people}
            </div>
            <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-0.5 rounded-md">
              {status}
            </span>
          </div>
        </div>

        {/* Items */}
        <div className="border-t pt-2 mt-1 text-sm text-gray-700 space-y-1">
          {items.map((item, index) => (
            <div key={index}>
              {item.name} x {item.quantity}
            </div>
          ))}
          <div>……………</div>
        </div>

        {/* Time and Total */}
        <div className="flex justify-between items-center mt-2 text-sm">
          <span className="text-gray-500">{time}</span>
          <span className="font-semibold">{total}</span>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-4 mt-3 border-t pt-3">
          <button onClick={onView} className="text-primary hover:opacity-70">
            <Eye size={18} />
          </button>
          <button onClick={onEdit} className="text-primary hover:opacity-70">
            <Pencil size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
