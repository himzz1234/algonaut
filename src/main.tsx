import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SortingPage from "./pages/sorting/index.tsx";
import SearchingPage from "./pages/searching/index.tsx";
import PathfindingPage from "./pages/pathfinding/index.tsx";
import ScrollToTop from "./components/ScrollToTop.tsx";
import ModalProvider from "./context/ModalContext.tsx";
import { AuthProvider } from "./context/AuthContext.tsx";
import LearnLayout from "./components/layout/LearnLayout.tsx";
import LearningOverview from "./pages/learn/index.tsx";
import ArrayPage from "./pages/array/index.tsx";

createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <BrowserRouter>
      <ModalProvider>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/learn" element={<LearnLayout />}>
            <Route index element={<LearningOverview />} />
            <Route path="array" element={<ArrayPage />} />
            <Route path="sorting" element={<SortingPage />} />
            <Route path="searching" element={<SearchingPage />} />
            <Route path="pathfinding" element={<PathfindingPage />} />
          </Route>
        </Routes>
      </ModalProvider>
    </BrowserRouter>
  </AuthProvider>
);
