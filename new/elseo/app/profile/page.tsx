// "use client";

// import { useAuth } from "../providers";
// import { useRouter } from "next/navigation";
// import { useEffect } from "react";

// export default function Profile() {
//   const { user, logout } = useAuth();
//   const router = useRouter();

//   const handleLogout = () => {
//   logout();
//   router.push("/login");
// };

//   useEffect(() => {
//     if (!user) router.push("/login");
//   }, [user]);

//   if (!user) return null;

//   return (
//     <div className="max-w-7xl mx-auto border-x border-b border-(--gray-500) p-6 flex-1 w-full">
//       <h1>User Profile</h1>
//       <p className="text-2xl">Welcome {user.email}</p>
//       <p className="text-2xl">Role: {user.role}</p>
//       <span
//       onClick={handleLogout}
//       className="cursor-pointer text-red-400 hover:text-red-600 text-2xl font-semibold"
//     >
//       Logout
//     </span>
//     </div>
//   );
// }

"use client";

import Image from "next/image";
import { useAuth } from "../providers";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Profile() {
  const { user, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) router.push("/login");
  }, [user, router]);

  if (!user) return null;

  function handleLogout() {
    logout();
    router.push("/login");
  }

  return (
    <div className="max-w-7xl mx-auto border-x border-b border-(--gray-500) p-8 w-full flex-1 ">

      <h1 className="text-4xl font-semibold mb-8">Profile</h1>
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <img className="rounded-full w-20 h-20" src={user.image_url} />

          <p className="bg-(--primary-green) px-4 py-2 rounded font-medium text-xl w-fit">
            {user.name || "Anonymous User"}
          </p>
        </div>


        <p className="bg-(--primary-green) px-4 py-2 rounded font-medium text-xl w-fit" >{user.email}</p>

        <p className="bg-(--primary-green) px-4 py-2 rounded font-medium text-xl w-fit capitalize">{user.role}</p>

        <div>
          <p className="text-sm text-(--gray-500)">Joined</p>
          <p className="text-xl font-medium">{user.created_at}</p>

          
        </div>
        <button
            onClick={handleLogout}
            className="px-6 py-2 bg-red-400 hover:bg-red-600 text-white rounded-md font-semibold text-xl cursor-pointer"
          >
            Logout
          </button>
      </div>
    </div>
  );
}
