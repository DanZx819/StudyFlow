"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Flame, Calendar, CheckCircle } from "lucide-react";
import { Routine, RoutineSlot } from "@/types/Routine";
import { StudySession } from "@/types/StudySession";
import { getRoutines } from "@/services/routineService";
import getUser from "@/services/userService";
import {
  getTodaySessions,
  startSession,
  completeSession,
} from "@/services/studySessionService";
import styles from "./styles.module.css";

const DAYS_SHORT = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"];
const CALENDAR_OPTIONS = [7, 14, 21, 30];

function getCalendarDays(totalDays: number): Date[] {
  const today = new Date();
  const half = Math.floor(totalDays / 2);
  const start = new Date(today);
  start.setDate(today.getDate() - half);

  return Array.from({ length: totalDays }, (_, i) => {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    return d;
  });
}

function formatTimer(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  if (h > 0) return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

function getSlotSubjectName(slot: RoutineSlot): string {
  if (slot.subject?.title) return slot.subject.title;
  if (slot.subject_title) return slot.subject_title;
  return `Materia ${slot.subject_id}`;
}

export default function Progresso() {
  const [routines, setRoutines] = useState<Routine[]>([]);
  const [sessions, setSessions] = useState<StudySession[]>([]);
  const [selectedDay, setSelectedDay] = useState<number>(new Date().getDay());
  const [sequencia, setSequencia] = useState<number>(0);
  const [activeTimers, setActiveTimers] = useState<Record<number, number>>({});
  const [loading, setLoading] = useState<Record<number, boolean>>({});
  const [calendarDays, setCalendarDays] = useState<number>(7);
  const intervalsRef = useRef<Record<number, NodeJS.Timeout>>({});

  const days = getCalendarDays(calendarDays);
  const todayDate = new Date();
  const today = todayDate.getDay();

  // Carregar rotinas, sessoes e streak do usuario
  useEffect(() => {
    async function load() {
      try {
        const [rotinasData, sessoesData, userData] = await Promise.all([
          getRoutines(),
          getTodaySessions(),
          getUser(),
        ]);
        setRoutines(rotinasData);
        setSessions(sessoesData);
        if (userData) setSequencia(userData.sequencia);
      } catch (error) {
        console.error(error);
      }
    }
    load();
  }, []);

  // Retomar timers de sessoes ativas ao carregar
  useEffect(() => {
    sessions.forEach((session) => {
      if (session.started_at && !session.completed_at) {
        const startedAt = new Date(session.started_at).getTime();
        const now = Date.now();
        const elapsed = Math.floor((now - startedAt) / 1000);
        setActiveTimers((prev) => ({ ...prev, [session.routine_slot_id]: elapsed }));
        startTimerInterval(session.routine_slot_id, elapsed);
      }
    });

    return () => {
      Object.values(intervalsRef.current).forEach(clearInterval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessions.length]);

  const startTimerInterval = useCallback((slotId: number, initialSeconds: number) => {
    if (intervalsRef.current[slotId]) clearInterval(intervalsRef.current[slotId]);

    let seconds = initialSeconds;
    intervalsRef.current[slotId] = setInterval(() => {
      seconds++;
      setActiveTimers((prev) => ({ ...prev, [slotId]: seconds }));
    }, 1000);
  }, []);

  // Rotina do dia selecionado
  const dayRoutine = routines.find((r) => r.day_of_week === selectedDay);

  // Verificar se um slot tem sessao
  function getSessionForSlot(slotId: number): StudySession | undefined {
    return sessions.find((s) => s.routine_slot_id === slotId);
  }

  // Iniciar estudo
  async function handleStart(slot: RoutineSlot) {
    setLoading((prev) => ({ ...prev, [slot.id]: true }));
    try {
      const session = await startSession(slot.id);
      setSessions((prev) => [...prev, session]);
      setActiveTimers((prev) => ({ ...prev, [slot.id]: 0 }));
      startTimerInterval(slot.id, 0);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading((prev) => ({ ...prev, [slot.id]: false }));
    }
  }

  // Completar estudo
  async function handleComplete(slot: RoutineSlot) {
    const session = getSessionForSlot(slot.id);
    if (!session) return;

    setLoading((prev) => ({ ...prev, [slot.id]: true }));
    try {
      const result = await completeSession(session.id);
      setSessions((prev) =>
        prev.map((s) => (s.id === session.id ? result.sessao : s))
      );
      setSequencia(result.sequencia);

      // Parar timer
      if (intervalsRef.current[slot.id]) {
        clearInterval(intervalsRef.current[slot.id]);
        delete intervalsRef.current[slot.id];
      }
      setActiveTimers((prev) => {
        const next = { ...prev };
        delete next[slot.id];
        return next;
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading((prev) => ({ ...prev, [slot.id]: false }));
    }
  }

  // Dias que tem rotina
  const routineDays = new Set(routines.map((r) => r.day_of_week));

  return (
    <main className={styles.page}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.heading}>
          <h1 className={styles.title}>Progresso</h1>
          <span className={styles.subtitle}>
            Acompanhe seus estudos e mantenha sua sequencia
          </span>
        </div>

        <div className={styles.streakBadge}>
          <Flame size={18} />
          <span>{sequencia} dias</span>
        </div>
      </header>

      {/* Seletor de dias */}
      <div className={styles.calendarOptions}>
        {CALENDAR_OPTIONS.map((opt) => (
          <button
            key={opt}
            className={`${styles.calendarOptionBtn} ${calendarDays === opt ? styles.calendarOptionActive : ""}`}
            onClick={() => setCalendarDays(opt)}
            type="button"
          >
            {opt} dias
          </button>
        ))}
      </div>

      {/* Calendario */}
      <div className={styles.calendar}>
        {days.map((date, i) => {
          const dayIndex = date.getDay();
          const isToday =
            date.getDate() === todayDate.getDate() &&
            date.getMonth() === todayDate.getMonth() &&
            date.getFullYear() === todayDate.getFullYear();
          const isSelected = dayIndex === selectedDay;
          const hasRoutine = routineDays.has(dayIndex);

          return (
            <button
              key={i}
              className={`${styles.dayCard} ${isSelected ? styles.dayCardActive : ""} ${isToday ? styles.dayCardToday : ""}`}
              onClick={() => setSelectedDay(dayIndex)}
              type="button"
            >
              <span className={styles.dayName}>{DAYS_SHORT[dayIndex]}</span>
              <span className={styles.dayNumber}>{date.getDate()}</span>
              {hasRoutine && <span className={styles.dayDot} />}
            </button>
          );
        })}
      </div>

      {/* Slots do dia */}
      {dayRoutine ? (
        <>
          <h2 className={styles.sectionTitle}>{dayRoutine.name}</h2>
          <div className={styles.slotsList}>
            {dayRoutine.slots.map((slot) => {
              const session = getSessionForSlot(slot.id);
              const isActive = session && !session.completed_at;
              const isDone = session?.completed_at != null;
              const isToday = selectedDay === today;

              return (
                <div key={slot.id} className={styles.slotCard}>
                  <div className={styles.slotTime}>
                    <span className={styles.slotTimeValue}>
                      {slot.start_time.slice(0, 5)}
                    </span>
                    <span className={styles.slotTimeSeparator}>ate</span>
                    <span className={styles.slotTimeValue}>
                      {slot.end_time.slice(0, 5)}
                    </span>
                  </div>

                  <div className={styles.slotInfo}>
                    <div className={styles.slotSubjectRow}>
                      <span className={styles.slotSubject}>
                        {getSlotSubjectName(slot)}
                      </span>
                      {slot.subject?.imageUrl && (
                        <img
                          src={slot.subject.imageUrl}
                          alt={getSlotSubjectName(slot)}
                          className={styles.slotSubjectImg}
                        />
                      )}
                    </div>
                    <span
                      className={`${styles.slotStatus} ${isActive ? styles.slotStatusActive : ""} ${isDone ? styles.slotStatusDone : ""}`}
                    >
                      {isDone
                        ? "Concluido"
                        : isActive
                          ? "Estudando..."
                          : "Pendente"}
                    </span>
                  </div>

                  {isActive && activeTimers[slot.id] != null && (
                    <span className={styles.timer}>
                      {formatTimer(activeTimers[slot.id])}
                    </span>
                  )}

                  {isToday && !isDone && !isActive && (
                    <button
                      className={styles.startBtn}
                      onClick={() => handleStart(slot)}
                      disabled={loading[slot.id]}
                      type="button"
                    >
                      {loading[slot.id] ? "Iniciando..." : "Iniciar"}
                    </button>
                  )}

                  {isToday && isActive && (
                    <button
                      className={styles.completeBtn}
                      onClick={() => handleComplete(slot)}
                      disabled={loading[slot.id]}
                      type="button"
                    >
                      {loading[slot.id] ? "Salvando..." : "Concluir"}
                    </button>
                  )}

                  {isDone && (
                    <span className={styles.doneTag}>
                      <CheckCircle size={14} style={{ display: "inline", verticalAlign: "middle", marginRight: 4 }} />
                      Feito
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <div className={styles.empty}>
          <Calendar size={48} />
          <p>Nenhuma rotina para este dia.</p>
        </div>
      )}
    </main>
  );
}
