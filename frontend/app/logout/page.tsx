"use client";
import { logout } from "@/services/loginService";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Logout(){
    const router = useRouter();
    useEffect(() =>{
        async function fazerLogout() {
            await logout();
            router.push("/login");
        }
        fazerLogout();
    }, [router])

    return(
        <p>Fazendo Logout...</p>
    )
}