"use client";
import { MoonStar, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import styles from "./styles.module.css";


export default function ThemeToggle(){
  const [theme, setTheme] = useState("dark");

  function handleTheme(){
    setTheme((prev) =>{
      return prev === "dark" ? "light" : "dark";
    });
  }

  useEffect(() =>{
    const html = document.documentElement;
    html.classList.toggle("dark", theme === "dark")
  }, [theme]);

  return(
    <button onClick={handleTheme} className={styles.buttonTheme}>
        {theme === "dark" ? <MoonStar/> : <Sun/>}
    </button>
  )
}

