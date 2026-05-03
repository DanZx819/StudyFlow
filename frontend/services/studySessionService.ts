import api from "./api";
import { StudySession } from "@/types/StudySession";

export interface Stats {
  sessoes_por_dia: { data: string; total: number }[];
  tempo_por_dia: { data: string; minutos: number }[];
  por_materia: { materia: string; total: number }[];
  total_sessoes: number;
  total_minutos: number;
  total_materias: number;
  sequencia: number;
}

export async function getStats() {
  const response = await api.get<Stats>("/sessoes/stats");
  return response.data;
}

export async function getTodaySessions() {
  const response = await api.get<StudySession[]>("/sessoes");
  return response.data;
}

export async function startSession(routine_slot_id: number) {
  const response = await api.post<StudySession>("/sessoes/iniciar", {
    routine_slot_id,
  });
  return response.data;
}

export async function completeSession(id: number) {
  const response = await api.patch<{
    sessao: StudySession;
    sequencia: number;
  }>(`/sessoes/${id}/completar`);
  return response.data;
}
