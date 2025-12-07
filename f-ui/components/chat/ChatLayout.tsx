"use client";

import { useEffect, useState } from "react";
import ChatHeader from "./ChatHeader";
import ChatSidebar from "./ChatSidebar";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";

export default function ChatLayout() {

  const [activeId, setActiveId] = useState("");
  const [conversations, setConversations] = useState([])
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true)
  const [activeUser, setActiveUser] = useState<any>(null);

  const onSend = async (msg: string) => {
  if (!activeId || !activeUser) return;

  const senderID = localStorage.getItem("userID");
  const recipientID = activeUser.id;

  const payload = {
    conversation_id: activeId,
    sender_id: senderID,
    recipient_id: recipientID,
    message: msg,
    message_type: "user_text"
  };

  try {
    const res = await fetch("http://localhost:8080/api/v1/chat/message", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const created = await res.json();

    // Append new message to UI without reloading
    setMessages((prev) => [...prev, created]);

  } catch (err) {
    console.error("Error sending message:", err);
  }
};


  useEffect(() => {
    const userID = localStorage.getItem("userID")
    async function loadConversations() {
      try {
        const res = await fetch(`http://localhost:8080/api/v1/chat/conversations?user_id=${userID}`);
        const data = await res.json();
        setConversations(data);
      } catch (err) {
        console.error("Failed to fetch courses:", err);
      } finally {
        setLoading(false);
      }
    }
    loadConversations();

  }, [])

  useEffect(() => {
    if (!activeId) return;
    async function loadMessages() {
      try {
        const res = await fetch(`http://localhost:8080/api/v1/chat/messages/${activeId}`);
        const data = await res.json();
        setMessages(data);
      } catch (err) {
        console.error("Failed to eftch chat", err);
      } finally {
        setLoading(false);
      }
    }
    loadMessages();
  }, [activeId])


  if (loading) return <p>Loading...</p>;


  return (
    <div className="flex h-full bg-white">
      <ChatSidebar
        activeId={activeId}
        conversations={conversations}
        onSelect={setActiveId}
        onSelectUser={setActiveUser}
      />

      {activeUser ? <div className="flex flex-col flex-1">

        <ChatHeader user={activeUser} />
        <ChatMessages messages={messages} />
        <ChatInput onSend={onSend} />
      </div> : <div className="flex flex-col items-center justify-center w-full font-medium gap-2">
        <p className="text-xl">Start new message</p>
        <p className="max-w-72 text-center text-zinc-500">Messages sent after connecting with a mentee/mentor will appear here.</p>
        <button className="text-white bg-zinc-800 px-4 py-2 rounded-md">Write a message</button>
      </div>}

    </div>
  );
}
