import { useEffect, useState } from "react";

export function useOrientation() {
  const [isPortrait, setIsPortrait] = useState(() =>
    typeof window !== "undefined"
      ? window.matchMedia("(orientation: portrait)").matches
      : true
  );

  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth < 768 : false
  );

  useEffect(() => {
    const mm = window.matchMedia("(orientation: portrait)");
    const onChange = () => setIsPortrait(mm.matches);
    const onResize = () => setIsMobile(window.innerWidth < 768);

    mm.addEventListener?.("change", onChange);
    window.addEventListener("resize", onResize);
    onChange();
    onResize();

    return () => {
      mm.removeEventListener?.("change", onChange);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return { isPortrait, isMobile };
}
