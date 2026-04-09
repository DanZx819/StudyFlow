import styles from "./styles.module.css";

interface LangCardProps {
  image?: string;
  title?: string;
  onCreateRoutine?: () => void;
}

function handleModal(){
    console.log("Abrindo Modal");
}

export default function LangCardComponent({
  image,
  title = "Título do Card",
  onCreateRoutine,
}: LangCardProps) {
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
      </div>

      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>

        <button className={styles.btn} onClick={onCreateRoutine}>
          Criar Rotina
        </button>
      </div>
    </div>
  );
}