import Avatar from "@/components/ui/Avatar";

export default function ChatHeader({ user }: any) {
  return (
    <div className="border-b flex items-center justify-between p-4 ">
      <div className="flex items-center gap-2">
        <Avatar src={user.image_url} size={52} online={user.online} />

        <div className="flex flex-col ">
          <span className="font-semibold text-lg ">{user.name}</span>
          <span className=" text-green-600 bg-green-200 w-fit px-2 py-1 rounded-full text-sm ">
            {user.online ? "Online" : "Offline"}
          </span>
        </div>
      </div>

      <div className="flex gap-2 text-lg">
        <button className="px-3 py-1 border rounded-lg">Call</button>
        <button className="px-3 py-1 bg-purple-100 text-purple-700 rounded-lg">
          View profile
        </button>
      </div>
    </div>
  );
}
