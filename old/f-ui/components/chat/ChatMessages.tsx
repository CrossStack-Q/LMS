// import { useEffect, useRef, useState } from "react";

// export default function ChatMessages({ messages }: { messages: any[] }) {

//   const bottomRef = useRef<HTMLDivElement | null>(null);
//   const [user, setUser] = useState<string | null>(null);

//   useEffect(() => {
//     const storedUser = localStorage.getItem("userID");
//     setUser(storedUser);
//   }, []);

//   useEffect(() => {
//   bottomRef.current?.scrollIntoView({ behavior: "smooth" });
// }, [messages]);
  
//   return (
//     <div className="p-6 space-y-4">
//       {messages.map((msg) => {
//         const isUser = String(msg.sender_id) === String(user);

//         return (
//           <div
//             key={msg.id || msg.tempId}
//             className={`max-w-lg p-3 rounded-xl ${
//               isUser ? "bg-purple-100 ml-auto text-right" : "bg-gray-100"
//             }`}
//           >
//             <p className="text-sm">{msg.ciphertext}</p>
//             <span className="text-xs text-gray-500">{msg.created_at}</span>
//           </div>
//         );
//       })}
//       {/* <div ref={bottomRef}></div> */}
//     </div>
//   );
// }



// File: components/chat/ChatMessages.tsx
import { useEffect, useRef, useState } from "react";

export default function ChatMessages({ messages }: { messages: any[] }) {
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("userID");
    setUser(storedUser);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const Tick = ({ status }: { status?: string }) => {
    // ✓ sent, ✓✓ delivered, ✓✓ blue read
    if (!status || status === "sent") {
      return <span className="ml-2 text-gray-400">✓</span>;
    }
    if (status === "delivered") {
      return <span className="ml-2 text-gray-400">✓✓</span>;
    }
    if (status === "read") {
      return <span className="ml-2 text-blue-500">✓✓</span>;
    }
    return null;
  };

  return (
    <div className="p-6 space-y-4">
      {messages.map((msg) => {
        const isUser = String(msg.sender_id) === String(user);

        return (
          <div
            key={msg.id || msg.tempId}
            className={`max-w-lg p-3 rounded-xl ${
              isUser ? "bg-purple-100 ml-auto text-right" : "bg-gray-100"
            }`}
          >
            <p className="text-sm">{msg.ciphertext}</p>
            <div className="flex items-center justify-end gap-2">
              <span className="text-xs text-gray-500">{msg.created_at}</span>
              {isUser && <Tick status={msg.status} />}
            </div>
          </div>
        );
      })}
      <div ref={bottomRef}></div>
    </div>
  );
}
