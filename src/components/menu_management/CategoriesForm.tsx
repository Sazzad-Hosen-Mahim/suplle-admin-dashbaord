const CategoriesForm = () => {
  const handleForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const category = formData.get("category");
    const desc = formData.get("desc");
    const image = formData.get("image") as File;
    const imageName = image.name;
    const data = {
      category,
      desc,
      imageName,
    };
    console.log(data, "17 no");
  };
  return (
    <div className="mt-7 font-rubik">
      <section className="mt-4">
        <form onSubmit={handleForm} className="space-y-5">
          <div className="">
            <label className="text-[10px] sm:text-[14px]">Category Name</label>
            <input
              name="category"
              type="text"
              placeholder="Enter Category Name"
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

          <button
            type="submit"
            className="bg-green-600 cursor-pointer font-light py-2.5 px-5 rounded  text-white text-sm sm:text-[14px]"
          >
            Save Category
          </button>
        </form>
      </section>
    </div>
  );
};

export default CategoriesForm;
