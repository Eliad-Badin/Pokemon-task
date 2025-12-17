
//Types for data fecthing from API
export interface PokemonListResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: {
        name: string,
        url: string
    }[];
}

export interface PokemonDetailsResponse {
    id: number;
    name: string;
    sprites: {
        front_default: string | null;
        other?: {
            ["official-artwork"]?: {
                front_default: string | null;
            };
        };
    };
    types: {
        type: {
            name: string;
        };
    }[];
    stats: {
        base_stat: number;
        stat: {name: string};
    }[];
}

export interface PokemonSpeciesResponse {
    flavor_text_entries: {
        flavor_text: string;
        language: {name:string};
    }[];
}

export interface SimplePokemon {
    id: number;
    name: string;
    image: string;
    types: string[];
    location: PokemonLocation;
}

export interface PokemonStat {
    name: string;
    value: number;
}

export interface PokemonFullInfo {
    id: number;
    name: string;
    image: string;
    types: string[];
    description: string;
    stats: PokemonStat[];
    totalStats: number;
    location: PokemonLocation;
}

export interface PokemonLocation {
    lat: number;
    lng: number;
}