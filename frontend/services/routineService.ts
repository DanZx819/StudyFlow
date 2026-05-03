import api from "./api";
import { Routine, RoutinePayload } from "@/types/Routine";

export async function createRoutine(data: RoutinePayload) {
  const response = await api.post("/rotinas", data);
  return response.data;
}

export async function getRoutines() {
  const response = await api.get("/rotinas");
  return response.data;
}

export async function updateRoutine(id: number, data: RoutinePayload) {
  const response = await api.put<Routine>(`/rotinas/${id}`, data);
  return  response.data;
}

export async function deleteRoutine(id: number) {
  const response = await api.delete(`/rotinas/${id}`);
  return response.data;
}