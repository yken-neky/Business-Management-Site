import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sistema de Gestión Empresarial",
  description: "Plataforma integral para la gestión eficiente de tu empresa",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="overflow-x-hidden bg-white">
      <body className={`${inter.className} min-h-screen overflow-x-hidden bg-white overscroll-y-none`}>
        <div className="min-h-screen flex flex-col bg-white">
          <div className="sticky top-0 z-50 bg-white w-full">
            <Navbar />
          </div>
          <main className="flex-grow pt-16">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
