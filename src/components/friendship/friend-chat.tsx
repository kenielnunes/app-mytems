import { cn } from "@/lib/utils";
import React, { useRef, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChatBubbleAvatar,
  ChatBubbleMessage,
  ChatBubbleTimestamp,
  ChatBubble,
  ChatBubbleAction,
  ChatBubbleActionWrapper,
} from "../ui/chat/chat-bubble";
import { ChatMessageList } from "../ui/chat/chat-message-list";
import { DotsVerticalIcon, HeartIcon, Share1Icon } from "@radix-ui/react-icons";
import { Forward, Heart } from "lucide-react";
import ChatBottombar from "../ui/chat/chat-bottombar";
import { supabase } from "@/lib/supabase-browser";
import { useSession } from "@/contexts/use-session";

interface FriendChatProps {
  friend: {
    id: string;
    name: string;
    avatar: string;
    isOnline: boolean;
  };
}

const FriendChat = ({ friend }: FriendChatProps) => {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<
    { sender: "me" | "friend"; content: string; timestamp: string }[]
  >([]);

  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const actionIcons = [
    { icon: DotsVerticalIcon, type: "More" },
    { icon: Forward, type: "Like" },
    { icon: Heart, type: "Share" },
  ];

  const { user } = useSession();

  useEffect(() => {
    // Join a room/topic. Can be unique for each friend.
    const channel = supabase.channel(`room-1`);

    // Function to handle receiving a new message
    const messageReceived = (payload) => {
      const newMessage = {
        sender: payload.payload.userId === user?.id ? "me" : "friend",
        content: payload.payload.message,
        timestamp: new Date().toLocaleTimeString(),
      };
      setChatHistory((prev) => [...prev, newMessage]);
    };

    // Subscribe to the channel and listen for new messages
    channel
      .on("broadcast", { event: "new-message" }, messageReceived)
      .subscribe();

    const presence = channel.presenceState();

    console.log("presence", presence);

    return () => {
      channel.unsubscribe();
    };
  }, []);

  // Function to send a message
  const sendMessage = async (message: string) => {
    if (!message.trim()) return;

    // Send message to Supabase channel
    await supabase.channel(`room-1`).send({
      type: "broadcast",
      event: "new-message",
      payload: { message, userId: user?.id },
    });

    setMessage(""); // Clear the input
  };

  console.log("chatHistory", chatHistory);

  return (
    <div className="flex flex-col h-full">
      <ChatMessageList ref={messagesContainerRef}>
        <AnimatePresence>
          {chatHistory.map((chat, index) => {
            const variant = chat.sender === "me" ? "sent" : "received";
            return (
              <motion.div
                key={index}
                layout
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 1 }}
                transition={{
                  opacity: { duration: 0.1 },
                  layout: {
                    type: "spring",
                    bounce: 0.3,
                    duration: index * 0.05 + 0.2,
                  },
                }}
                className="flex flex-col gap-2 p-4"
              >
                <ChatBubble variant={variant}>
                  <ChatBubbleAvatar src={friend.avatar} />
                  <ChatBubbleMessage isLoading={false}>
                    {chat.content}
                    {chat.timestamp && (
                      <ChatBubbleTimestamp timestamp={chat.timestamp} />
                    )}
                  </ChatBubbleMessage>
                  <ChatBubbleActionWrapper>
                    {actionIcons.map(({ icon: Icon, type }) => (
                      <ChatBubbleAction
                        className="size-7"
                        key={type}
                        icon={<Icon className="size-4" />}
                        onClick={() =>
                          console.log(
                            "Action " + type + " clicked for message " + index
                          )
                        }
                      />
                    ))}
                  </ChatBubbleActionWrapper>
                </ChatBubble>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </ChatMessageList>
      <ChatBottombar
        isMobile={false}
        handleSend={(message) => sendMessage(message)}
      />
    </div>
  );
};

export default FriendChat;
