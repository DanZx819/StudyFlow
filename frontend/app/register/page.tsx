"use client";

import { useState } from "react";
import { register } from "@/services/authService";
import { RegisterDTO } from "@/types/User";
import styles from "./styles.module.css";

export default function Register() {

const [form, setForm] = useState<RegisterDTO>({
    name: "",
    email: "",
    password: "",
})

const [loading, setLoading] = useState(false);
  
function handleChange(e: React.ChangeEvent<HTMLInputElement>){
    setForm({
        ...form,
        [e.target.name]: e.target.value,
    })
}
  
async function handleSubmit(e: React.FormEvent){
    e.preventDefault();
    
    try{
      setLoading(true)
      await register(form);
      alert("Usuário criado com sucesso!");
    }catch(error: unknown){
      console.error(error instanceof Error ? error.message : error);
    }finally{
      setLoading(false)
    }
}
  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        
        <h1>Criar Conta</h1>
        <p>Comece sua jornada agora </p>

        <input
          type="text"
          name="name"
          placeholder="Seu nome"
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Seu email"
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Senha"
          onChange={handleChange}
          required
        />

        <button type="submit">
          {loading ? "Cadastrando..." : "Cadastrar"}
        </button>

        <span>
          Já tem conta? <a href="/login">Entrar</a>
        </span>

      </form>
    </div>
  );
}