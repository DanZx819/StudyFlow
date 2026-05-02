"use client";
import { MoonStar, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import styles from "./styles.module.css";

export default function ThemeToggle(){
  const [theme, setTheme] = useState("dark");
  const [mounted, setMounted] = useState(false);

  // Carrega o tema salvo ao montar
  useEffect(() => {
    const saved = localStorage.getItem("tema") || "dark";
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTheme(saved);
    document.documentElement.classList.toggle("dark", saved === "dark");
    setMounted(true);
  }, []);

  // Aplica mudancas apenas apos montar
  useEffect(() => {
    if (!mounted) return;
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("tema", theme);
  }, [theme, mounted]);

  function handleTheme(){
    setTheme((prev) => prev === "dark" ? "light" : "dark");
  }

  if (!mounted) return null;

  return(
    <button onClick={handleTheme} className={styles.buttonTheme}>
        {theme === "dark" ? <MoonStar/> : <Sun/>}
    </button>
  )
}
