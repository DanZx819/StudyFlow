"use client";
import { Inter } from "next/font/google";
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
});

import { navLinks } from "./navigation";
import { useState } from "react";
import styles from "./styles.module.css";

import ButtonThemeToggle from "../theme/ButtonThemeToggle";
import { Menu, X } from "lucide-react";




export default function HeaderComponent() {
  


  const [open, setOpen] = useState(false);

  function handleOpen(){
    setOpen((prev) =>{
        return prev === true ? false : true; 
    })
  }
  return (
    <>
      <header className={styles.container}>
        <div className={styles.row}>
          <button
            className={styles.menu}
            onClick={handleOpen}
          >
            <Menu />
          </button>

          <h1 className={`${styles.logo} ${inter.className}`}>StudyFlow</h1>

          <ButtonThemeToggle />
        </div>
      </header>

      {/* Overlay */}
      {open && (
        <div
          className={styles.overlay}
          onClick={handleOpen}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`${styles.sidebar} ${
          open ? styles.open : ""
        }`}
      >
        <button
          className={styles.close}
          onClick={() => setOpen(false)}
        >
          <X />
        </button>

        <nav className={styles.menuList}>
          <div className={styles.profile}>
            <h1>Foto</h1>
            <h2>Nome</h2>
          </div>
          <hr />
          {navLinks.map((link) =>(
            <a href={link.href} key={link.href}>{link.name}</a>
          ))}
          
        </nav>
      </aside>
    </>
  );
}