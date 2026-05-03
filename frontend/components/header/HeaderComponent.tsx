"use client";

import { navLinks } from "./navigation";
import { useEffect, useState } from "react";
import styles from "./styles.module.css";

import ButtonThemeToggle from "../theme/ButtonThemeToggle";
import SparkLogo from "../brand/SparkLogo";
import Wordmark from "../brand/Wordmark";
import { Menu, X } from "lucide-react";
import { User } from "@/types/User";
import getUser from "@/services/userService";
import { useRouter } from "next/navigation";
import { logout } from "@/services/loginService";
import Link from "next/link";

export default function HeaderComponent() {
  const [user, setUser] = useState<User | null>(null);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    async function setandoUser() {
      try {
        const response = await getUser();
        if (response) {
          setUser(response);
        }
      } catch (error: unknown) {
        console.error(error);
      }
    }

    setandoUser();
  }, [open]);
  const router = useRouter();
  async function handleLogout() {
    await logout();
    router.push("/login");
    setUser(null);
  }

  function handleOpen() {
    setOpen((prev) => !prev);
  }

  return (
    <>
      <header className={styles.container}>
        <div className={styles.row}>
          <button className={styles.menu} onClick={handleOpen}>
            <Menu />
          </button>

          <Link href="/" className={styles.logoWrap}>
            <SparkLogo size={36} withSparks={false} id="header" />
            <Wordmark size={22} />
          </Link>

          {/* Nav desktop inline */}
          <nav className={styles.desktopNav}>
            {navLinks.map((link) => (
              <Link href={link.href} key={link.href} className={styles.desktopLink}>
                {link.name}
              </Link>
            ))}
          </nav>

          <div className={styles.headerActions}>
            <ButtonThemeToggle />
            {user ? (
              <button className={styles.btnLogout} onClick={handleLogout}>
                Sair
              </button>
            ) : (
              <>
                <Link href="/login" className={styles.btnEntrar}>
                  Entrar
                </Link>
                <Link href="/register" className={styles.btnComecar}>
                  Começar grátis
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Overlay */}
      {open && <div className={styles.overlay} onClick={handleOpen} />}

      {/* Sidebar */}
      <aside className={`${styles.sidebar} ${open ? styles.open : ""}`}>
        <button className={styles.close} onClick={() => setOpen(false)}>
          <X />
        </button>

        <nav className={styles.menuList}>
          <div className={styles.profile}>
            {user ? (
              <>
                <h1>{user?.name}</h1>
                <h2>{user?.email}</h2>
                <a href="#" onClick={handleLogout}>Logout</a>
              </>
            ) : (
              <p>
                Faça{" "}
                <span>
                  <a href="/login">Login</a>
                </span>{" "}
                ou{" "}
                <span>
                  <a href="/register">Registro</a>
                </span>
              </p>
            )}
          </div>
          <hr />
          {navLinks.map((link) => (
            <a href={link.href} key={link.href}>
              {link.name}
            </a>
          ))}
        </nav>
      </aside>
    </>
  );
}
