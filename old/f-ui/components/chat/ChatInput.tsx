import { useState } from "react";
import { Send, Smile, Paperclip } from "lucide-react";

export default function ChatInput({ onSend }: { onSend: (msg: string) => void }) {
  const [message, setMessage] = useState("");

  const onSubmit = () => {
    if (!message.trim()) return;
    onSend(message);
    setMessage("");
  };

  return (
    <div className="p-4 border-t bg-white flex items-center gap-3">
      <button className="p-2 hover:bg-gray-100 rounded-lg">
        <Smile size={20} />
      </button>

      <button className="p-2 hover:bg-gray-100 rounded-lg">
        <Paperclip size={20} />
      </button>

      <input
        className="flex-1 border rounded-lg p-2 text-sm"
        placeholder="Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && onSubmit()}
      />

      <button
        onClick={onSubmit}
        className="bg-purple-600 text-white px-4 py-2 rounded-lg"
      >
        <Send size={18} />
      </button>
    </div>
  );
}
