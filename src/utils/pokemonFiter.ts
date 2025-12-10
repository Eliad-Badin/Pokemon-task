import type { Pokemon } from '../types/pokemon';

export function filterPokemons(pokemons: Pokemon[], searchTerm: string): Pokemon[] {
    const term = searchTerm.toLowerCase();
    return pokemons.filter(p => {
        const matchByName = p.name.toLowerCase().includes(term);
        const matchById = String(p.id).includes(term);
        const matchByType = p.types.some(t => t.toLowerCase().includes(term));
        
        return matchByName || matchById || matchByType;
    });
}
