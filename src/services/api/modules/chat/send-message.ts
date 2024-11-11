import axios from "axios";

// Função para enviar mensagem
export async function sendMessage(
  content: string,
  roomChatId: string,
  senderId: string
): Promise<void> {
  try {
    // Chamada ao backend para salvar a mensagem
    const response = await axios.post("/messages", {
      content,
      roomChatId,
      senderId,
    });

    if (response.status !== 201) {
      throw new Error("Erro ao enviar a mensagem");
    }

    console.log("Mensagem enviada com sucesso!");
  } catch (error) {
    console.error("Erro ao enviar a mensagem:", error);
    throw error;
  }
}
