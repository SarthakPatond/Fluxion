import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { initialContent } from "../data/siteData";

const STORAGE_KEY = "fluxion-site-content";

const SiteContentContext = createContext(null);

function readStoredContent() {
  if (typeof window === "undefined") {
    return initialContent;
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return initialContent;
    }

    const parsed = JSON.parse(raw);

    return {
      ...initialContent,
      ...parsed,
      hero: {
        ...initialContent.hero,
        ...parsed.hero,
      },
      settings: {
        ...initialContent.settings,
        ...parsed.settings,
      },
    };
  } catch {
    return initialContent;
  }
}

function createId(prefix) {
  return `${prefix}-${Date.now()}`;
}

export function SiteContentProvider({ children }) {
  const [content, setContent] = useState(readStoredContent);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
  }, [content]);

  const value = useMemo(
    () => ({
      content,
      resetContent: () => setContent(initialContent),
      updateHero: (payload) =>
        setContent((prev) => ({
          ...prev,
          hero: { ...prev.hero, ...payload },
        })),
      updateSettings: (payload) =>
        setContent((prev) => ({
          ...prev,
          settings: { ...prev.settings, ...payload },
        })),
      addItem: (collection, payload) =>
        setContent((prev) => ({
          ...prev,
          [collection]: [...prev[collection], { id: createId(collection), ...payload }],
        })),
      updateItem: (collection, id, payload) =>
        setContent((prev) => ({
          ...prev,
          [collection]: prev[collection].map((item) =>
            item.id === id ? { ...item, ...payload } : item,
          ),
        })),
      deleteItem: (collection, id) =>
        setContent((prev) => ({
          ...prev,
          [collection]: prev[collection].filter((item) => item.id !== id),
        })),
    }),
    [content],
  );

  return <SiteContentContext.Provider value={value}>{children}</SiteContentContext.Provider>;
}

export function useSiteContent() {
  const context = useContext(SiteContentContext);

  if (!context) {
    throw new Error("useSiteContent must be used within SiteContentProvider");
  }

  return context;
}
