import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PokemonDetailsPage from "./pages/PokemonDetailsPage";
import { useEffect } from "react";
import applyColorsToCSS from "./utils/setColors";
import { DETAILED_POKEMONE_ROUTE } from "./utils/Strings";

function App() {
  
  useEffect(() => {
    applyColorsToCSS();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path={DETAILED_POKEMONE_ROUTE} element={<PokemonDetailsPage />} />
    </Routes>
  );
}

export default App;
