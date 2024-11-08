// services/chatService.ts

import { supabase } from "@/lib/supabase-browser";

export async function getOrCreateRoomChat(userId: string, recipientId: string) {
  // Buscar uma sala de chat existente
  let { data: existingRoom, error } = await supabase
    .from("room_chat")
    .select("*")
    .or(`created_by_id.eq.${userId},joined_by_id.eq.${recipientId}`);

  if (error) {
    throw new Error(`Erro ao buscar sala de chat: ${error.message}`);
  }

  if (existingRoom && existingRoom.length > 0) {
    return existingRoom[0]; // Retorna a sala de chat existente
  }

  // Criar nova sala de chat
  const { data: newRoom, error: createError } = await supabase
    .from("room_chat")
    .insert([
      { created_by_id: userId, joined_by_id: recipientId, name: "Chat" },
    ])
    .single();

  if (createError) {
    throw new Error(`Erro ao criar sala de chat: ${createError.message}`);
  }

  return newRoom; // Retorna a nova sala de chat
}
