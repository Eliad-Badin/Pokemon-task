import { useState, useEffect } from "react";
import { getFavoriteIds, isFavorite, toggleFavorite } from "../utils/favoritesStorage";

export function useFavorites() {
    const [favoriteIds, setFavoriteIds] = useState<number[]>(getFavoriteIds());

    useEffect(() => {
        const handler = () => {
            setFavoriteIds(getFavoriteIds());
        };

        window.addEventListener("favoritesUpdated", handler);
        window.addEventListener("storage", handler);

        return () => {
            window.removeEventListener("favoritesUpdated", handler);
            window.removeEventListener("storage", handler);
        };
    }, []);

    return {
        favoriteIds,
        isFavorite,
        toggleFavorite: (id: number) => {
            const next = toggleFavorite(id);
            setFavoriteIds(next);
            return next;
        },
    };
}