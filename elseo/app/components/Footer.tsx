export default function Footer() {
  return (
    <footer className="max-w-7xl mx-auto border-x-2 border-(--gray-500) border-b-2">
      <div className="grid grid-cols-4">
        <div className="py-6 border-r-2 border-(--gray-500)"></div>
        <div className="py-6 col-span-2 border-r-2 border-(--gray-500)"></div>
        <div className="py-6"></div>
      </div>
      <div className="border-t-2 border-(--gray-500) grid grid-cols-4">
        <div className="grid grid-cols-2 grid-rows-2">
          <div className="col-span-2 p-6 border-b-2 border-r-2 border-(--gray-500)">
            <p className="text-xl">Follow Me</p>
          </div>
          <div className="grid grid-cols-2 col-span-2">
          <span className="p-2 border-r-2 border-b-2 border-(--gray-500)">Insta</span>
          <span className="p-2 border-r-2 border-b-2 border-(--gray-500)">Facebook</span>
          <span className="p-2 border-r-2 border-(--gray-500)">Linkedin</span>
          <span className="p-2 border-r-2 border-(--gray-500)">Youtube</span>
          </div>
        </div>
        <div className="p-6 border-r-2 border-(--gray-500)">
          <p className="text-xl font-medium">Tracks</p>
          <p className="text-(--gray-700) text-lg">Golang</p>
          <p className="text-(--gray-700) text-lg">Else</p>
        </div>
        <div className="p-6 border-r-2 border-(--gray-500)">
          <p className="text-xl font-medium">Quick Links</p>
          <p className="text-(--gray-700) text-lg">Courses</p>
          <p className="text-(--gray-700) text-lg">Else</p>
          <p className="text-(--gray-700) text-lg">Else 2</p>
        </div>
        <div className="p-6">
          <p className="text-xl font-medium">Contacts</p>
          <p className="text-(--gray-700) text-lg">+1 12345678</p>
          <p className="text-(--gray-700) text-lg">anurag.debug@gmail.com</p>
          <p className="text-(--gray-700) text-lg">anuragsh@zohomail.in</p>
        </div>
      </div>
    </footer>
  );
}
