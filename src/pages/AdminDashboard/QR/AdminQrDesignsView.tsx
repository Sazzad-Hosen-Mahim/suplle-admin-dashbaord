import { QRCodeDesigner } from "@/components/admin-panel/qr-design/QRCodeDesigner"


const AdminQrDesignsView = () => {
  return (
    <div className="">
        <header>
          <div className="flex items-center space-x-2 ">
            <span className="text-[#333333] text-base dark:text-[#FFFFFF] ">
              Admin Panel
            </span>
            <span className="text-[#333333] dark:text-[#FFFFFF] "> &gt;</span>
            <span className="text-[#333333] text-base dark:text-[#FFFFFF]">
              Menu
            </span>
          </div>
        </header>

      
      
      <main>
   <QRCodeDesigner/>

      </main>
    </div>
  )
}

export default AdminQrDesignsView
