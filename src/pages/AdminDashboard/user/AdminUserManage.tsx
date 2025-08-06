import UserComponent from "@/components/admin-panel/user-management/UserComponent";

const AdminUserManage = () => {
  return (
    <div>
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
          <UserComponent />
        </main>
      </div>
    </div>
  );
};

export default AdminUserManage;
