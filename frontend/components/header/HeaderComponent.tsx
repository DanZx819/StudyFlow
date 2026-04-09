"use client";
import { Inter } from "next/font/google";
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
});

import { navLinks } from "./navigation";
import { useEffect, useState } from "react";
import styles from "./styles.module.css";

import ButtonThemeToggle from "../theme/ButtonThemeToggle";
import { Menu, X } from "lucide-react";
import { User } from "@/types/User";
import getUser from "@/services/userService";




export default function HeaderComponent() {
  
  const [user, setUser] = useState<User | null>(null);
  const [open, setOpen] = useState(false);
  useEffect(() =>{
    async function setandoUser(){
      try{
        const response = await getUser();
        if(response){
          setUser(response);
        }
      }catch(error: unknown){
        console.error(error)
      }

    }

    setandoUser();
  }, [open])






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
            {user ? (
              <>
                <h1>{user?.name}</h1>
                <h2>{user?.email}</h2>
                <a href="/logout">Logout</a>
              </>
            ) : (
              <p>Faça <span><a href="/login">Login</a></span> ou <span><a href="/register">Registro</a></span></p>
            )}
            
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