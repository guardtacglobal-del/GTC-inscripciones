import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GTC - Guardian Training Center",
  description: "Plataforma de inscripción oficial de Guardian Training Center.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
