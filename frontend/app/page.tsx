"use client";

import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import Link from "next/link";
import api from "@/services/api";
import { User } from "@/types/User";

export default function Home() {
  const [user, setUser] = useState<User | null>(null)

  async function getUser(){
    try{
      const response = await api.get<User>("/user");
      setUser(response.data);
    }catch(error){
      console.error("Erro ao buscar usuário", error);
    }
  }
  
  
  useEffect(() =>{
    // eslint-disable-next-line react-hooks/set-state-in-effect
    getUser();
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
          <h2>💻 Linguagens</h2>
          <p>Acompanhe o que você está estudando</p>
          <Link href="/linguagens">Ver linguagens</Link>
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