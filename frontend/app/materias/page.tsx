"use client";

import { useState, useRef, ChangeEvent, FormEvent, useEffect } from "react";
import { Subject } from "@/types/Subject";
import LangCardComponent from "@/components/cards/LangCard/LangCard";
import styles from "./styles.module.css";
import {
  createSubject,
  deleteSubject,
  getSubjects,
  updateSubject,
} from "@/services/subjectService";
import { Plus } from "lucide-react";

// ── Ícone de livro (empty state) ─────────────────────────────────────────────
function BookIcon() {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
  );
}

// ── Ícone de upload ──────────────────────────────────────────────────────────
function UploadIcon() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="16 16 12 12 8 16" />
      <line x1="12" y1="12" x2="12" y2="21" />
      <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
    </svg>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default function Linguagens() {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  // 👇 Estado para guardar qual matéria está sendo editada
  const [editingSubject, setEditingSubject] = useState<Subject | null>(null);

  const [deletingSubject, setDeleteSubject] = useState<Subject | null>(null);

  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    async function loadSubject() {
      try {
        const data = await getSubjects();
        setSubjects(data);
      } catch (error: unknown) {
        console.log(error);
      }
    }
    loadSubject();
  }, []);

  // ── Seleciona imagem e gera preview ────────────────────────────────────────
  function handleFile(e: ChangeEvent<HTMLInputElement>) {
    const picked = e.target.files?.[0];
    if (!picked) return;
    setFile(picked);
    setPreview(URL.createObjectURL(picked));
  }

  // ── Handler de EDITAR (recebe o ID) ────────────────────────────────────────
  function handleEdit(subjectId: string | number) {
    // Encontra a matéria pelo ID
    const subject = subjects.find((s) => s.id === subjectId);
    if (!subject) return;

    // Preenche o formulário com os dados atuais
    setEditingSubject(subject);
    setTitle(subject.title);
    setPreview(subject.imageUrl || null);
    setEditModal(true);
  }

  // ── Handler de DELETAR (recebe o ID) ───────────────────────────────────────
  async function handleDelete(subjectId: string | number) {
    const subject = subjects.find((s) => s.id === subjectId);

    if (!subject) return;

    setDeleteSubject(subject);
    setTitle(subject.title);
    setPreview(subject.imageUrl || null);
    setDeleteModal(true);
  }

  // ── Handler de CRIAR ROTINA (recebe o ID) ──────────────────────────────────
  function handleCreateRoutine(subjectId: string | number) {
    const subject = subjects.find((s) => s.id === subjectId);
    console.log("Criar rotina para:", subject?.title);
    // Aqui você pode redirecionar ou abrir outro modal
    // router.push(`/rotina/criar?subjectId=${subjectId}`)
  }

  // ── Fecha e limpa o modal de edição ────────────────────────────────────────
  function closeEditModal() {
    setEditModal(false);
    setEditingSubject(null);
    setTitle("");
    setPreview(null);
    setFile(null);
  }

  function closeDeleteModal() {
    setDeleteModal(false);
    setDeleteSubject(null);
    setTitle("");
    setPreview(null);
  }

  // ── Fecha e limpa o modal de criar ─────────────────────────────────────────
  function closeModal() {
    setModalOpen(false);
    setTitle("");
    setPreview(null);
    setFile(null);
  }

  // ── Fecha ao clicar no overlay (fora do modal) ─────────────────────────────
  function handleOverlayClick(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget) closeModal();
  }

  // ── Submit do CREATE ───────────────────────────────────────────────────────
  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!title.trim()) return;

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("title", title.trim());
      if (file) formData.append("image", file);

      const newSubject = await createSubject(formData);

      setSubjects((prev) => [newSubject, ...prev]);
      closeModal();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  // ── Submit do EDIT ─────────────────────────────────────────────────────────
  async function handleEditSubmit(e: FormEvent, id: number) {
    e.preventDefault();

    if (!title.trim()) return;

    setLoading(true);

    try {
      const formData = new FormData();

      formData.append("title", title);

      if (file) formData.append("image", file);

      formData.append("_method", "PUT");

      const editSubject = await updateSubject(formData, id);

      setSubjects((prev) => prev.map((s) => (s.id === id ? editSubject : s)));

      closeEditModal();

      setTitle("");
      setFile(null);
    } catch (error: unknown) {

      console.error(error);

    } finally {
      setLoading(false);
    }
  }
// ── Submit do Delete ─────────────────────────────────────────────────────────
  async function handleDeleteSubmit(e: FormEvent, id: number) {
    e.preventDefault();
    setLoading(true);
    try{

      await deleteSubject(id);
      setSubjects((prev) => prev.filter((s) => s.id !== id));
      closeDeleteModal();

    } catch (error: unknown) {

      console.error(error);
      
    } finally {
      setLoading(false);
    }
  }

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <main className={styles.page}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.heading}>
          <h1 className={styles.title}>Matérias</h1>
          <span className={styles.subtitle}>
            Organize seus estudos por área
          </span>
        </div>

        <button
          className={styles.addBtn}
          onClick={() => setModalOpen(true)}
          aria-label="Adicionar matéria"
          type="button"
        >
          <Plus/>
        </button>
      </header>

      {/* Grid de cards */}
      <section className={styles.grid}>
        {subjects.length === 0 ? (
          <div className={styles.empty}>
            <BookIcon />
            <p>Nenhuma matéria ainda. Clique no + para criar!</p>
          </div>
        ) : (
          subjects.map((s) => (
            <LangCardComponent
              key={s.id}
              id={s.id}
              image={s.imageUrl}
              title={s.title}
              onEdit={handleEdit} 
              onDelete={handleDelete} 
              onCreateRoutine={handleCreateRoutine} 
            />
          ))
        )}
      </section>

      {/*Modal de Exclusão */}
      {deleteModal && deletingSubject && (
        <div
          className={styles.overlay}
          onClick={(e) => {
            if (e.target === e.currentTarget) closeDeleteModal();
          }}
        >
          <div className={styles.modal} role="dialog" aria-modal="true">
            <div className={styles.modalHeader}>
              <h2 className={styles.modalTitle}>
                Deletar matéria: {deletingSubject.title}
              </h2>
              <button
                className={styles.closeBtn}
                onClick={closeDeleteModal}
                type="button"
                aria-label="Fechar"
              >
                ✕
              </button>
            </div>

            <form className={styles.form} onSubmit={(e) => handleDeleteSubmit(e, deletingSubject.id)}>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="edit-title">
                  Título
                </label>
                <input
                  id="edit-title"
                  className={styles.input}
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  disabled
                />

                <div className={styles.field}>
                  <label className={styles.label}>Imagem</label>
                  <div
                    className={styles.uploadArea}
                    onClick={() => fileRef.current?.click()}
                  >
                    <input
                      ref={fileRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFile}
                      style={{ display: "none" }}
                      disabled
                    />

                    {preview ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={preview}
                        alt="Preview"
                        className={styles.uploadPreview}
                      />
                    ) : (
                      <>
                        <UploadIcon />
                        <span className={styles.uploadText}>
                          Imagem
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <button
                className={styles.deleteBtn}
                type="submit"
                disabled={loading || !title.trim()}
              >
                {loading ? "Deletando..." : "Deletar"}
              </button>
            </form>
          </div>
        </div>
      )}
      {/* Modal de EDIÇÃO */}
      {editModal && editingSubject && (
        <div
          className={styles.overlay}
          onClick={(e) => {
            if (e.target === e.currentTarget) closeEditModal();
          }}
        >
          <div className={styles.modal} role="dialog" aria-modal="true">
            <div className={styles.modalHeader}>
              <h2 className={styles.modalTitle}>
                Editar matéria: {editingSubject.title}
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

            <form
              className={styles.form}
              onSubmit={(e) => handleEditSubmit(e, editingSubject.id)}
            >
              <div className={styles.field}>
                <label className={styles.label} htmlFor="edit-title">
                  Título
                </label>
                <input
                  id="edit-title"
                  className={styles.input}
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              {/* Upload de nova imagem (opcional) */}
              <div className={styles.field}>
                <label className={styles.label}>Imagem</label>
                <div
                  className={styles.uploadArea}
                  onClick={() => fileRef.current?.click()}
                >
                  <input
                    ref={fileRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFile}
                    style={{ display: "none" }}
                  />

                  {preview ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={preview}
                      alt="Preview"
                      className={styles.uploadPreview}
                    />
                  ) : (
                    <>
                      <UploadIcon />
                      <span className={styles.uploadText}>
                        Clique para alterar a imagem
                      </span>
                    </>
                  )}
                </div>
              </div>

              <button
                className={styles.submitBtn}
                type="submit"
                disabled={loading || !title.trim()}
              >
                {loading ? "Salvando…" : "Salvar alterações"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Modal de CRIAÇÃO */}
      {modalOpen && (
        <div className={styles.overlay} onClick={handleOverlayClick}>
          <div className={styles.modal} role="dialog" aria-modal="true">
            <div className={styles.modalHeader}>
              <h2 className={styles.modalTitle}>Nova Matéria</h2>
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
                <label className={styles.label} htmlFor="subject-title">
                  Título
                </label>
                <input
                  id="subject-title"
                  className={styles.input}
                  type="text"
                  placeholder="Ex: Algoritmos, Banco de Dados…"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div className={styles.field}>
                <label className={styles.label}>Imagem</label>
                <div
                  className={styles.uploadArea}
                  onClick={() => fileRef.current?.click()}
                >
                  <input
                    ref={fileRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFile}
                    style={{ display: "none" }}
                  />

                  {preview ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={preview}
                      alt="Preview"
                      className={styles.uploadPreview}
                    />
                  ) : (
                    <>
                      <UploadIcon />
                      <span className={styles.uploadText}>
                        Clique para selecionar uma imagem
                      </span>
                    </>
                  )}
                </div>
              </div>

              <button
                className={styles.submitBtn}
                type="submit"
                disabled={loading || !title.trim()}
              >
                {loading ? "Salvando…" : "Criar Matéria"}
              </button>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
