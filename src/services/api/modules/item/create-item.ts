import { api } from "../../api";

type ItemOption = {
  name: string;
  additionalPrice: number;
};

export type CreateItem = {
  name: string;
  description: string;
  basePrice: number;
  gameId: string;
  availableOptions: ItemOption[];
  itemImages: ItemImage[]; // URLs das imagens
};

export type ItemImage = {
  imageUrl: string;
};

export async function createItem(data: FormData) {
  console.log("data createItem", data);
  const request = await api.post("/items", data, {
    headers: {
      "Content-Type": "multipart/form-data", // Importante definir o tipo de conteúdo como multipart/form-data
    },
  });

  return request.data;
}
