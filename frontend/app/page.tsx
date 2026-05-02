"use client";

import styles from "./styles.module.css";
import Link from "next/link";
import { BookOpen, Flame, Target, TrendingUp, Zap, Clock } from "lucide-react";

export default function LandingPage() {
  return (
    <div className={styles.landing}>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroGlow} />
        <div className={styles.heroContent}>
          <span className={styles.badge}>Organize seus estudos</span>
          <h1 className={styles.heroTitle}>
            Estude com <span className={styles.gradient}>consistencia.</span>
            <br />
            Evolua com <span className={styles.gradient}>clareza.</span>
          </h1>
          <p className={styles.heroDesc}>
            O StudyFlow te ajuda a criar rotinas de estudo, acompanhar seu progresso
            e manter a disciplina para alcancar seus objetivos.
          </p>
          <div className={styles.heroBtns}>
            <Link href="/register" className={styles.btnPrimary}>
              Comecar agora
            </Link>
            <Link href="/login" className={styles.btnSecondary}>
              Ja tenho conta
            </Link>
          </div>
        </div>

        {/* Floating cards */}
        <div className={styles.floatingCards}>
          <div className={`${styles.floatCard} ${styles.float1}`}>
            <Flame size={20} />
            <div>
              <strong>12 dias</strong>
              <span>de sequencia</span>
            </div>
          </div>
          <div className={`${styles.floatCard} ${styles.float2}`}>
            <Target size={20} />
            <div>
              <strong>3 materias</strong>
              <span>em andamento</span>
            </div>
          </div>
          <div className={`${styles.floatCard} ${styles.float3}`}>
            <TrendingUp size={20} />
            <div>
              <strong>+40%</strong>
              <span>de progresso</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className={styles.features}>
        <h2 className={styles.sectionTitle}>Tudo que voce precisa</h2>
        <p className={styles.sectionDesc}>
          Ferramentas simples e poderosas para transformar seus estudos.
        </p>

        <div className={styles.featuresGrid}>
          <div className={styles.feature}>
            <div className={styles.featureIcon}>
              <BookOpen size={24} />
            </div>
            <h3>Materias organizadas</h3>
            <p>Cadastre suas materias com imagens e acompanhe cada uma individualmente.</p>
          </div>

          <div className={styles.feature}>
            <div className={styles.featureIcon}>
              <Clock size={24} />
            </div>
            <h3>Rotina inteligente</h3>
            <p>Monte sua rotina de estudos e receba lembretes para manter o foco.</p>
          </div>

          <div className={styles.feature}>
            <div className={styles.featureIcon}>
              <TrendingUp size={24} />
            </div>
            <h3>Progresso visual</h3>
            <p>Veja graficos e metricas da sua evolucao ao longo do tempo.</p>
          </div>

          <div className={styles.feature}>
            <div className={styles.featureIcon}>
              <Zap size={24} />
            </div>
            <h3>Sequencia de fogo</h3>
            <p>Mantenha sua sequencia diaria e nunca perca a motivacao.</p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className={styles.stats}>
        <div className={styles.stat}>
          <span className={styles.statNumber}>500+</span>
          <span className={styles.statLabel}>Estudantes ativos</span>
        </div>
        <div className={styles.statDivider} />
        <div className={styles.stat}>
          <span className={styles.statNumber}>12k</span>
          <span className={styles.statLabel}>Sessoes concluidas</span>
        </div>
        <div className={styles.statDivider} />
        <div className={styles.stat}>
          <span className={styles.statNumber}>98%</span>
          <span className={styles.statLabel}>Satisfacao</span>
        </div>
      </section>

      {/* CTA */}
      <section className={styles.cta}>
        <div className={styles.ctaGlow} />
        <h2>Pronto para comecar?</h2>
        <p>Crie sua conta gratuita e transforme sua rotina de estudos hoje.</p>
        <Link href="/register" className={styles.btnPrimary}>
          Criar conta gratis
        </Link>
      </section>
    </div>
  );
}
