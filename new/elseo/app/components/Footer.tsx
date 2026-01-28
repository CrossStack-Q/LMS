export default function Footer() {
  return (
    <footer className="max-w-7xl mx-auto border-x border-(--gray-500) border-b w-full">

      {/* TOP STRIP */}
      <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <div className="py-6 border-b lg:border-b-0 lg:border-r border-(--gray-500)" />
        <div className="py-6 md:col-span-1 lg:col-span-2 border-b lg:border-b-0 lg:border-r border-(--gray-500)" />
        <div className="py-6" />
      </div>

      {/* MAIN FOOTER */}
      <div className="md:border-t border-(--gray-500) grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">

        {/* SOCIAL */}
        <div className="grid grid-cols-1 border-b md:border-r md:border-b border-(--gray-500)">
          <div className="p-6 border-b border-(--gray-500)">
            <p className="text-xl">Follow Me</p>
          </div>
          <div className="grid grid-cols-2">
            <span className="p-3 border-r border-b border-(--gray-500)">Insta</span>
            <span className="p-3 border-b border-(--gray-500)">Facebook</span>
            <span className="p-3 border-r border-(--gray-500)">LinkedIn</span>
            <span className="p-3">YouTube</span>
          </div>
        </div>

        {/* TRACKS */}
        <div className="p-6 border-b md:border-b lg:border-r border-(--gray-500)">
          <p className="text-xl font-medium">Tracks</p>
          <p className="text-(--gray-700) text-lg">Golang</p>
          <p className="text-(--gray-700) text-lg">Else</p>
        </div>

        {/* QUICK LINKS */}
        <div className="p-6 border-b md:border-b lg:border-r border-(--gray-500)">
          <p className="text-xl font-medium">Quick Links</p>
          <p className="text-(--gray-700) text-lg">Courses</p>
          <p className="text-(--gray-700) text-lg">Else</p>
          <p className="text-(--gray-700) text-lg">Else 2</p>
        </div>

        {/* CONTACTS */}
        <div className="p-6 border-b md:border-b border-(--gray-500)">
          <p className="text-xl font-medium">Contacts</p>
          <p className="text-(--gray-700) text-lg">+1 12345678</p>
          <p className="text-(--gray-700) text-lg">anurag.debug@gmail.com</p>
          <p className="text-(--gray-700) text-lg">anuragsh@zohomail.in</p>
        </div>
      </div>

      {/* COPYRIGHT */}
      <div className="p-3 text-center ">
        © 2025 All Rights Reserved Learning
      </div>
    </footer>
  );
}