import { supabase } from "@/lib/supabase-browser";

// services/messageService.ts
export async function getMessageHistory(roomChatId: string) {
  const { data, error } = await supabase
    .from("message")
    .select("*")
    .eq("room_chat_id", roomChatId)
    .order("sent_at", { ascending: true });

  if (error) {
    throw new Error(
      `Erro ao carregar histórico de mensagens: ${error.message}`
    );
  }

  return data;
}
