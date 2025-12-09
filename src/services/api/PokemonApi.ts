import type {
     PokemonListResponse, 
    PokemonDetailsResponse,
    PokemonSpeciesResponse,
    SimplePokemon,
    PokemonFullInfo,
    PokemonStat
    } from "../../types/PokemonTypes";

import { BASE_URL } from "../../utils/Strings";

export async function getPokemonList(limit: number, offset: number) : Promise<PokemonListResponse>{ 
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

function mapToSimplePokemon(details: PokemonDetailsResponse): SimplePokemon {
    const image =
        details.sprites.front_default ??
        details.sprites.other?.["official-artwork"]?.front_default ??
        "";

    return {
        id: details.id,
        name: details.name,
        image,
        types: details.types.map (t => t.type.name),
    };
}

function mapToPokemonFullInfo(
    details: PokemonDetailsResponse,
    species: PokemonSpeciesResponse
): PokemonFullInfo {
    const englishEntry = species.flavor_text_entries.find(
        entry => entry.language.name ==="en");
    
    const description = englishEntry ? 
    englishEntry.flavor_text.replace(/\s+/g, " ") : "No description available.";

    const stats: PokemonStat[] = details.stats.map (s => ({
        name: s.stat.name,
        value: s.base_stat,
    }));

    const totalStats = stats.reduce((sum, s) => sum + s.value, 0);

    
    const image =
        details.sprites.front_default ??
        details.sprites.other?.["official-artwork"]?.front_default ??
        "";

    return {
        id: details.id,
        name: details.name,
        image,
        types: details.types.map(t => t.type.name),
        description,
        stats,
        totalStats,
    };
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

    return mapToPokemonFullInfo(details, species);
}