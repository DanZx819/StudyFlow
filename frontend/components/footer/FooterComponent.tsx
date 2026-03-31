import { navLinks } from "../header/navigation";
import styles from "./styles.module.css";

export default function FooterComponent() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        
        {/* Logo / Nome */}
        <div className={styles.brand}>
          <h2>StudyFlow</h2>
          <p>Organize sua rotina de estudos </p>
        </div>

        {/* Links */}
        <div className={styles.links}>
          {navLinks.map((link) => (
            <a key={link.href} href={link.href}>
              {link.name}
            </a>
          ))}
        </div>

        {/* Copyright */}
        <div className={styles.copy}>
          <p>© {new Date().getFullYear()} - Todos os direitos reservados</p>
        </div>

      </div>
    </footer>
  );
}