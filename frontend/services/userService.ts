import { User } from "@/types/User";
import api from "./api";

export default async function getUser(){
    try{
      const response = await api.get<User>("/user");
      return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }catch(error: any){
      if(error.response?.status === '401'){
        console.log("Usuário não autenticado");
        return null;
      }

      console.error("Erro ao buscar usuário", error.message);
      return null
    }
  }