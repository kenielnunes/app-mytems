import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Circle } from "lucide-react";
import { useFriendsPresence } from "@/contexts/FriendsPresenceContext";
import { supabase } from "@/lib/supabase-browser";

interface FriendChatProps {
  friend: {
    id: string;
    name: string;
    avatar: string;
  };
}

const FriendChat = ({ friend }: FriendChatProps) => {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<
    { sender: "me" | "friend"; content: string }[]
  >([]);
  const { friendsStatus } = useFriendsPresence();

  const isOnline = Object.values(friendsStatus).some((subs) =>
    subs.some((status) => status.id === friend.id)
  );

  const sendMessage = async () => {
    if (message.trim() !== "") {
      try {
        await supabase.from("message").insert({
          senderId: supabase.auth.user()?.id,
          receiverId: friend.id,
          content: message,
        });

        setChatHistory([...chatHistory, { sender: "me", content: message }]);
        setMessage("");
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  const fetchChatHistory = async () => {
    try {
      const { data, error } = await supabase
        .from("message")
        .select("senderId, content")
        .or(
          `senderId.eq.${supabase.auth.user()?.id},receiverId.eq.${
            supabase.auth.user()?.id
          }`
        );

      if (!error) {
        setChatHistory(
          data.map((message) => ({
            sender:
              message.senderId === supabase.auth.user()?.id ? "me" : "friend",
            content: message.content,
          }))
        );
      } else {
        console.error("Error fetching chat history:", error);
      }
    } catch (error) {
      console.error("Error fetching chat history:", error);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-4 bg-gray-100">
        <div className="flex items-center">
          <img
            src={friend.avatar}
            alt={friend.name}
            className="w-8 h-8 rounded-full"
          />
          <span className="ml-2 font-medium">{friend.name}</span>
          {isOnline && <Circle className="ml-2 text-green-500" size={12} />}
        </div>
        <Button onClick={fetchChatHistory}>Load Chat</Button>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {chatHistory.map((message, index) => (
          <div
            key={index}
            className={`mb-2 ${
              message.sender === "me"
                ? "self-end bg-blue-500 text-white"
                : "self-start bg-gray-200"
            } px-4 py-2 rounded-lg max-w-[70%]`}
          >
            {message.content}
          </div>
        ))}
      </div>

      <div className="p-4 bg-gray-100">
        <div className="flex">
          <Input
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                sendMessage();
              }
            }}
          />
          <Button className="ml-2" onClick={sendMessage}>
            Send
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FriendChat;
