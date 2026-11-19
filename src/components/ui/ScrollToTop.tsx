"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 320) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility, { passive: true });
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      aria-label="Volver al inicio de la página"
      className="fixed bottom-6 left-6 z-40 flex h-12 w-12 items-center justify-center rounded-2xl border border-surface-border bg-surface-elevated/90 text-steel-200 shadow-2xl backdrop-blur-md transition-all duration-300 hover:scale-110 hover:border-brand-500 hover:bg-brand-500 hover:text-white active:scale-95 group"
    >
      <ArrowUp
        suppressHydrationWarning
        className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-1"
      />
      <span className="sr-only">Volver arriba</span>
    </button>
  );
}
