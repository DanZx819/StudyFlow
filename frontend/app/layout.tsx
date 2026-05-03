

import { Inter, Nunito } from "next/font/google";
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
});
const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-nunito",
});
import "@/app/globals.css";

import styles from "./layout.module.css";
import HeaderComponent from "@/components/header/HeaderComponent";
import FooterComponent from "@/components/footer/FooterComponent";





export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={nunito.variable}>
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
