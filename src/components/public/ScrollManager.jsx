import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function getHeaderOffset() {
  const header = document.querySelector("header");

  if (!header) {
    return 112;
  }

  return Math.ceil(header.getBoundingClientRect().height) + 20;
}

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
        const top = element.getBoundingClientRect().top + window.scrollY - getHeaderOffset();
        window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
      }
    });

    return () => window.cancelAnimationFrame(frame);
  }, [location.hash, location.pathname]);

  return null;
}
