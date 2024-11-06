// context/FriendsPresenceContext.tsx

import { FriendStatus } from "@/components/friendship/friendship-popover";
import { supabase } from "@/lib/supabase-browser";
import { api } from "@/services/api/api";
import { findUserFriends } from "@/services/api/modules/friendship/find-user-friends";
import { Friend } from "@/types/friend";
import { useQuery } from "@tanstack/react-query";
import { parseCookies } from "nookies";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useSession } from "./use-session";
import { RealtimePresenceState } from "@supabase/supabase-js";

// Definindo o tipo para o contexto de presença de amigos

interface FriendsPresenceContextType {
  friendsStatus: string[];
  friends?: Friend[];
}

type FriendsChannelPresence = {
  id: string;
  is_online: boolean;
  online_at: string;
  presence_ref: string;
};

const FriendsPresenceContext = createContext<FriendsPresenceContextType>({
  friends: [],
  friendsStatus: [],
});

export const FriendsPresenceProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [friendsStatus, setFriendsStatus] = useState<string[]>([]);
  const { auth } = parseCookies();
  const { user } = useSession();

  const { data: friends } = useQuery({
    queryKey: ["friends"],
    queryFn: async () => {
      // Simular chamada à API para buscar amigos
      api.defaults.headers["Authorization"] = `Bearer ${auth}`;
      const res = await findUserFriends();
      return res;
    },
    staleTime: 1000 * 60 * 5, // 5 minutos
    refetchInterval: 1000 * 60 * 5, // 5 minutos
  });

  const channel = supabase.channel("friends_presence");

  useEffect(() => {
    channel
      .on("presence", { event: "sync" }, () => {
        const friendsIds = [];

        const channelPresence =
          channel.presenceState() as RealtimePresenceState<FriendsChannelPresence>;

        for (const id in channelPresence) {
          // insere os usuarios sub no canal sem repetições
          friendsIds.push(channelPresence[id][0].id);
        }

        setFriendsStatus([...new Set(friendsIds)]);
      })
      .subscribe(async (status) => {
        if (status === "SUBSCRIBED") {
          await channel.track({
            online_at: new Date().toISOString(),
            id: user?.id,
          });
        }
      });

    window.onclose = () => {
      channel.unsubscribe();
    };

    return () => {
      channel.unsubscribe();
    };
  }, [user]);

  return (
    <FriendsPresenceContext.Provider value={{ friendsStatus, friends }}>
      {children}
    </FriendsPresenceContext.Provider>
  );
};

// Custom Hook para usar o contexto
export const useFriendsPresence = () => useContext(FriendsPresenceContext);
