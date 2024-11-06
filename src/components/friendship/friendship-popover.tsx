import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Circle } from "lucide-react";
import { FriendListItem } from "./friend-list-item";
import { useFriendsPresence } from "@/contexts/FriendsPresenceContext";
import FriendChat from "./friend-chat";
import { useState } from "react";

export interface FriendStatus {
  id: string;
  is_online: boolean;
  online_at: string;
  presence_ref: string;
}

interface FriendChatProps {
  id: string;
  name: string;
  avatar: string;
  isOnline: boolean;
}

export function FriendshipPopover() {
  const { friendsStatus, friends } = useFriendsPresence();

  const [friendChat, setFriendChat] = useState<FriendChatProps>();

  console.log("friendsStatus", friendsStatus);
  return (
    <div className="absolute bottom-0 right-10">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="flex items-center gap-2 px-16 py-6"
          >
            <Circle className="fill-green-600 w-5" />
            Amigos
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <div className="space-y-2">
            {friends?.map((friendship, index) => {
              const isOnline = friendsStatus.includes(friendship.friend.id);

              const { id, name, profileImageUrl } = friendship.friend;

              console.log("isOnline", isOnline);

              return (
                <Popover>
                  <PopoverTrigger>
                    <FriendListItem
                      onSelect={() =>
                        setFriendChat({
                          id,
                          avatar: profileImageUrl,
                          name: name,
                          isOnline,
                        })
                      }
                      key={index}
                      friendId={id}
                      avatarUrl={profileImageUrl}
                      name={name}
                      isOnline={isOnline}
                      lastMessage={"friend.lastMessage"}
                    />
                  </PopoverTrigger>
                  <PopoverContent className="w-[32.5rem]" side="left">
                    {friendChat && <FriendChat friend={friendChat} />}
                  </PopoverContent>
                </Popover>
              );
            })}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
