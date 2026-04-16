import styles from "./styles.module.css";
import { Pencil, Trash2 } from "lucide-react";

interface LangCardProps {
  id: string | number; // 👈 ID obrigatório
  image?: string;
  title?: string;
  onCreateRoutine?: (id: string | number) => void;
  onEdit?: (id: string | number) => void;
  onDelete?: (id: string | number) => void;
}

function handleModal(){
    console.log("Abrindo Modal");
}

export default function LangCardComponent({
  id,
  image,
  title = "Título do Card",
  onCreateRoutine,
  onEdit,
  onDelete,
}: LangCardProps) {
  
  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEdit?.(id); // 👈 Passa o ID
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete?.(id); // 👈 Passa o ID
  };

  const handleCreateRoutine = (e: React.MouseEvent) => {
    e.stopPropagation();
    onCreateRoutine?.(id); // 👈 Passa o ID
  };

  return (
    <div className={styles.container} onClick={handleModal}>
      <div className={styles.imgWrapper}>
        {image ? (
          <img src={image} alt={title} className={styles.img} />
        ) : (
          <div className={styles.imgPlaceholder}>
            <svg
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="3" width="18" height="18" rx="3" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
          </div>
        )}
        
        {/* Botões de ação */}
        <div className={styles.actionButtons}>
          <button 
            className={`${styles.actionBtn} ${styles.editBtn}`}
            onClick={handleEditClick}
            aria-label="Editar"
          >
            <Pencil size={14} />
          </button>
          <button 
            className={`${styles.actionBtn} ${styles.deleteBtn}`}
            onClick={handleDeleteClick}
            aria-label="Deletar"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>

      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>

        <button className={styles.btn} onClick={handleCreateRoutine}>
          Criar Rotina
        </button>
      </div>
    </div>
  );
}