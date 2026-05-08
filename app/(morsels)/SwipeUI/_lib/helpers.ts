import * as db from "../../database";
import type { Food, Restaurant } from "./types";

const foods = db.foods as Food[];
const restaurants = db.restaurants as Restaurant[];

export function pickRandomFood(exclude: string[] = []): Food {
  const pool = foods.filter((f) => !exclude.includes(f._id));
  return pool[Math.floor(Math.random() * pool.length)];
}

export function findFood(id: string): Food | undefined {
  return foods.find((f) => f._id === id);
}

export function topRestaurantsFor(food: Food | null, limit = 5): Restaurant[] {
  if (!food) return [];
  const matching = restaurants
    .filter((r) => r.categories.includes(food.category))
    .sort((a, b) => b.rating - a.rating);
  const others = restaurants
    .filter((r) => !r.categories.includes(food.category))
    .sort((a, b) => b.rating - a.rating);
  return [...matching, ...others].slice(0, limit);
}
