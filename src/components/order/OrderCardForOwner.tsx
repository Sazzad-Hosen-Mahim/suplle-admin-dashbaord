interface OrderCardForOwnerProps {
  title: string;
  amount: number;
  quantity: number;
  onQuantityChange: (quantity: number) => void;
  onAddToOrder: () => void;
}

const OrderCardForOwner: React.FC<OrderCardForOwnerProps> = ({
  title,
  amount,
  quantity,
  onQuantityChange,
  onAddToOrder,
}) => {
  // const total = amount * quantity;

  return (
    <div
      onClick={onAddToOrder}
      className="cursor-pointer max-w-sm rounded-2xl shadow-lg p-4 dark:bg-primary-dark bg-white border border-gray-200 hover:border-primary transition duration-300 ease-in-out"
    >
      <h2 className="text-lg font-normal mb-2">{title}</h2>
      <p className="text-sm font-normal text-[#7D7D7D] mb-4">
        Quantity: {quantity}
      </p>

      <div className="flex flex-col md:flex-row items-center md:justify-between mb-4">
        <div>
          <p className="text-sm font-normal text-primary">
            ${amount.toFixed(2)}
          </p>
        </div>
        <div
          className="flex items-center space-x-4"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={() => onQuantityChange(Math.max(1, quantity - 1))}
            className="bg-gray-200 dark:border dark:border-white dark:text-white dark:bg-primary-dark hover:bg-gray-300 text-gray-800 px-3 py-1 rounded-lg"
          >
            -
          </button>
          <span className="text-lg font-medium">{quantity}</span>
          <button
            onClick={() => onQuantityChange(quantity + 1)}
            className="bg-gray-200  dark:border dark:border-white dark:text-white dark:bg-primary-dark hover:bg-gray-300 text-gray-800 px-3 py-1 rounded-lg"
          >
            +
          </button>
        </div>
        {/* <button
          onClick={(e) => {
            e.stopPropagation();
            onAddToOrder();
          }}
          className="w-full mt-2 bg-primary text-white py-2 rounded-lg hover:bg-primary-dark transition"
        >
          Add
        </button> */}
      </div>
    </div>
  );
};
export default OrderCardForOwner;
