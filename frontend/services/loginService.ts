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

export async function logout() {
  try {
    await api.post("/logout");
  } catch (error) {
    // Se der 401, o token já é inválido, então só ignoramos
    console.log("Token já inválido ou usuário não autenticado");
  } finally {
    // Sempre remove o token, mesmo se a requisição falhar
    localStorage.removeItem("token");
  }
}