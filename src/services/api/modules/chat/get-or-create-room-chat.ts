import { api } from "../../api";

// services/chatService.ts
export async function getOrCreateRoomChat(userId: string, recipientId: string) {
  // Buscar uma sala de chat existente
  const response = await api.get(
    `/room-chat?userId=${userId}&recipientId=${recipientId}`
  );

  return response.data; // Retorna a nova sala de chat
}
