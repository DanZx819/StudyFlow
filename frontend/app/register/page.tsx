"use client";

import { useState } from "react";
import styles from "./styles.module.css";

export default function Register() {

const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
})
  
function handleChange(e: React.ChangeEvent<HTMLInputElement>){
    setForm({
        ...form,
        [e.target.name]: e.target.value,
    })
}
  
function handleSubmit(e: React.FormEvent){
    e.preventDefault();
    //Fazer requisição
    console.log(form)
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

        <button type="submit">Cadastrar</button>

        <span>
          Já tem conta? <a href="/login">Entrar</a>
        </span>

      </form>
    </div>
  );
}