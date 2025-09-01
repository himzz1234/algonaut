import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const NAVBAR_HEIGHT = 80;

export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: "auto" });
    } else {
      setTimeout(() => {
        const el = document.querySelector(hash);
        if (el) {
          const top = (el as HTMLElement).offsetTop - NAVBAR_HEIGHT - 20;
          window.scrollTo({ top, behavior: "auto" });
        }
      }, 0);
    }
  }, [pathname, hash]);

  return null;
}
