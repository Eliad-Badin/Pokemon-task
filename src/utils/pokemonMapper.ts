import type { PokemonDetailsResponse, PokemonSpeciesResponse, PokemonFullInfo, SimplePokemon } from "../types/PokemonTypes";
import { getOrCreatePokemonLocation } from "./LocationUtils";

export function mapPokemonData (
    detailsData: PokemonDetailsResponse,
    speciesData: PokemonSpeciesResponse
): PokemonFullInfo {
    const description =
        speciesData.flavor_text_entries.find(
            (entry) => entry.language.name === "en"
        )?.flavor_text.replace(/\n|\f/g, " ") ??
        "No description available.";

    const totalStats = detailsData.stats.reduce(
        (sum, s) => sum + s.base_stat,
        0
    );

    const location = getOrCreatePokemonLocation(detailsData.id);

    return {
        id: detailsData.id,
        name: detailsData.name,
        image: detailsData.sprites.front_default ?? "",
        types: detailsData.types.map((t) => t.type.name),
        description,
        stats: detailsData.stats.map((s) => ({
            name: s.stat.name,
            value: s.base_stat,
        })),
        totalStats,
        location,
    };
} 

export function mapToSimplePokemon(details: PokemonDetailsResponse): SimplePokemon {
    const image =
        details.sprites.front_default ??
        details.sprites.other?.["official-artwork"]?.front_default ??
        "";
        
    const location = getOrCreatePokemonLocation(details.id);
    return {
        id: details.id,
        name: details.name,
        image,
        types: details.types.map (t => t.type.name),
        location,
    };
}