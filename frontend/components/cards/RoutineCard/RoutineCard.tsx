import styles from "./styles.module.css";
import { Pencil, Trash2, Calendar } from "lucide-react";
import { Subject } from "@/types/Subject";

interface Slot {
  subject_id: number;
  subject_title: string;
  start_time: string;
  end_time: string;
}

interface RoutineCardProps {
  id: number;
  name: string;
  day_of_week: number;
  slots: Slot[];
  subjects: Subject[];
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
}

// Garante formato HH:MM (remove segundos se vier "08:00:00")
function formatTime(time: string): string {
  return time.slice(0, 5);
}

export default function RoutineCard({
  id,
  name,
  slots,
  subjects,
  onEdit,
  onDelete,
}: RoutineCardProps) {
  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEdit?.(id);
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete?.(id);
  };

  function getSubjectImage(subjectId: number): string | undefined {
    return subjects.find((s) => s.id === subjectId)?.imageUrl;
  }

  return (
    <div className={styles.container}>
      {/* Header com nome do dia */}
      <div className={styles.cardHeader}>
        <span className={styles.dayBadge}>
          <Calendar size={16} />
          {name}
        </span>

        <div className={styles.actionButtons}>
          <button
            className={`${styles.actionBtn} ${styles.editBtn}`}
            onClick={handleEditClick}
            aria-label="Editar rotina"
          >
            <Pencil size={14} />
          </button>
          <button
            className={`${styles.actionBtn} ${styles.deleteBtn}`}
            onClick={handleDeleteClick}
            aria-label="Deletar rotina"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>

      {/* Lista de slots */}
      <div className={styles.slotsList}>
        {slots.length === 0 ? (
          <div className={styles.emptySlots}>Nenhum horario cadastrado</div>
        ) : (
          slots.map((slot, index) => {
            const image = getSubjectImage(slot.subject_id);
            return (
              <div key={index} className={styles.slotItem}>
                <div className={styles.slotTime}>
                  <span className={styles.timeStart}>{formatTime(slot.start_time)}</span>
                  <span className={styles.timeSeparator}>ate</span>
                  <span className={styles.timeEnd}>{formatTime(slot.end_time)}</span>
                </div>
                <div className={styles.slotDivider} />
                {image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={image}
                    alt={slot.subject_title}
                    className={styles.slotImage}
                  />
                ) : (
                  <div className={styles.slotImagePlaceholder}>
                    <Calendar size={14} />
                  </div>
                )}
                <span className={styles.slotSubject}>{slot.subject_title}</span>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
