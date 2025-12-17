import type {
     PokemonListResponse, 
    PokemonDetailsResponse,
    PokemonSpeciesResponse,
    SimplePokemon,
    PokemonFullInfo,
    PokemonStat
    } from "../../types/PokemonTypes";
import { mapPokemonData, mapToSimplePokemon } from "../../utils/pokemonMapper";

const BASE_URL = import.meta.env.VITE_BASE_API_URL;

export async function getPokemonList(limit: number, offset: number) : Promise<PokemonListResponse>{ 
    console.log ("BASE_URL:", BASE_URL);
    const response = await fetch (`${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`);
    if (!response.ok)
        throw new Error("Failed to fetch Pokemon list!");

    return response.json();
}

export async function getPokemonDetails(idOrName: string | number): Promise<PokemonDetailsResponse>{
    const response = await fetch(`${BASE_URL}/pokemon/${idOrName}`);
    if (!response.ok)
        throw new Error("Failed to fetch Pokemon details!");

    return response.json();
}

export async function getPokemonSpeicies (idOrName: string | number): Promise<PokemonSpeciesResponse>{
    const response = await fetch (`${BASE_URL}/pokemon-species/${idOrName}`);
    if (!response.ok)
        throw new Error("Failed to fetch Pokemon spiecies info");

    return response.json();
}

export async function GetSimplePokemonList(limit: number, offset: number):
Promise<SimplePokemon[]> {
    const list = await getPokemonList(limit, offset);
    const promises = list.results.map(item => getPokemonDetails(item.name));
    const detailsArray = await Promise.all(promises); 
    return detailsArray.map(details => mapToSimplePokemon(details));
}

export async function getFullPokemonInfo(idOrName: string | number ): 
Promise<PokemonFullInfo> {
    const details = await getPokemonDetails(idOrName);
    const species = await getPokemonSpeicies(idOrName);

    return mapPokemonData(details, species);
}