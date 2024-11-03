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
interface FriendStatus {
  id: string;
  is_online: boolean;
  online_at: string; // Se precisar dessa informação
  presence_ref: string; // Se precisar dessa informação
}
export function FriendshipPopover() {
  const { friendsStatus, friends } = useFriendsPresence();

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
            {friends?.map((friend, index) => {
              const isOnline = Object.values(friendsStatus).some(
                (subs: FriendStatus[]) =>
                  subs.some(
                    (status: FriendStatus) => status.id === friend.friend.id
                  )
              );

              console.log("isOnline", isOnline);
              return (
                <FriendListItem
                  key={index}
                  friendId={friend.friend.id}
                  avatarUrl={friend.friend.profileImageUrl}
                  name={friend.friend.name}
                  isOnline={isOnline}
                  lastMessage={"friend.lastMessage"}
                />
              );
            })}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
