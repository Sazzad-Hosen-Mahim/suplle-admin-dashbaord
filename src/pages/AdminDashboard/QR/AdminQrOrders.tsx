import QROrderComponent from "@/components/admin-panel/qr-Orders/QROrderComponen";

const AdminQrOrders = () => {
  return (
    <div className="">
      <header>
        <div className="flex items-center space-x-2 ">
          <span className="text-[#333333] text-base dark:text-[#FFFFFF] ">
            Admin Panel
          </span>
          <span className="text-[#333333] dark:text-[#FFFFFF] "> &gt;</span>
          <span className="text-[#333333] text-base dark:text-[#FFFFFF]">
            Order
          </span>
        </div>
      </header>

      <main>
        <QROrderComponent />
      </main>
    </div>
  );
};

export default AdminQrOrders;
