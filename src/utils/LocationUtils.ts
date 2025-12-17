import { telAvivBounds } from "./telAvivBounds";
import type { PokemonLocation } from "../types/PokemonTypes";

export function getRandomTelAvivLocation(): PokemonLocation {
  const lat =
    telAvivBounds.south +
    Math.random() * (telAvivBounds.north - telAvivBounds.south);

  const lng =
    telAvivBounds.west +
    Math.random() * (telAvivBounds.east - telAvivBounds.west);

  return { lat, lng };
}

export function getOrCreatePokemonLocation(id: number): PokemonLocation {
  const key = `pokemon_location_${id}`;
  const stored = localStorage.getItem(key);

  if (stored) return JSON.parse(stored) as PokemonLocation;

  const newLocation = getRandomTelAvivLocation();
  localStorage.setItem(key, JSON.stringify(newLocation));
  return newLocation;
}
