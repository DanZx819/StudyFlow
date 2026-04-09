"use client";

import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import Link from "next/link";
import api from "@/services/api";
import { User } from "@/types/User";
import getUser from "@/services/userService";

export default function Home() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
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
  }, []);

  return (
    <div className={styles.container}>
      {/* Saudação */}
      <section className={styles.hero}>
        <h1>Olá, {user?.name}👋</h1>
        <h2>🔥{user?.sequencia}</h2>
        <p>Pronto para continuar sua evolução hoje?</p>
      </section>

      {/* Cards */}
      <section className={styles.cards}>
        <div className={styles.card}>
          <h2>📅 Minha Rotina</h2>
          <p>Organize seus horários de estudo</p>
          <Link href="/rotina">Acessar</Link>
        </div>

        <div className={styles.card}>
          <h2>💻 Matérias</h2>
          <p>Acompanhe o que você está estudando</p>
          <Link href="/materias">Ver matérias</Link>
        </div>

        <div className={styles.card}>
          <h2>📊 Progresso</h2>
          <p>Veja sua evolução ao longo do tempo</p>
          <Link href="/progresso">Ver progresso</Link>
        </div>
      </section>
    </div>
  );
}
