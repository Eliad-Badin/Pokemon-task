import { COLORS } from "./Colors";

export default function applyColorsToCSS() {
    Object.entries(COLORS).forEach(([key, value]) => {
        document.documentElement.style.setProperty(`--${key}`, value);
    });
} 