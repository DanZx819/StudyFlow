import { Inter } from "next/font/google";
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
});
import "./globals.css";

import styles from "./layout.module.css";
import HeaderComponent from "@/components/header/HeaderComponent";
import FooterComponent from "@/components/footer/FooterComponent";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        <div className={styles.page}>
          <HeaderComponent />

          <main className={styles.content}>{children}</main>

          <FooterComponent />
        </div>
      </body>
    </html>
  );
}
