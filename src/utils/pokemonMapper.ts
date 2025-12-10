import type { PokemonDetailsResponse, PokemonSpeciesResponse, PokemonFullInfo } from "../types/PokemonTypes";

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
    };
} 