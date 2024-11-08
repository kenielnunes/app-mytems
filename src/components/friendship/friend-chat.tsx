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
import { getOrCreateRoomChat } from "@/services/api/modules/chat/get-or-create-room-chat";
import { getMessageHistory } from "@/services/api/modules/chat/get-message-history";

interface FriendChatProps {
  friend: {
    id: string;
    name: string;
    avatar: string;
    isOnline: boolean;
  };
}

interface Message {
  id: string;
  content: string;
  sender_id: string;
  sent_at: string;
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

  const [roomChatId, setRoomChatId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");

  useEffect(() => {
    async function fetchRoomAndMessages() {
      // Criar ou buscar a sala de chat
      const room = await getOrCreateRoomChat(user?.id!, friend.id);
      setRoomChatId(room.id);

      // Carregar histórico de mensagens
      const history = await getMessageHistory(room.id);
      setMessages(history);
    }

    fetchRoomAndMessages();
  }, [user?.id!, friend.id]);

  useEffect(() => {
    if (!roomChatId) return;

    const messageSubscription = supabase
      .channel("realtime-chat")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "message",
          filter: `room_chat_id=eq.${roomChatId}`,
        },
        (payload) => {
          setMessages((messages) => [...messages, payload.new]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(messageSubscription);
    };
  }, [roomChatId]);

  async function handleSendMessage() {
    if (newMessage.trim() === "" || !roomChatId) return;

    const { error } = await supabase
      .from("message")
      .insert([
        { content: newMessage, sender_id: user?.id, room_chat_id: roomChatId },
      ]);

    if (error) {
      console.error("Erro ao enviar mensagem:", error.message);
    } else {
      setNewMessage("");
    }
  }

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
      <ChatBottombar isMobile={false} handleSend={() => handleSendMessage()} />
    </div>
  );
};

export default FriendChat;
