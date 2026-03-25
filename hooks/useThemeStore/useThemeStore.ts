"use client";

import { useSyncExternalStore } from "react";

// Subskrypcja do zmian w atrybutach <html> (MutationObserver)
function subscribe(callback: () => void) {
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });
  return () => observer.disconnect();
}

// Funkcja pobierająca aktualną wartość bezpośrednio z DOM
function getSnapshot() {
  return document.documentElement.classList.contains("dark");
}

// Funkcja dla serwera (SSR zawsze zakłada brak klasy dark na starcie)
function getServerSnapshot() {
  return false;
}

export function useThemeStatus() {
  // To jest  hook Reacta do łączenia się z systemami poza Reactem
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
