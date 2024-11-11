// services/chatService.ts
export async function getOrCreateRoomChat(userId: string, recipientId: string) {
  // Buscar uma sala de chat existente
  let response = await fetch(
    `http://localhost:4000/room-chat?userId=${userId}&recipientId=${recipientId}`,
    {
      method: "GET",
    }
  );

  if (!response.ok) {
    throw new Error(`Erro ao buscar sala de chat: ${response.statusText}`);
  }

  const existingRoom = await response.json();

  if (existingRoom) {
    return existingRoom; // Retorna a sala de chat existente
  }

  // Caso não exista, cria uma nova sala de chat
  const createResponse = await fetch(`/api/room-chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      createdById: userId,
      recipientId,
      name: "Chat",
    }),
  });

  if (!createResponse.ok) {
    throw new Error(`Erro ao criar sala de chat: ${createResponse.statusText}`);
  }

  const newRoom = await createResponse.json();
  return newRoom; // Retorna a nova sala de chat
}
