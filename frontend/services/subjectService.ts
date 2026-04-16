import api from "./api";

export interface Subject{
  id: number;
  title: string;
  imageUrl?: string;
}

export async function getSubjects(){
    const response = await api.get("/subjects");
    return response.data;
}

export async function createSubject(data: FormData) {
    const response = await api.post<Subject>("/subjects", data, {
        headers:{
            "Content-Type": "multpart/form-data",
        },
    });

    return response.data;
}

export async function updateSubject(data: FormData, id: number) {
    data.append("_method", "PUT");
    const response = await api.post<Subject>(`/subjects/${id}`, data);

    return response.data;
}

export async function deleteSubject(id:number) {
    await api.delete(`subjects/${id}`);
}