"use client";

import { useState } from "react";
import styles from "./styles.module.css";
import {login} from "@/services/loginService";
import { useRouter } from "next/navigation";


export default function Login(){

    const router = useRouter();
    const [form, setForm] = useState({
        'email': '',
        'password': '',
    })

    const [loading, setLoading] = useState(false);

    function handleChange(e: React.ChangeEvent<HTMLInputElement>){
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    async function handleSubmit(e: React.FormEvent){
        e.preventDefault();

        try{
            setLoading(true)
            const response = await login(form);
            alert("Usuário Logado com sucesso!");

            localStorage.setItem("token", response.token);

            router.replace("/");

        }catch(error: unknown){
            console.error(error instanceof Error ? error.message : error);
        }finally{
            setLoading(false)
        }
    }

    return (
        <div className={styles.container}>
        <form className={styles.form} onSubmit={handleSubmit}>
            
            <h1>Login</h1>
            <p>Faça Login para acessar!</p>
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
            {loading ? "Logando..." : "Login"}
            </button>

            <span>
            Não possui conta? <a href="/register">Entrar</a>
            </span>

        </form>
        </div>
    );
}