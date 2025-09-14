import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SortingPage from "./pages/learn/sorting/index.tsx";
import SearchingPage from "./pages/learn/searching/index.tsx";
import ScrollToTop from "./components/ScrollToTop.tsx";
import ModalProvider from "./context/ModalContext.tsx";
import { AuthProvider } from "./context/AuthContext.tsx";
import LearnLayout from "./components/layout/LearnLayout.tsx";
import LearningOverview from "./pages/learn/index.tsx";
import ArrayPage from "./pages/learn/array/index.tsx";
import ListPage from "./pages/learn/list/index.tsx";
import ExplorePage from "./pages/explore/index.tsx";
import Dashboard from "./pages/user/[slug]/index.tsx";
import { ProgressProvider } from "./context/ProgressContext.tsx";

createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <BrowserRouter>
      <ProgressProvider>
        <ModalProvider>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/learn" element={<LearnLayout />}>
              <Route index element={<LearningOverview />} />
              <Route path="array" element={<ArrayPage />} />
              <Route path="sorting" element={<SortingPage />} />
              <Route path="searching" element={<SearchingPage />} />
              <Route path="list" element={<ListPage />} />
            </Route>
            <Route path="/explore" element={<ExplorePage />} />
            <Route path="/user/:id" element={<Dashboard />} />
          </Routes>
        </ModalProvider>
      </ProgressProvider>
    </BrowserRouter>
  </AuthProvider>
);
