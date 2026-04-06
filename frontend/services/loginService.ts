import api from "./api";

export interface LoginDTO{
    email: string,
    password: string
}
export interface AuthResponse{
    user:{
        id: number,
        name: string,
        email: string,
    };
    token: string
}

export async function login(data: LoginDTO): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>("/login", data);
    return response.data;
}