export interface Item {
  id: string;
  userId: string;
  name: string;
  description: string;
  basePrice: number;
  gameId: string;
  createdAt: string;
  updatedAt: string;
  availableOptions: AvailableOption[];
  images: ItemImage[];
  questions: ItemQuestion[];
}

export interface ItemQuestion {
  id: string;
  user: User;
  question: string;
  createdAt: string;
  updatedAt: string;
}

export interface AvailableOption {
  id: string;
  name: string;
  additionalPrice: number;
  itemId: string;
  createdAt: string;
  updatedAt: string;
}

export interface ItemImage {
  id: string;
  imageUrl: string;
  itemId: string;
  createdAt: string;
  updatedAt: string;
}
