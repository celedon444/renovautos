import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Taller Junior — Santa Marta, Colombia",
    template: "%s | Taller Junior",
  },
  description:
    "Taller mecánico automotriz en Santa Marta. Diagnóstico computarizado, mantenimiento preventivo, frenos, motor y seguimiento en vivo para clientes.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Taller Junior",
  },
};

export const viewport: Viewport = {
  themeColor: "#0f1117",
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
        className="antialiased min-h-screen bg-surface text-steel-100"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
