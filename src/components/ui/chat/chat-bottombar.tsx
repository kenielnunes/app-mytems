import {
  FileImage,
  Mic,
  Paperclip,
  PlusCircle,
  SendHorizontal,
  ThumbsUp,
} from "lucide-react";
import Link from "next/link";
import React, { useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Popover, PopoverContent, PopoverTrigger } from "../popover";
import { Button, buttonVariants } from "../button";
import { ChatInput } from "./chat-input";
import { EmojiPicker } from "../emoji-picker";
import { supabase } from "@/lib/supabase-browser";

interface ChatBottombarProps {
  isMobile: boolean;
  handleSend: (message: string) => void;
}

export const BottombarIcons = [{ icon: FileImage }, { icon: Paperclip }];

export default function ChatBottombar({
  isMobile,
  handleSend,
}: ChatBottombarProps) {
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // // Conectar ao canal do Supabase Realtime
  // useEffect(() => {
  //   const channel = supabase.channel(`room:${roomId}`);

  //   // Escuta mensagens de outros clientes
  //   channel.on("broadcast", { event: "message" }, (payload) => {
  //     const newMessage = payload.payload.message as string;
  //     setMessages((prevMessages) => [...prevMessages, newMessage]);
  //   });

  //   // Subscribes to the channel
  //   channel.subscribe();

  //   // Limpa o canal ao sair do componente
  //   return () => {
  //     channel.unsubscribe();
  //   };
  // }, [roomId]);

  function sendMessage(message: string) {
    handleSend(message);
    setMessage("");
  }

  // Função para lidar com a tecla Enter
  const handleKeyPress = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage(message);
    }
    if (event.key === "Enter" && event.shiftKey) {
      event.preventDefault();
      setMessage((prev) => prev + "\n");
    }
  };

  return (
    <div className="px-2 py-4 flex justify-between w-full items-center gap-2">
      <div className="flex">
        {!message.trim() && !isMobile && (
          <div className="flex">
            {BottombarIcons.map((icon, index) => (
              <Link
                key={index}
                href="#"
                className={cn(
                  buttonVariants({ variant: "ghost", size: "icon" }),
                  "h-9 w-9",
                  "shrink-0"
                )}
              >
                <icon.icon size={22} className="text-muted-foreground" />
              </Link>
            ))}
          </div>
        )}
      </div>

      <AnimatePresence initial={false}>
        <motion.div
          key="input"
          className="w-full relative"
          layout
          initial={{ opacity: 0, scale: 1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1 }}
          transition={{
            opacity: { duration: 0.05 },
            layout: {
              type: "spring",
              bounce: 0.15,
            },
          }}
        >
          <ChatInput
            value={message}
            ref={inputRef}
            onKeyDown={handleKeyPress}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
          />
          <div className="absolute right-4 bottom-3">
            <EmojiPicker
              onChange={(emoji) => {
                setMessage((prev) => prev + emoji);
                inputRef.current?.focus();
              }}
            />
          </div>
        </motion.div>

        {message.trim() ? (
          <Button
            className="h-9 w-9 shrink-0"
            onClick={() => sendMessage(message)}
            disabled={isLoading}
            variant="ghost"
            size="icon"
          >
            <SendHorizontal size={22} className="text-muted-foreground" />
          </Button>
        ) : (
          <Button
            className="h-9 w-9 shrink-0"
            onClick={() => setMessage("👍")}
            disabled={isLoading}
            variant="ghost"
            size="icon"
          >
            <ThumbsUp size={22} className="text-muted-foreground" />
          </Button>
        )}
      </AnimatePresence>
    </div>
  );
}
