// context/FriendsPresenceContext.tsx

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

// Definindo o tipo para o contexto de presença de amigos

interface FriendsPresenceContextType {
  friendsStatus: {
    [key: string]: {
      id: string;
      is_online: boolean;
    };
  };
  friends?: Friend[];
}

const FriendsPresenceContext = createContext<FriendsPresenceContextType>({
  friends: [],
  friendsStatus: {},
});

export const FriendsPresenceProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [friendsStatus, setFriendsStatus] = useState({});
  const { auth } = parseCookies();

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

  useEffect(() => {
    const channel = supabase.channel("friends_presence");

    channel
      .on("presence", { event: "sync" }, () => {
        const presenceState = channel.presenceState();

        console.log("presenceState", presenceState);

        setFriendsStatus(presenceState);
      })
      .subscribe(async (status) => {
        if (status === "SUBSCRIBED") {
          // Aqui você pode trackear a presença de múltiplos amigos
          // Por exemplo, usando IDs de amigos de um array

          console.log("friends", friends);
          const friendsIds = friends?.map((friend) => friend.friend.id) ?? [];

          console.log("friendsIds", friendsIds);
          await Promise.all(
            friendsIds?.map((id) =>
              channel.track({
                id,
                online_at: new Date().toISOString(),
                is_online: true,
              })
            )
          );
        }
      });

    window.onclose = () => {
      channel.unsubscribe();
    };

    return () => {
      channel.unsubscribe();
    };
  }, [friends]);

  return (
    <FriendsPresenceContext.Provider value={{ friendsStatus, friends }}>
      {children}
    </FriendsPresenceContext.Provider>
  );
};

// Custom Hook para usar o contexto
export const useFriendsPresence = () => useContext(FriendsPresenceContext);
