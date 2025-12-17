import { FAVORITES_KEY } from "./Strings";

export function getFavoriteIds(): number[] {
    try {
        const rawStored = localStorage.getItem(FAVORITES_KEY);
        return rawStored ? JSON.parse(rawStored) as number[] : [];
    } catch {
        return [];
    }   
}

function setFavoriteIds(ids: number[]) {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(ids));
    window.dispatchEvent(new Event("favoritesUpdated"));
}

export function isFavorite(id: number): boolean {
    return getFavoriteIds().includes(id);
}

export function toggleFavorite(id: number): number[] {
    const ids = getFavoriteIds();
    const next = ids.includes(id) ? ids.filter(favId => favId !== id) : [...ids, id];
    setFavoriteIds(next);
    return next;
}