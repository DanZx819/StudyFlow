import api from "./api";
import { RegisterDTO, User } from "@/types/User";

export async function register(data: RegisterDTO): Promise<User>{
    const response = await api.post<User>("/register", data);
    return response.data;
}