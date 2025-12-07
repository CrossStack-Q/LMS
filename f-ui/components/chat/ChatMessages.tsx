import { useEffect, useState } from "react";

export default function ChatMessages({ messages }: { messages: any[] }) {
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("userID");
    setUser(storedUser);
  }, []);
  
  return (
    <div className="flex-1 p-6 overflow-y-auto space-y-4">
      {messages.map((msg) => {
        const isUser = String(msg.sender_id) === String(user);

        return (
          <div
            key={msg.id}
            className={`max-w-lg p-3 rounded-xl ${
              isUser ? "bg-purple-100 ml-auto text-right" : "bg-gray-100"
            }`}
          >
            <p className="text-sm">{msg.ciphertext}</p>
            <span className="text-xs text-gray-500">{msg.created_at}</span>
          </div>
        );
      })}
    </div>
  );
}
