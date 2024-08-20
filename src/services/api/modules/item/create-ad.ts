import { api } from "../../api";

type AdOption = {
  name: string;
  additionalPrice: number;
};

export type CreateAd = {
  name: string;
  description: string;
  basePrice: number;
  gameId: string;
  availableOptions: AdOption[];
  adImages: AdImage[]; // URLs das imagens
};

export type AdImage = {
  imageUrl: string;
};

export async function createAd(data: FormData) {
  console.log("data createAd", data);
  const request = await api.post("/ads", data, {
    headers: {
      "Content-Type": "multipart/form-data", // Importante definir o tipo de conteúdo como multipart/form-data
    },
  });

  return request.data;
}
