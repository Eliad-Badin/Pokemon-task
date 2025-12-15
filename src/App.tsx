import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PokemonDetailsPage from "./pages/PokemonDetailsPage";
import FavoritePage from "./pages/FavoritePage";
import { useEffect } from "react";
import applyColorsToCSS from "./utils/setColors";
import { DETAILED_POKEMONE_ROUTE, FAVORITES_ROUTE } from "./utils/Strings";
import "./App.css"

function App() {
  
  useEffect(() => {
    applyColorsToCSS();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path={DETAILED_POKEMONE_ROUTE} element={<PokemonDetailsPage />} />
      <Route path={FAVORITES_ROUTE} element={<FavoritePage />} />
    </Routes>
  );
}

export default App;
