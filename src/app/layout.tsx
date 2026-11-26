import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Renovautos — Restauración y Mecánica Automotriz en Santa Marta",
    template: "%s | Renovautos",
  },
  description:
    "Taller de restauración y mecánica automotriz en Santa Marta. Diagnóstico computarizado, mantenimiento preventivo, frenos, motor y seguimiento en vivo para clientes.",
  manifest: "/manifest.json",
  icons: {
    icon: "/brand/renovautos-favicon.png",
    shortcut: "/brand/renovautos-favicon.png",
    apple: "/brand/renovautos-favicon.png",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Renovautos",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0c",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className="antialiased min-h-screen bg-surface text-steel-100 selection:bg-brand-500 selection:text-white"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
