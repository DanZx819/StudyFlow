"use client";

import styles from "./styles.module.css";
import Link from "next/link";
import { BookOpen, Clock, TrendingUp, Flame } from "lucide-react";
import SparkLogo from "@/components/brand/SparkLogo";
import { useEffect, useState } from "react";

/* ── Contagem animada ─────────────────────────────────────────────────────── */
function AnimatedNumber({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    let current = 0;
    const step = Math.max(1, Math.floor(target / 14));
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      setValue(current);
    }, 80);
    return () => clearInterval(timer);
  }, [target]);
  return <>{value}{suffix}</>;
}

/* ── Feature data ─────────────────────────────────────────────────────────── */
const features = [
  {
    title: "Matérias organizadas",
    desc: "Cadastre suas matérias com imagens e acompanhe cada uma individualmente.",
    icon: <BookOpen size={28} />,
    tint: "blue" as const,
  },
  {
    title: "Rotina inteligente",
    desc: "Monte sua rotina de estudos e receba lembretes para manter o foco.",
    icon: <Clock size={28} />,
    tint: "purple" as const,
  },
  {
    title: "Progresso visual",
    desc: "Veja gráficos e métricas da sua evolução ao longo do tempo.",
    icon: <TrendingUp size={28} />,
    tint: "teal" as const,
  },
  {
    title: "Sequência de fogo",
    desc: "Mantenha sua sequência diária e nunca perca a motivação.",
    icon: <Flame size={28} />,
    tint: "coral" as const,
  },
];

export default function LandingPage() {
  return (
    <div className={styles.landing}>
      {/* ═══════ HERO ═══════ */}
      <section className={styles.hero}>
        <div className={styles.heroSparkles}>
          <span className={styles.sparkle} style={{ top: "12%", left: "8%" }} />
          <span className={styles.sparkle} style={{ top: "28%", left: "46%", animationDelay: "0.6s" }} />
          <span className={styles.sparkle} style={{ top: "70%", left: "4%", animationDelay: "1.1s" }} />
          <span className={styles.sparkle} style={{ top: "15%", right: "6%", animationDelay: "0.3s" }} />
        </div>

        <div className={styles.heroGrid}>
          {/* Coluna texto */}
          <div className={styles.heroText}>
            <div className={styles.heroBadge}>
              <span className={styles.badgeDot} />
              Mais de 500 estudantes ativos hoje
            </div>

            <h1 className={styles.heroTitle}>
              Estude com<br />
              <span className={styles.gradientPurple}>consistência.</span><br />
              Evolua com<br />
              <span className={styles.gradientCoral}>clareza.</span>
            </h1>

            <p className={styles.heroDesc}>
              O StudyFlow te ajuda a criar rotinas de estudo, acompanhar seu progresso
              e manter a disciplina para alcançar seus objetivos.
            </p>

            <div className={styles.heroBtns}>
              <Link href="/register" className={styles.btnPrimary}>
                Começar agora
                <span className={styles.btnArrow}>→</span>
              </Link>
              <Link href="/login" className={styles.btnSecondary}>
                Já tenho conta
              </Link>
            </div>

            {/* Stats inline */}
            <div className={styles.heroStats}>
              <div className={styles.heroStat}>
                <div className={`${styles.heroStatNumber} ${styles.coral}`}>
                  <AnimatedNumber target={12} />
                </div>
                <div className={styles.heroStatUnit}>dias</div>
                <div className={styles.heroStatLabel}>de sequência</div>
              </div>
              <div className={styles.heroStatDivider} />
              <div className={styles.heroStat}>
                <div className={`${styles.heroStatNumber} ${styles.blue}`}>3</div>
                <div className={styles.heroStatUnit}>matérias</div>
                <div className={styles.heroStatLabel}>em andamento</div>
              </div>
              <div className={styles.heroStatDivider} />
              <div className={styles.heroStat}>
                <div className={`${styles.heroStatNumber} ${styles.purple}`}>+40%</div>
                <div className={styles.heroStatLabel}>de progresso</div>
              </div>
            </div>
          </div>

          {/* Coluna product mock */}
          <div className={styles.heroMock}>
            <div className={styles.mockGlow} />

            {/* Card principal com Spark */}
            <div className={styles.mockCard}>
              <div className={styles.mockCardHeader}>
                <span className={styles.mockCardLabel}>Sua chama hoje</span>
                <div className={styles.mockAvatar} />
              </div>
              <div className={styles.mockSpark}>
                <SparkLogo size={150} id="hero-spark" />
              </div>
              <div className={styles.mockStreak}>
                12<span className={styles.mockStreakUnit}>dias</span>
              </div>
              <div className={styles.mockStreakText}>Você está num ritmo lindo.</div>
              <div className={styles.mockWeek}>
                {["S", "T", "Q", "Q", "S", "S", "D"].map((d, i) => (
                  <div key={i} className={styles.mockDay}>
                    <div className={`${styles.mockDayBar} ${i < 6 ? styles.mockDayActive : ""}`} />
                    <span>{d}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Pill flutuante: matéria */}
            <div className={`${styles.floatPill} ${styles.pillSubject}`}>
              <div className={styles.pillIcon}>M</div>
              <div>
                <div className={styles.pillTitle}>Matemática</div>
                <div className={styles.pillSub}>3 capítulos · 65%</div>
              </div>
            </div>

            {/* Pill flutuante: lembrete */}
            <div className={`${styles.floatPill} ${styles.pillReminder}`}>
              <span className={styles.reminderDot} />
              <div className={styles.pillTitle}>Estudar Física · 19h</div>
            </div>

            {/* Progress card */}
            <div className={`${styles.floatPill} ${styles.pillProgress}`}>
              <div className={styles.progressLabel}>Esta semana</div>
              <div className={styles.progressNumber}>+40%</div>
              <div className={styles.progressBars}>
                {[24, 38, 30, 52, 44, 60, 56].map((h, i) => (
                  <div
                    key={i}
                    className={`${styles.progressBar} ${i === 6 ? styles.progressBarToday : ""}`}
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
            </div>

            {/* Badge streak */}
            <div className={`${styles.floatPill} ${styles.pillBadge}`}>
              <SparkLogo size={20} variant="mono-light" withSparks={false} id="badge-spark" />
              Streak novo!
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ FEATURES ═══════ */}
      <section className={styles.features} id="features">
        <div className={styles.featuresHeader}>
          <span className={styles.featuresTag}>Recursos</span>
          <h2 className={styles.sectionTitle}>Tudo que você precisa</h2>
          <p className={styles.sectionDesc}>
            Ferramentas simples e poderosas para transformar seus estudos.
          </p>
        </div>

        <div className={styles.featuresGrid}>
          {features.map((f, i) => (
            <div key={i} className={styles.feature}>
              <div className={`${styles.featureIcon} ${styles[f.tint]}`}>
                {f.icon}
              </div>
              <div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════ COMMUNITY STATS ═══════ */}
      <section className={styles.stats} id="numeros">
        <div className={styles.statCard}>
          <span className={`${styles.statNumber} ${styles.purple}`}>500+</span>
          <span className={styles.statLabel}>Estudantes ativos</span>
        </div>
        <div className={styles.statCard}>
          <span className={`${styles.statNumber} ${styles.blue}`}>12k</span>
          <span className={styles.statLabel}>Sessões concluídas</span>
        </div>
        <div className={styles.statCard}>
          <span className={`${styles.statNumber} ${styles.coral}`}>98%</span>
          <span className={styles.statLabel}>Satisfação</span>
        </div>
      </section>

      {/* ═══════ CTA ═══════ */}
      <section className={styles.cta} id="cta">
        <div className={styles.ctaOverlay1} />
        <div className={styles.ctaOverlay2} />
        <div className={styles.ctaContent}>
          <div className={styles.ctaSpark}>
            <SparkLogo size={100} id="cta-spark" />
          </div>
          <h2>Pronto para começar?</h2>
          <p>Crie sua conta gratuita e transforme sua rotina de estudos hoje.</p>
          <Link href="/register" className={styles.ctaBtn}>
            Criar conta grátis
            <span className={styles.btnArrow}>→</span>
          </Link>
          <div className={styles.ctaNote}>
            Sem cartão de crédito · Cancele quando quiser
          </div>
        </div>
      </section>
    </div>
  );
}
