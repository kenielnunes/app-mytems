// services/messageService.ts
export async function getMessageHistory(roomChatId: string) {
  const response = await fetch(
    `http://localhost:4000/room-chat/${roomChatId}/messages`,
    {
      method: "GET",
    }
  );

  if (!response.ok) {
    throw new Error(
      `Erro ao carregar histórico de mensagens: ${response.statusText}`
    );
  }

  const data = await response.json();
  return data; // Retorna as mensagens
}
