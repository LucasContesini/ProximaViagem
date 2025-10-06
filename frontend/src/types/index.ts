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

export interface CuisineDish {
  name: string;
  description: string;
  imageUrl: string;
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
  localCuisine: CuisineDish[] | string[]; // Suporta ambos os formatos
  date: string;
}

