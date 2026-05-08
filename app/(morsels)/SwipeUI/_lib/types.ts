export type Food = {
  _id: string;
  name: string;
  category: string;
  area: string;
  image: string;
  description: string;
  tags: string[];
  ingredients: string[];
  cookTime: number;
  calories: number;
};

export type Restaurant = {
  _id: string;
  name: string;
  categories: string[];
  image: string;
  rating: number;
  reviews: number;
  price: string;
  distance: string;
  eta: string;
  address: string;
  takeoutLinks: { service: string; url: string }[];
  mapsUrl: string;
};

export type Theme = "light" | "dark";
export type Side = "left" | "right";
export type Flash = { side: Side; key: number; unlock: boolean } | null;
