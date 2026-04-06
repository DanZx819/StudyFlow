export interface User{
    id: number,
    name:string,
    email: string,
    sequencia: number,
    created_at?: string,
    updated_at?: string,
}

export interface RegisterDTO{
    name: string,
    email: string,
    password:string,
}
