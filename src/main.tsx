import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SortingPage from "./pages/sorting/index.tsx";
import SearchingPage from "./pages/searching/index.tsx";
import PathfindingPage from "./pages/pathfinding/index.tsx";
import ScrollToTop from "./components/ScrollToTop.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/sorting" element={<SortingPage />} />
        <Route path="/searching" element={<SearchingPage />} />
        <Route path="/pathfinding" element={<PathfindingPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
