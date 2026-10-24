"use client";
import { createContext, useContext, useState, ReactNode } from "react";
import en from "../../messages/en.json";
import es from "../../messages/es.json";

type Locale = "en" | "es";
type Messages = typeof en;

interface LanguageContextType {
  locale: Locale;
  t: (key: string) => any;
  setLocale: (locale: Locale) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>("en");

  const messages = { en, es };

  const t = (key: string): any => {
    const keys = key.split(".");
    let value: any = messages[locale];
    for (const k of keys) {
      if (value && typeof value === "object" && k in value) {
        value = value[k];
      } else {
        console.warn(`Translation key not found: ${key}`);
        return key;
      }
    }
    // Safety check: if value is a non-array object, return a placeholder to avoid React errors
    // Note: arrays are allowed (callers handle them intentionally)
    if (typeof value === "object" && value !== null && !Array.isArray(value)) {
      console.error(
        `Trying to render an object as React child for key: ${key}`,
        value
      );
      return "";
    }
    return value;
  };

  return (
    <LanguageContext.Provider value={{ locale, t, setLocale }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
