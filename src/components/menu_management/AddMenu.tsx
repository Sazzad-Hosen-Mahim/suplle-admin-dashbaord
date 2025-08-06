
import React from "react";

const AddMenu = () => {
  const handleForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);
    const status = formData.get("status");
    const menu = formData.get("menu");
    const desc = formData.get("desc");
    const image = formData.get("image") as File;
    const imageName = image.name;
    const data = {
      menu,
      desc,
      imageName,
      status,
    };
    console.log(data, "17 no");
  };
  return (
    <div className="mt-7 font-rubik">
      <h1 className="font-rubik text-sm sm:text-[18px]">Add Menu</h1>
      <section className="mt-4">
        <form onSubmit={handleForm} className="space-y-5">
          <div className="">
            <label className="text-[10px] sm:text-[14px]">Menu Name</label>
            <input
              name="menu"
              type="text"
              placeholder="Enter Menu Name"
              className="w-full rounded p-3 dark:bg-primary-dark dark:text-green-50 bg-white mt-3 text-[12px] sm:text-[14px] text-green-900 focus:ring focus:ring-opacity-75  focus:dark:ring-violet-600 dark:border-gray-300"
            />
          </div>

          <div className="">
            <label className="text-[10px] sm:text-[14px]">Description</label>
            <textarea
              name="desc"
              cols={20}
              rows={5}
              placeholder="Sort Description......."
              className="w-full rounded p-2 dark:bg-primary-dark dark:text-green-50 bg-white mt-3 text-[12px] sm:text-[14px] text-green-900 focus:ring focus:ring-opacity-75  focus:dark:ring-violet-600 dark:border-gray-300"
            />
          </div>
          <div className="">
            <label className="text-[10px] sm:text-[14px]">Image</label>
            <input
              name="image"
              type="file"
              placeholder="Paste image URl or upload"
              className="w-full rounded p-3 dark:bg-primary-dark dark:text-green-50 bg-white mt-3 text-[12px] sm:text-[14px] text-green-900 focus:ring focus:ring-opacity-75  focus:dark:ring-violet-600 dark:border-gray-300"
            />
          </div>

          <div className="space-y-8 mt-20">
            <div className="flex flex-col sm:flex-row gap-3 sm:item-center justify-between">
              <div className="flex item-center space-x-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="35"
                  height="35"
                  viewBox="0 0 30 30"
                  fill="none"
                  className="bg-yellow-50 p-[3px]"
                >
                  <path
                    d="M10.0894 14.841L12.6117 17.3633L16.8155 11.478M23.5416 14.0003C23.5416 15.3252 23.2806 16.6372 22.7736 17.8612C22.2666 19.0853 21.5234 20.1975 20.5865 21.1344C19.6497 22.0712 18.5374 22.8144 17.3134 23.3214C16.0893 23.8285 14.7774 24.0894 13.4524 24.0894C12.1275 24.0894 10.8155 23.8285 9.59148 23.3214C8.36741 22.8144 7.25519 22.0712 6.31832 21.1344C5.38146 20.1975 4.6383 19.0853 4.13127 17.8612C3.62424 16.6372 3.36328 15.3252 3.36328 14.0003C3.36328 11.3245 4.42624 8.75826 6.31832 6.86618C8.2104 4.97409 10.7766 3.91113 13.4524 3.91113C16.1282 3.91113 18.6944 4.97409 20.5865 6.86618C22.4786 8.75826 23.5416 11.3245 23.5416 14.0003Z"
                    stroke="url(#paint0_linear_1118_1615)"
                    stroke-width="1.68152"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear_1118_1615"
                      x1="13.4524"
                      y1="-0.869727"
                      x2="15.45"
                      y2="27.1105"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="#56DAAB" />
                      <stop offset="1" stop-color="#0F9996" />
                    </linearGradient>
                  </defs>
                </svg>
                <div>
                  <h1 className="text-xs sm:text-sm">Active</h1>
                  <p className="text-[7px] sm:text-xs font-light">
                    Menu is visible to customers
                  </p>
                </div>
              </div>
              <label className="relative block aspect-[2/0.75] w-16 rounded-full bg-white  h-[5%] transition-all duration-300 hover:bg-[length:100%_500%] focus:bg-[length:100%_500%] bg-[length:100%_100%] shadow-sm border-[2px] border-green-300 cursor-pointer">
                <input
                  className="peer/input hidden"
                  name="status"
                  type="checkbox"
                />
                <div className="absolute left-[3%] top-1/2 aspect-square h-[90%] -translate-y-1/2 rotate-180 rounded-full bg-green-800  transition-all duration-500 peer-checked/input:left-[63%] peer-checked/input:-rotate-6" />
              </label>
            </div>
            <button
              type="submit"
              className="bg-green-600 cursor-pointer font-light py-2.5 px-5 rounded text-white text-sm sm:text-[14px]"
            >
              Create Menu
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default AddMenu;
