"use client";

import { useState, FormEvent, useEffect } from "react";
import { Plus, Trash2, Clock } from "lucide-react";
import { Subject } from "@/types/Subject";
import { Routine, RoutinePayload, RoutineSlotPayload } from "@/types/Routine";
import { getSubjects } from "@/services/subjectService";
import {
  createRoutine,
  getRoutines,
  updateRoutine,
  deleteRoutine,
} from "@/services/routineService";
import styles from "./styles.module.css";
import RoutineCard from "@/components/cards/RoutineCard/RoutineCard";

const DAYS_OF_WEEK = [
  { value: 0, label: "Domingo" },
  { value: 1, label: "Segunda-feira" },
  { value: 2, label: "Terça-feira" },
  { value: 3, label: "Quarta-feira" },
  { value: 4, label: "Quinta-feira" },
  { value: 5, label: "Sexta-feira" },
  { value: 6, label: "Sábado" },
];

interface SlotForm {
  subject_id: string;
  start_time: string;
  end_time: string;
}

function emptySlot(): SlotForm {
  return { subject_id: "", start_time: "", end_time: "" };
}

export default function Rotina() {
  const [modalOpen, setModalOpen] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [name, setName] = useState("");
  const [dayOfWeek, setDayOfWeek] = useState<number>(1);
  const [slots, setSlots] = useState<SlotForm[]>([emptySlot()]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(false);
  const [routines, setRoutines] = useState<Routine[]>([]);
  const [editingRoutine, setEditingRoutine] = useState<Routine | null>(null);
  const [deletingRoutine, setDeletingRoutine] = useState<Routine | null>(null);

  useEffect(() => {
    async function loadSubjects() {
      try {
        const data = await getSubjects();
        setSubjects(data);
      } catch (error) {
        console.error(error);
      }
    }
    async function loadRoutines() {
      try {
        const rotinas = await getRoutines();
        setRoutines(rotinas);
      } catch (error) {
        console.error(error);
      }
    }
    loadRoutines();
    loadSubjects();
  }, []);

  // ── Fechar modais ────────────────────────────────────────────────────────
  function closeModal() {
    setModalOpen(false);
    resetForm();
  }

  function closeEditModal() {
    setEditModal(false);
    setEditingRoutine(null);
    resetForm();
  }

  function closeDeleteModal() {
    setDeleteModal(false);
    setDeletingRoutine(null);
  }

  function resetForm() {
    setName("");
    setDayOfWeek(1);
    setSlots([emptySlot()]);
  }

  // ── Abrir modais ─────────────────────────────────────────────────────────
  function handleEdit(id: number) {
    const routine = routines.find((r) => r.id === id);
    if (!routine) return;

    setEditingRoutine(routine);
    setName(routine.name);
    setDayOfWeek(routine.day_of_week);
    setSlots(
      routine.slots.map((s) => ({
        subject_id: String(s.subject_id),
        start_time: s.start_time.slice(0, 5),
        end_time: s.end_time.slice(0, 5),
      }))
    );
    setEditModal(true);
  }

  function handleDelete(id: number) {
    const routine = routines.find((r) => r.id === id);
    if (!routine) return;

    setDeletingRoutine(routine);
    setDeleteModal(true);
  }

  function handleOverlayClick(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget) closeModal();
  }

  // ── Gerenciar slots ──────────────────────────────────────────────────────
  function addSlot() {
    setSlots((prev) => [...prev, emptySlot()]);
  }

  function removeSlot(index: number) {
    setSlots((prev) => prev.filter((_, i) => i !== index));
  }

  function updateSlot(index: number, field: keyof SlotForm, value: string) {
    setSlots((prev) =>
      prev.map((slot, i) => (i === index ? { ...slot, [field]: value } : slot)),
    );
  }

  // ── Validacao ────────────────────────────────────────────────────────────
  function isFormValid(): boolean {
    if (!name.trim()) return false;
    if (slots.length === 0) return false;
    return slots.every(
      (s) =>
        s.subject_id && s.start_time && s.end_time && s.start_time < s.end_time,
    );
  }

  // ── Montar payload ───────────────────────────────────────────────────────
  function buildPayload(): RoutinePayload {
    return {
      day_of_week: dayOfWeek,
      name,
      slots: slots.map(
        (s): RoutineSlotPayload => ({
          subject_id: Number(s.subject_id),
          start_time: s.start_time,
          end_time: s.end_time,
        }),
      ),
    };
  }

  // ── Submit CRIAR ─────────────────────────────────────────────────────────
  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!isFormValid()) return;

    setLoading(true);
    try {
      const newRoutine = await createRoutine(buildPayload());
      setRoutines((prev) => [newRoutine, ...prev]);
      closeModal();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  // ── Submit EDITAR ────────────────────────────────────────────────────────
  async function handleEditSubmit(e: FormEvent) {
    e.preventDefault();
    if (!editingRoutine || !isFormValid()) return;

    setLoading(true);
    try {
      const updated = await updateRoutine(editingRoutine.id, buildPayload());
      setRoutines((prev) =>
        prev.map((r) => (r.id === editingRoutine.id ? updated : r))
      );
      closeEditModal();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  // ── Submit DELETAR ───────────────────────────────────────────────────────
  async function handleDeleteSubmit(e: FormEvent) {
    e.preventDefault();
    if (!deletingRoutine) return;

    setLoading(true);
    try {
      await deleteRoutine(deletingRoutine.id);
      setRoutines((prev) => prev.filter((r) => r.id !== deletingRoutine.id));
      closeDeleteModal();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  // ── Formulario de slots (reutilizado no criar e editar) ──────────────────
  function renderSlotFields() {
    return (
      <div className={styles.slotsSection}>
        <div className={styles.slotsHeader}>
          <span className={styles.label}>Horarios</span>
          <button
            type="button"
            className={styles.addSlotBtn}
            onClick={addSlot}
          >
            <Plus size={14} />
            Adicionar
          </button>
        </div>

        {slots.map((slot, index) => (
          <div key={index} className={styles.slotCard}>
            <div className={styles.slotField}>
              <span className={styles.slotLabel}>Materia</span>
              <select
                className={styles.slotSelect}
                value={slot.subject_id}
                onChange={(e) =>
                  updateSlot(index, "subject_id", e.target.value)
                }
                required
              >
                <option value="">Selecione uma materia</option>
                {subjects.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.title}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.slotRow}>
              <div className={styles.slotField}>
                <span className={styles.slotLabel}>Inicio</span>
                <input
                  type="time"
                  className={styles.slotInput}
                  value={slot.start_time}
                  onChange={(e) =>
                    updateSlot(index, "start_time", e.target.value)
                  }
                  required
                />
              </div>

              <div className={styles.slotField}>
                <span className={styles.slotLabel}>Fim</span>
                <input
                  type="time"
                  className={styles.slotInput}
                  value={slot.end_time}
                  onChange={(e) =>
                    updateSlot(index, "end_time", e.target.value)
                  }
                  required
                />
              </div>

              {slots.length > 1 && (
                <button
                  type="button"
                  className={styles.removeSlotBtn}
                  onClick={() => removeSlot(index)}
                  aria-label="Remover horario"
                >
                  <Trash2 size={14} />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  }

  function renderDaySelect(id: string) {
    return (
      <div className={styles.field}>
        <label className={styles.label} htmlFor={id}>
          Dia da semana
        </label>
        <select
          id={id}
          className={styles.select}
          value={dayOfWeek}
          onChange={(e) => setDayOfWeek(Number(e.target.value))}
          required
        >
          {DAYS_OF_WEEK.map((d) => (
            <option key={d.value} value={d.value}>
              {d.label}
            </option>
          ))}
        </select>
      </div>
    );
  }

  return (
    <main className={styles.page}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.heading}>
          <h1 className={styles.title}>Rotina</h1>
          <span className={styles.subtitle}>
            Monte sua rotina semanal de estudos
          </span>
        </div>

        <button
          className={styles.addBtn}
          onClick={() => setModalOpen(true)}
          aria-label="Criar rotina"
          type="button"
        >
          <Plus />
        </button>
      </header>

      <section className={styles.grid}>
        {routines.length > 0 ? (
          routines.map((r) => (
            <RoutineCard
              key={r.id}
              id={r.id}
              name={r.name}
              day_of_week={r.day_of_week}
              slots={r.slots}
              subjects={subjects}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))
        ) : (
          <div className={styles.empty}>
            <Clock size={48} />
            <p>Nenhuma rotina criada. Clique no + para comecar!</p>
          </div>
        )}
      </section>

      {/* Modal de CRIACAO */}
      {modalOpen && (
        <div className={styles.overlay} onClick={handleOverlayClick}>
          <div className={styles.modal} role="dialog" aria-modal="true">
            <div className={styles.modalHeader}>
              <h2 className={styles.modalTitle}>Nova Rotina</h2>
              <button
                className={styles.closeBtn}
                onClick={closeModal}
                type="button"
                aria-label="Fechar"
              >
                ✕
              </button>
            </div>

            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="routine-name">
                  Nome
                </label>
                <input
                  id="routine-name"
                  className={styles.input}
                  type="text"
                  placeholder="Ex: Rotina de Segunda"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              {renderSlotFields()}
              {renderDaySelect("routine-day")}

              <button
                className={styles.submitBtn}
                type="submit"
                disabled={loading || !isFormValid()}
              >
                {loading ? "Salvando..." : "Criar Rotina"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Modal de EDICAO */}
      {editModal && editingRoutine && (
        <div
          className={styles.overlay}
          onClick={(e) => {
            if (e.target === e.currentTarget) closeEditModal();
          }}
        >
          <div className={styles.modal} role="dialog" aria-modal="true">
            <div className={styles.modalHeader}>
              <h2 className={styles.modalTitle}>
                Editar: {editingRoutine.name}
              </h2>
              <button
                className={styles.closeBtn}
                onClick={closeEditModal}
                type="button"
                aria-label="Fechar"
              >
                ✕
              </button>
            </div>

            <form className={styles.form} onSubmit={handleEditSubmit}>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="edit-routine-name">
                  Nome
                </label>
                <input
                  id="edit-routine-name"
                  className={styles.input}
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              {renderSlotFields()}
              {renderDaySelect("edit-routine-day")}

              <button
                className={styles.submitBtn}
                type="submit"
                disabled={loading || !isFormValid()}
              >
                {loading ? "Salvando..." : "Salvar alteracoes"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Modal de EXCLUSAO */}
      {deleteModal && deletingRoutine && (
        <div
          className={styles.overlay}
          onClick={(e) => {
            if (e.target === e.currentTarget) closeDeleteModal();
          }}
        >
          <div className={styles.modal} role="dialog" aria-modal="true">
            <div className={styles.modalHeader}>
              <h2 className={styles.modalTitle}>Deletar rotina</h2>
              <button
                className={styles.closeBtn}
                onClick={closeDeleteModal}
                type="button"
                aria-label="Fechar"
              >
                ✕
              </button>
            </div>

            <form className={styles.form} onSubmit={handleDeleteSubmit}>
              <p className={styles.deleteText}>
                Tem certeza que deseja deletar a rotina{" "}
                <strong>{deletingRoutine.name}</strong>?
              </p>

              <div className={styles.deleteActions}>
                <button
                  type="button"
                  className={styles.cancelBtn}
                  onClick={closeDeleteModal}
                >
                  Cancelar
                </button>
                <button
                  className={styles.deleteBtnConfirm}
                  type="submit"
                  disabled={loading}
                >
                  {loading ? "Deletando..." : "Deletar"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
