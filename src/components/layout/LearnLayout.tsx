import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../Footer";

export default function LearnLayout() {
  return (
    <main>
      <Navbar />
      <Outlet />
      <Footer />
    </main>
  );
}
