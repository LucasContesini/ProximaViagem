export interface Attraction {
  name: string;
  description: string;
  duration: string;
  price: string;
}

export interface Budget {
  low: string;
  medium: string;
  high: string;
}

export interface Destination {
  id: string;
  name: string;
  country: string;
  description: string;
  detailedInfo: string;
  imageUrl: string;
  images: string[];
  tips: string[];
  attractions: Attraction[];
  bestTime: string;
  budget: Budget;
  transportation: string;
  accommodation: string;
  localCuisine: { name: string; description: string; }[]; // Nome e descrição dos pratos
  date: string;
}

