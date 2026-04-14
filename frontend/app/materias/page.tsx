"use client";

import { useState, useRef, ChangeEvent, FormEvent, useEffect } from "react";
import { Subject } from "@/types/Subject";
import LangCardComponent from "@/components/cards/LangCard/LangCard";
import styles from "./styles.module.css";
import { createSubject, getSubjects } from "@/services/subjectService";

// ── Tipos ────────────────────────────────────────────────────────────────────


// ── Ícone de livro (empty state) ─────────────────────────────────────────────
function BookIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
  );
}

// ── Ícone de upload ──────────────────────────────────────────────────────────
function UploadIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 16 12 12 8 16" />
      <line x1="12" y1="12" x2="12" y2="21" />
      <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
    </svg>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default function Linguagens() {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [editModal, setEditModal] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);


  useEffect(() =>{
    async function loadSubject(){
        try{
            const data = await getSubjects();
            console.log(data)
            setSubjects(data)
        }catch (error: unknown){
            console.log(error);
        }
    }

    loadSubject();
  }, [])
  // ── Seleciona imagem e gera preview ────────────────────────────────────────
  function handleFile(e: ChangeEvent<HTMLInputElement>) {
    const picked = e.target.files?.[0];
    if (!picked) return;
    setFile(picked);
    setPreview(URL.createObjectURL(picked));
  }
  function handleEditSubmit(e: FormEvent){
    e.preventDefault();
  }

  function closeEditModal(){
    setEditModal(false);
  }

  // ── Fecha e limpa o modal ──────────────────────────────────────────────────
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

  // ── Submit → POST /api/subjects ────────────────────────────────────────────
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

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <main className={styles.page}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.heading}>
          <h1 className={styles.title}>Matérias</h1>
          <span className={styles.subtitle}>Organize seus estudos por área</span>
        </div>

        <button
          className={styles.addBtn}
          onClick={() => setModalOpen(true)}
          aria-label="Adicionar matéria"
          type="button"
        >
          +
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
              image={s.imageUrl}
              title={s.title}
              onEdit={() =>{
                setEditModal(true);
              }}
            />
          ))
        )}
      </section>

      {/* Modal */}
      {editModal && (
        <div className={styles.overlay} onClick={(e) => { if (e.target === e.currentTarget) closeEditModal(); }}>
          <div className={styles.modal} role="dialog" aria-modal="true">

            <div className={styles.modalHeader}>
              <h2 className={styles.modalTitle}>Editar matéria</h2>
              <button className={styles.closeBtn} onClick={closeEditModal} type="button" aria-label="Fechar">✕</button>
            </div>

            <form className={styles.form} onSubmit={handleEditSubmit}>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="edit-title">Título</label>
                <input
                  id="edit-title"
                  className={styles.input}
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <button className={styles.submitBtn} type="submit" disabled={loading || !title.trim()}>
                {loading ? "Salvando…" : "Salvar alterações"}
              </button>
            </form>

          </div>
        </div>
      )}
      {modalOpen && (
        <div className={styles.overlay} onClick={handleOverlayClick}>
          <div className={styles.modal} role="dialog" aria-modal="true">
            {/* Cabeçalho do modal */}
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

            {/* Formulário */}
            <form className={styles.form} onSubmit={handleSubmit}>
              {/* Título */}
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

              {/* Imagem */}
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