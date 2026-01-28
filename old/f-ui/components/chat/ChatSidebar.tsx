import { formatDistanceToNow } from "date-fns";
import Avatar from "../ui/Avatar";

export default function ChatSidebar({
  activeId,
  conversations,
  onSelect,
  onSelectUser,
}: {
  activeId: string;
  conversations: any[];
  onSelect: (id: string) => void;
  onSelectUser: (user: any) => void;
}) {
  const userId =
    typeof window !== "undefined" ? localStorage.getItem("userID") : null;

  return (
    <div className="w-80 border-r bg-white flex flex-col">
      <h2 className="p-4 text-xl font-semibold">Messages</h2>

      <div className="overflow-y-auto flex-1">
        {conversations.map((conversation) => {
          const isUserA = conversation.user_a.id === userId;
          const recipient = isUserA ? conversation.user_b : conversation.user_a;

          const updated = new Date(conversation.updated_at);
          const timeAgo = formatDistanceToNow(updated, { addSuffix: true });

          return (
            <div
              key={conversation.id}
              onClick={() => {
                onSelect(conversation.id);
                onSelectUser(recipient);
              }}
              className={`flex items-center gap-4 px-4 py-3 border-b cursor-pointer ${activeId === conversation.id
                  ? "bg-zinc-300"
                  : "hover:bg-gray-50"
                }`}
            >
              <Avatar src={recipient.image_url} />

              <div className="flex-1">
                <p className="font-medium">{recipient.name}</p>
                <p className="text-xs text-gray-500">{timeAgo}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
