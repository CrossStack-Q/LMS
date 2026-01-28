export default function ActiveCourses() {
  return (
    <section className="grid grid-rows-8 grid-cols-4 border-b border-(--gray-500)">
      {/* CARD 1 */}
      <div className="border-r border-(--gray-500) p-6">

      </div>

      {/* CARD 2 */}
      <div className="border-r border-(--gray-500) p-6">

      </div>

      {/* CARD 3 */}
      <div className="border-r border-(--gray-500) p-6">

        {/* CARD 4 */}
      </div>
      <div className="p-6">

      </div>
      <div className="col-span-4 row-span-2 border-y border-(--gray-500) p-6 flex text-2xl items-end">
        <h2 className="text-4xl font-medium">Active Courses</h2>
      </div>
      <div className="col-span-1 row-span-5 border-r border-(--gray-500) flex flex-col">
        <div className="w-48 h-auto mx-auto px-6 pt-6">
          <img src="https://mir-s3-cdn-cf.behance.net/project_modules/disp_webp/e4d7a1154960861.634c180054d25.png" alt="" />
        </div>
        <p className="text-2xl px-6">Comman UI/UX Design Patterns</p>
        <p className="text-(--gray-500) px-6">10 Shopping Cart best practices</p>
        <div className="flex border-t border-(--gray-500)">
          <div className="flex-1 px-6 py-2 ">
            30%
          </div>
          <div className="bg-(--primary-green) px-2 py-2">
            {`-->`}
          </div>
        </div>
      </div>
      <div className="col-span-1 row-span-5 border-r border-(--gray-500) flex flex-col">
        <div className="w-48 h-auto mx-auto px-6 pt-6">
          <img src="https://mir-s3-cdn-cf.behance.net/project_modules/disp_webp/e4d7a1154960861.634c180054d25.png" alt="" />
        </div>
        <p className="text-2xl px-6">Comman UI/UX Design Patterns</p>
        <p className="text-(--gray-500) px-6">10 Shopping Cart best practices</p>
        <div className="flex border-t border-(--gray-500)">
          <div className="flex-1 px-6 py-2 ">
            30%
          </div>
          <div className="bg-(--primary-green) px-2 py-2">
            {`-->`}
          </div>
        </div>
      </div>
      
    </section>
  );
}
