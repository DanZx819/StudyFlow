"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import {
  Flame,
  Clock,
  BookOpen,
  CheckCircle,
  Calendar,
  GraduationCap,
  BarChart3,
} from "lucide-react";
import { User } from "@/types/User";
import getUser from "@/services/userService";
import { getStats, Stats } from "@/services/studySessionService";
import styles from "./styles.module.css";

const PIE_COLORS = ["#5B40C2", "#5A86E0", "#F08C5C", "#EFC069", "#3F2A8E"];

const WEEKDAYS_SHORT: Record<string, string> = {
  "0": "Dom",
  "1": "Seg",
  "2": "Ter",
  "3": "Qua",
  "4": "Qui",
  "5": "Sex",
  "6": "Sab",
};

function formatDate(dateStr: string): string {
  const date = new Date(dateStr + "T12:00:00");
  const day = date.getDate();
  const weekday = WEEKDAYS_SHORT[String(date.getDay())] || "";
  return `${weekday} ${day}`;
}

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Bom dia";
  if (hour < 18) return "Boa tarde";
  return "Boa noite";
}

function getFormattedDate(): string {
  return new Date().toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loadingStats, setLoadingStats] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const [userData, statsData] = await Promise.all([
          getUser(),
          getStats(),
        ]);
        if (userData) setUser(userData);
        setStats(statsData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingStats(false);
      }
    }
    load();
  }, []);

  const sessoesPorDia = (stats?.sessoes_por_dia || []).map((d) => ({
    name: formatDate(d.data),
    sessoes: d.total,
  }));

  const tempoPorDia = (stats?.tempo_por_dia || []).map((d) => ({
    name: formatDate(d.data),
    minutos: Math.round(d.minutos),
  }));

  const porMateria = (stats?.por_materia || []).map((d) => ({
    name: d.materia,
    value: d.total,
  }));

  if (loadingStats) {
    return (
      <div className={styles.loading}>Carregando dashboard...</div>
    );
  }

  return (
    <div className={styles.container}>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.greeting}>
            {getGreeting()}, {user?.name ?? "estudante"}!
          </h1>
          <p className={styles.heroSubtitle}>
            Pronto para continuar sua evolucao hoje?
          </p>
          <p className={styles.heroDate}>{getFormattedDate()}</p>
        </div>
      </section>

      {/* Stats cards */}
      <section className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={`${styles.statIcon} ${styles.statIconWarm}`}>
            <Flame size={20} />
          </div>
          <div className={styles.statInfo}>
            <span className={styles.statValue}>{stats?.sequencia ?? 0}</span>
            <span className={styles.statLabel}>Sequencia</span>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={`${styles.statIcon} ${styles.statIconPrimary}`}>
            <CheckCircle size={20} />
          </div>
          <div className={styles.statInfo}>
            <span className={styles.statValue}>{stats?.total_sessoes ?? 0}</span>
            <span className={styles.statLabel}>Sessoes</span>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={`${styles.statIcon} ${styles.statIconSecondary}`}>
            <Clock size={20} />
          </div>
          <div className={styles.statInfo}>
            <span className={styles.statValue}>{stats?.total_minutos ?? 0}m</span>
            <span className={styles.statLabel}>Estudados</span>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={`${styles.statIcon} ${styles.statIconPrimary}`}>
            <BookOpen size={20} />
          </div>
          <div className={styles.statInfo}>
            <span className={styles.statValue}>{stats?.total_materias ?? 0}</span>
            <span className={styles.statLabel}>Materias</span>
          </div>
        </div>
      </section>

      {/* Charts */}
      <section className={styles.chartsGrid}>
        <div className={styles.chartCard}>
          <h3 className={styles.chartTitle}>Sessoes nos ultimos 7 dias</h3>
          <div className={styles.chartWrap}>
            {sessoesPorDia.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={sessoesPorDia}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                  <XAxis dataKey="name" tick={{ fontSize: 12, fill: "var(--color-text-muted)" }} />
                  <YAxis allowDecimals={false} tick={{ fontSize: 12, fill: "var(--color-text-muted)" }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--color-card)",
                      border: "1px solid var(--color-border)",
                      borderRadius: 8,
                      fontSize: 13,
                    }}
                  />
                  <Bar dataKey="sessoes" fill="#5B40C2" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <p style={{ color: "var(--color-text-muted)", textAlign: "center", paddingTop: "4rem", fontSize: "0.9rem" }}>
                Nenhuma sessao registrada ainda.
              </p>
            )}
          </div>
        </div>

        <div className={styles.chartCard}>
          <h3 className={styles.chartTitle}>Tempo de estudo (minutos)</h3>
          <div className={styles.chartWrap}>
            {tempoPorDia.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={tempoPorDia}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                  <XAxis dataKey="name" tick={{ fontSize: 12, fill: "var(--color-text-muted)" }} />
                  <YAxis tick={{ fontSize: 12, fill: "var(--color-text-muted)" }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--color-card)",
                      border: "1px solid var(--color-border)",
                      borderRadius: 8,
                      fontSize: 13,
                    }}
                    formatter={(value: number) => [`${value} min`, "Tempo"]}
                  />
                  <Bar dataKey="minutos" fill="#F08C5C" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <p style={{ color: "var(--color-text-muted)", textAlign: "center", paddingTop: "4rem", fontSize: "0.9rem" }}>
                Nenhum dado de tempo ainda.
              </p>
            )}
          </div>
        </div>

        <div className={styles.chartCard} style={{ gridColumn: "1 / -1" }}>
          <h3 className={styles.chartTitle}>Sessoes por materia</h3>
          <div className={styles.chartWrap}>
            {porMateria.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={porMateria}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label={({ name, percent }) =>
                      `${name} (${(percent * 100).toFixed(0)}%)`
                    }
                    labelLine={false}
                  >
                    {porMateria.map((_, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={PIE_COLORS[index % PIE_COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--color-card)",
                      border: "1px solid var(--color-border)",
                      borderRadius: 8,
                      fontSize: 13,
                    }}
                  />
                  <Legend
                    wrapperStyle={{ fontSize: 13 }}
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <p style={{ color: "var(--color-text-muted)", textAlign: "center", paddingTop: "4rem", fontSize: "0.9rem" }}>
                Nenhuma materia estudada ainda.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Quick links */}
      <section className={styles.quickLinks}>
        <div className={styles.quickCard}>
          <div className={styles.quickCardIcon}>
            <Calendar size={20} />
          </div>
          <h3 className={styles.quickCardTitle}>Minha Rotina</h3>
          <p className={styles.quickCardDesc}>Organize seus horarios de estudo</p>
          <Link href="/rotina" className={styles.quickCardLink}>Acessar</Link>
        </div>

        <div className={styles.quickCard}>
          <div className={styles.quickCardIcon}>
            <GraduationCap size={20} />
          </div>
          <h3 className={styles.quickCardTitle}>Materias</h3>
          <p className={styles.quickCardDesc}>Acompanhe o que voce esta estudando</p>
          <Link href="/materias" className={styles.quickCardLink}>Ver materias</Link>
        </div>

        <div className={styles.quickCard}>
          <div className={styles.quickCardIcon}>
            <BarChart3 size={20} />
          </div>
          <h3 className={styles.quickCardTitle}>Progresso</h3>
          <p className={styles.quickCardDesc}>Inicie sessoes e acompanhe seu desempenho</p>
          <Link href="/progresso" className={styles.quickCardLink}>Ver progresso</Link>
        </div>
      </section>
    </div>
  );
}
