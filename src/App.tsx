import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import ScrollToTop from "./components/ScrollToTop";
import ModalProvider from "./context/ModalContext";
import { AuthProvider } from "./context/AuthContext";
import { ProgressProvider } from "./context/ProgressContext";
import { AppLayout } from "./components/layout/AppLayout";
import HomePage from "./pages/home";
import LearnPage from "./pages/learn";
import SortingPage from "./pages/learn/sorting";
import SearchingPage from "./pages/learn/searching";
import ArrayPage from "./pages/learn/array";
import ListPage from "./pages/learn/list";
import BitmaskPage from "./pages/learn/bitmask";
import ExplorePage from "./pages/explore";
import ProfilePage from "./pages/user/[slug]";
import EditProfilePage from "./pages/user/[slug]/edit";
import TwoPointersPage from "./pages/learn/two-pointers";
import SlidingWindowPage from "./pages/learn/sliding-window";
import BacktrackingPage from "./pages/learn/backtracking";
import RecursionPage from "./pages/learn/recursion";
import IntervalsPage from "./pages/learn/intervals";

function App() {
  return (
    <AuthProvider>
      <ProgressProvider>
        <ModalProvider>
          <BrowserRouter>
            <ScrollToTop />
            <Routes>
              <Route element={<AppLayout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/learn" element={<LearnPage />} />
                <Route path="/learn/array" element={<ArrayPage />} />
                <Route path="/learn/sorting" element={<SortingPage />} />
                <Route path="/learn/searching" element={<SearchingPage />} />
                <Route path="/learn/recursion" element={<RecursionPage />} />
                <Route path="/learn/linkedlist" element={<ListPage />} />
                <Route path="/learn/bitmask" element={<BitmaskPage />} />
                <Route
                  path="/learn/two-pointers"
                  element={<TwoPointersPage />}
                />
                <Route
                  path="/learn/sliding-window"
                  element={<SlidingWindowPage />}
                />
                <Route
                  path="/learn/backtracking"
                  element={<BacktrackingPage />}
                />
                <Route path="/learn/intervals" element={<IntervalsPage />} />
                <Route path="/explore" element={<ExplorePage />} />
                <Route path="/user/:id" element={<ProfilePage />} />
                <Route path="/user/:id/edit" element={<EditProfilePage />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </ModalProvider>
      </ProgressProvider>
      <Analytics />
    </AuthProvider>
  );
}

export default App;
