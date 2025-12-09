// "use client";

// import { useEffect, useState } from "react";
// import ChatHeader from "./ChatHeader";
// import ChatSidebar from "./ChatSidebar";
// import ChatMessages from "./ChatMessages";
// import ChatInput from "./ChatInput";

// type ChatMessagePacket = {
//   event: "message";
//   data: {
//     conversation_id: string;
//     sender_id: string;
//     recipient_id: string;
//     message_type: string;
//     ciphertext?: string;
//     message?: string;
//   };
// };

// type WSIncomingPacket = ChatMessagePacket;

// export default function ChatLayout() {

//   const [ws, setWs] = useState<WebSocket | null>(null);

//   const [activeId, setActiveId] = useState("");
//   const [conversations, setConversations] = useState([])
//   const [messages, setMessages] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true)
//   const [activeUser, setActiveUser] = useState<any>(null);

// //   const onSend = async (msg: string) => {

// //   if (!activeId || !activeUser) return;

// //   const senderID = localStorage.getItem("userID");
// //   const recipientID = activeUser.id;

// //   const payload = {
// //     conversation_id: activeId,
// //     sender_id: senderID,
// //     recipient_id: recipientID,
// //     message: msg,
// //     message_type: "user_text"
// //   };

// //   try {
// //     const res = await fetch("http://localhost:8080/api/v1/chat/message", {
// //       method: "POST",
// //       headers: {
// //         "Content-Type": "application/json"
// //       },
// //       body: JSON.stringify(payload)
// //     });

// //     const created = await res.json();

// //     // Append new message to UI without reloading
// //     setMessages((prev) => [...prev, created]);

// //   } catch (err) {
// //     console.error("Error sending message:", err);
// //   }
// // };
// const onSend = (msg: string) => {
//   if (!ws || !activeId || !activeUser) return;

//   const senderID = localStorage.getItem("userID");
//   const recipientID = activeUser.id;

//   const payload = {
//     event: "message",
//     data: {
//       conversation_id: activeId,
//       sender_id: senderID,
//       recipient_id: recipientID,
//       message_type: "user_text",
//       ciphertext: msg
//     }
//   };

//   ws.send(JSON.stringify(payload));
// };



//   useEffect(() => {
//     const userID = localStorage.getItem("userID")
    
//     async function loadConversations() {
//       try {
//         const res = await fetch(`http://localhost:8080/api/v1/chat/conversations?user_id=${userID}`);
//         const data = await res.json();
//         setConversations(data);
//       } catch (err) {
//         console.error("Failed to fetch courses:", err);
//       } finally {
//         setLoading(false);
//       }
//     }
//     loadConversations();

//   }, [])

//   useEffect(() => {
//     if (!activeId) return;
//     async function loadMessages() {
//       try {
//         const res = await fetch(`http://localhost:8080/api/v1/chat/messages/${activeId}`);
//         const data = await res.json();
//         setMessages(data);
//       } catch (err) {
//         console.error("Failed to eftch chat", err);
//       } finally {
//         setLoading(false);
//       }
//     }
//     loadMessages();
//   }, [activeId])

//   useEffect(() => {
//   const userID = localStorage.getItem("userID");
//   if (!userID) return;

//   const socket = new WebSocket(`ws://localhost:8080/api/v1/chat/ws?user_id=${userID}`);

//   socket.onopen = () => {
//     console.log("WS Connected");
//     setWs(socket);
//   };

//   socket.onclose = () => console.log("WS Disconnected");
//   socket.onerror = (event: Event) => {
//   console.log("WS Error:", event);
// };

//   return () => socket.close();
// }, []);

// useEffect(() => {
//   if (!ws) return;

//   ws.onmessage = (event) => {
//   try {
//     const packet: WSIncomingPacket = JSON.parse(event.data);

//     if (packet.event === "message") {
//       const msg = packet.data;

//       if (msg.conversation_id === activeId) {
//         setMessages((prev) => [
//           ...prev,
//           { ...msg, tempId: crypto.randomUUID() }
//         ]);
//       }
//     }
//   } catch (err) {
//     console.error("WS parse error:", err);
//   }
// };
// }, [ws, activeId]);



//   if (loading) return <p>Loading...</p>;


//   return (
//     <div className="flex h-full bg-white">
//       <ChatSidebar
//         activeId={activeId}
//         conversations={conversations}
//         onSelect={setActiveId}
//         onSelectUser={setActiveUser}
//       />

//       {activeUser ? <div className="flex flex-col flex-1">

//   <ChatHeader user={activeUser} />

//   {/* SCROLL AREA WRAPPER */}
//   <div className="flex-1 overflow-y-auto">
//     <ChatMessages messages={messages} />
//   </div>

//   <ChatInput onSend={onSend} />
// </div> : <div className="flex flex-col items-center justify-center w-full font-medium gap-2">
//         <p className="text-xl">Start new message</p>
//         <p className="max-w-72 text-center text-zinc-500">Messages sent after connecting with a mentee/mentor will appear here.</p>
//         <button className="text-white bg-zinc-800 px-4 py-2 rounded-md">Write a message</button>
//       </div>}

//     </div>
//   );
// }

// File: components/chat/ChatLayout.tsx


"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import ChatHeader from "./ChatHeader";
import ChatSidebar from "./ChatSidebar";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";
import { API_BASE, WS_BASE } from "@/lib/api";

type ChatMessagePacket = {
  event: "message";
  data: {
    id?: string;
    tempId?: string;
    conversation_id: string;
    sender_id: string;
    recipient_id: string;
    message_type: string;
    ciphertext?: string;
    message?: string;
    status?: string;
    created_at?: string;
  };
};

type WSIncomingPacket =
  | { event: "message"; data: any }
  | { event: "message_ack"; data: any }
  | { event: "message_status"; data: any }
  | { event: "presence"; data: any }
  | { event: "typing"; data: any }
  | { event: "rate_limit"; data: any };

export default function ChatLayout() {
  const router = useRouter();
  const [ws, setWs] = useState<WebSocket | null>(null);
  const wsRef = useRef<WebSocket | null>(null);

  const [activeId, setActiveId] = useState("");
  const [conversations, setConversations] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeUser, setActiveUser] = useState<any>(null);

  const reconnectAttempts = useRef(0);
  const backoffTimeout = useRef<number | null>(null);

  const localUserId = typeof window !== "undefined" ? localStorage.getItem("userID") : null;

  // helper: logout
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userID");
    router.push("/auth");
  };

  // Helper to attach Authorization header for REST
  const authFetch = async (url: string, opts: RequestInit = {}) => {
  const token = localStorage.getItem("token");
  if (!token) {
    router.push("/auth");
    throw new Error("no token");
  }

  opts.headers = {
    ...(opts.headers || {}),
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  const res = await fetch(url, opts);

  // only logout on 401
  if (res.status === 401) {
    router.push("/auth");
    throw new Error("unauthorized");
  }

  return res;
};


  // Load conversations (with auth)
  useEffect(() => {
    const loadConversations = async () => {
      const userID = localStorage.getItem("userID");
      if (!userID) {
        setLoading(false);
        return;
      }
      try {
        const res = await authFetch(`${API_BASE}/api/v1/chat/conversations?user_id=${userID}`);
        let data;
try {
  data = await res.json();
} catch (err) {
  console.error("Bad JSON:", err);
  return;
}
        setConversations(data);
      } catch (err) {
        console.error("Failed to fetch conversations:", err);
        // if unauthorized, authFetch will have logged out
      } finally {
        setLoading(false);
      }
    };
    loadConversations();
  }, []);

  // Load messages for active conversation (with auth & pagination support later)
  useEffect(() => {
    if (!activeId) return;
    const loadMessages = async () => {
      try {
        const res = await authFetch(`${API_BASE}/api/v1/chat/messages/${activeId}`);
        const data = await res.json();
        setMessages(data);
        // Send read receipts for unread messages once loaded (if we are recipient)
        sendReadReceiptForVisible(data);
      } catch (err) {
        console.error("Failed to fetch messages:", err);
      }
    };
    loadMessages();
  }, [activeId]);

  // WS connect / reconnect logic
  useEffect(() => {
    const connect = () => {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userID");
      if (!token || !userId) {
        return;
      }

      // attach token as query param as you requested
      const url = `${WS_BASE}/api/v1/chat/ws?token=${encodeURIComponent(token)}`;


      const socket = new WebSocket(url);
      wsRef.current = socket;

      socket.onopen = () => {
        console.log("WS Connected");
        setWs(socket);
        reconnectAttempts.current = 0;
      };

      socket.onclose = (ev) => {
        console.log("WS Disconnected", ev);
        setWs(null);
        // attempt reconnect with backoff
        const token2 = localStorage.getItem("token");
        if (!token2) {
          // don't reconnect if token missing
          return;
        }
        reconnectAttempts.current += 1;
        const delay = Math.min(1000 * Math.pow(2, reconnectAttempts.current), 30000);
        backoffTimeout.current = window.setTimeout(() => {
          connect();
        }, delay);
      };

      socket.onerror = (e) => {
        console.log("WS Error", e);
      };

      socket.onmessage = (event) => {
        try {
          const packet: WSIncomingPacket = JSON.parse(event.data);
          handleIncomingWS(packet);
        } catch (err) {
          console.error("WS parse error:", err);
        }
      };
    };

    connect();

    return () => {
      if (backoffTimeout.current) {
        clearTimeout(backoffTimeout.current);
      }
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, []);

  // handle incoming events
  const handleIncomingWS = (packet: WSIncomingPacket) => {
    if (!packet || !("event" in packet)) return;
    switch (packet.event) {
      case "message":
        {
          const msg = (packet as any).data;
          const isForMe = String(msg.recipient_id) === String(localUserId);
          // append to UI if conversation matches
          if (msg.conversation_id === activeId) {
            setMessages((prev) => [...prev, mapServerMsgToUI(msg)]);
          } else {
            // update conversation updated_at and bump UI — naive approach
            setConversations((prev) =>
              prev.map((c) =>
                c.id === msg.conversation_id ? { ...c, updated_at: msg.created_at } : c
              )
            );
          }

          // If this client is the recipient, send delivered ack
          if (isForMe && ws) {
            const deliveredPacket = {
              event: "delivered",
              data: { message_id: msg.id, sender_id: msg.sender_id },
            };
            ws.send(JSON.stringify(deliveredPacket));
          }
        }
        break;

      case "message_ack": {
    const { id, tempId, status } = packet.data;

    setMessages((prev) =>
      prev.map((m) => {
        // match by tempId OR content match fallback
        if (m.tempId === tempId) {
          return {
            ...m,
            id,
            status,
            tempId: undefined, // remove tempId
          };
        }

        return m;
      })
    );
}
break;

     case "message_status": {
  const { message_id, tempId, status } = packet.data;

  setMessages(prev =>
    prev.map(m => {
      if (
        (m.id && String(m.id) === String(message_id)) ||
        (tempId && m.tempId === tempId)
      ) {
        return { ...m, status };
      }
      return m;
    })
  );
  break;
}

      case "presence":
        {
          const data = (packet as any).data;
          const { user_id, online, last_seen } = data;
          // update active user if matches
          setConversations((prev) =>
            prev.map((c) => {
              // determine recipient in conversation
              const isUserA = String(c.user_a.id) === String(localUserId);
              const recipient = isUserA ? c.user_b : c.user_a;
              if (String(recipient.id) === String(user_id)) {
                const updatedRecipient = { ...recipient, online, last_seen };
                if (isUserA) {
                  return { ...c, user_b: updatedRecipient };
                } else {
                  return { ...c, user_a: updatedRecipient };
                }
              }
              return c;
            })
          );

          if (activeUser && String(activeUser.id) === String(user_id)) {
            setActiveUser((prev: any) => ({ ...prev, online, last_seen }));
          }
        }
        break;

      case "typing":
        // optional: show typing indicator
        break;

      case "rate_limit":
        console.warn("Rate limit hit", (packet as any).data);
        break;

      default:
        break;
    }
  };

  // helper to map server message to UI shape
  const mapServerMsgToUI = (msg: any) => {
    return {
      id: msg.id,
      tempId: msg.tempId,
      conversation_id: msg.conversation_id,
      sender_id: msg.sender_id,
      recipient_id: msg.recipient_id,
      ciphertext: msg.ciphertext,
      status: msg.status || "sent",
      created_at: msg.created_at || new Date().toISOString(),
    };
  };

  // Send new message (optimistic + WS send)
  const onSend = (msgText: string) => {
    if (!ws || !activeId || !activeUser) return;

    const senderID = localStorage.getItem("userID");
    const recipientID = activeUser.id;
    const tempId = crypto.randomUUID();

    const optimistic = {
      tempId,
      conversation_id: activeId,
      sender_id: senderID,
      recipient_id: recipientID,
      message_type: "user_text",
      ciphertext: msgText,
      status: "sending",
      created_at: new Date().toISOString(),
    };

    // append optimistic UI
    setMessages((prev) => [...prev, optimistic]);

    const payload = {
      event: "message",
      data: {
        tempId,
        conversation_id: activeId,
        sender_id: senderID,
        recipient_id: recipientID,
        message_type: "user_text",
        ciphertext: msgText,
      },
    };

    ws.send(JSON.stringify(payload));
  };

  // when user opens a conversation: send read receipts for unread messages
  const sendReadReceiptForVisible = (msgs: any[]) => {
    if (!ws || !msgs || msgs.length === 0) return;
    const myId = localUserId;
    const unread = msgs.filter((m) => m.sender_id !== myId && m.status !== "read");
    if (unread.length === 0) return;
    const messageIDs = unread.map((m) => m.id).filter(Boolean);
    if (messageIDs.length === 0) return;
    const packet = {
      event: "read",
      data: {
        message_ids: messageIDs,
        sender_id: localUserId, // so server can route back to original sender
      },
    };
    ws.send(JSON.stringify(packet));
    // optimistic update to local UI
    setMessages((prev) => prev.map((m) => (messageIDs.includes(m.id) ? { ...m, status: "read" } : m)));
  };

  // update active user when a conversation is selected
  const onSelectUser = (user: any) => {
    setActiveUser(user);
    // when selecting, we might need to mark messages as read
  };

  useEffect(() => {
  const el = document.querySelector("#chat-scroll");
  if (el) el.scrollTop = el.scrollHeight;
}, [messages]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="flex h-full bg-white">
      <ChatSidebar
        activeId={activeId}
        conversations={conversations}
        onSelect={(id: string) => setActiveId(id)}
        onSelectUser={(u: any) => {
          setActiveUser(u);
          onSelectUser(u);
        }}
      />

      {activeUser ? (
        <div className="flex flex-col flex-1">
          <ChatHeader user={activeUser} />

          {/* SCROLL AREA WRAPPER */}
          <div id="chat-scroll" className="flex-1 overflow-y-auto">
   <ChatMessages messages={messages} />
</div>

          <ChatInput onSend={onSend} />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center w-full font-medium gap-2">
          <p className="text-xl">Start new message</p>
          <p className="max-w-72 text-center text-zinc-500">
            Messages sent after connecting with a mentee/mentor will appear here.
          </p>
          <button className="text-white bg-zinc-800 px-4 py-2 rounded-md">Write a message</button>
        </div>
      )}
    </div>
  );
}
