import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollManager() {
  const location = useLocation();

  useEffect(() => {
    const hash = location.hash?.replace("#", "");

    if (!hash) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const frame = window.requestAnimationFrame(() => {
      const element = document.getElementById(hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });

    return () => window.cancelAnimationFrame(frame);
  }, [location.hash, location.pathname]);

  return null;
}
