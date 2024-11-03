import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useFriendsPresence } from "@/contexts/FriendsPresenceContext";
import { setupPresence, supabase } from "@/lib/supabase-browser";
import { useEffect, useState } from "react";

interface FriendListItemProps {
  friendId: string;
  avatarUrl: string;
  name: string;
  isOnline: boolean;
  lastMessage: string;
}

export function FriendListItem({
  avatarUrl,
  name,
  isOnline,
  lastMessage,
}: FriendListItemProps) {
  // Configurar presença

  return (
    <div className="flex items-center space-x-4 p-2 hover:bg-black cursor-pointer rounded-md">
      <Avatar className="w-10 h-10">
        <AvatarImage src={avatarUrl} alt={`${name}'s avatar`} />
        <AvatarFallback>{name.charAt(0)}</AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <div className="flex justify-between items-center">
          <span className="font-medium">{name}</span>
          <Badge
            className={`${isOnline ? "bg-green-800" : ""}`}
            variant={isOnline ? "outline" : "destructive"}
          >
            {isOnline ? "Online" : "Offline"}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground truncate">{lastMessage}</p>
      </div>
    </div>
  );
}
