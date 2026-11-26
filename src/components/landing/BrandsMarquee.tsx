"use client";

import type { ReactNode } from "react";

/* ─────────────────────────────────────────────────────────────────────────────
   BrandsMarquee – logos SVG inline a todo color, sin dependencias externas
   ───────────────────────────────────────────────────────────────────────────── */

interface Brand {
  name: string;
  logo: ReactNode;
}

/* ── SVGs oficiales simplificados con colores reales de cada marca ── */

const RenaultLogo = () => (
  <svg viewBox="0 0 120 120" className="h-8 w-auto" aria-label="Renault">
    <polygon points="60,4 116,32 116,88 60,116 4,88 4,32" fill="#EFDF00" />
    <polygon points="60,18 60,55 42,18" fill="#000000" />
    <polygon points="60,18 78,18 60,55" fill="#000000" />
    <polygon points="60,65 60,102 42,65" fill="#000000" />
    <polygon points="60,65 78,102 60,102" fill="#000000" />
    <polygon points="42,18 60,55 42,65 24,55" fill="#000000" />
    <polygon points="78,18 96,55 78,65 60,55" fill="#000000" />
    <polygon points="42,65 60,102 42,102 24,65" fill="#000000" />
    <polygon points="60,55 78,65 60,65" fill="#EFDF00" />
    <polygon points="60,55 60,65 42,65" fill="#EFDF00" />
  </svg>
);

const ChevroletLogo = () => (
  <svg viewBox="0 0 200 100" className="h-7 w-auto" aria-label="Chevrolet">
    <rect width="200" height="100" fill="#D4A843" rx="4" />
    <rect x="10" y="38" width="180" height="24" fill="white" />
    <rect x="10" y="38" width="55" height="24" fill="#D4A843" />
    <rect x="135" y="38" width="55" height="24" fill="#D4A843" />
    <rect x="65" y="14" width="30" height="72" fill="white" />
  </svg>
);

const ToyotaLogo = () => (
  <svg viewBox="0 0 206 100" className="h-8 w-auto" aria-label="Toyota">
    {/* Elipse exterior */}
    <ellipse cx="103" cy="50" rx="100" ry="46" fill="none" stroke="#EB0A1E" strokeWidth="8" />
    {/* Elipse horizontal */}
    <ellipse cx="103" cy="50" rx="66" ry="20" fill="none" stroke="#EB0A1E" strokeWidth="8" />
    {/* Elipse vertical cuerpo */}
    <ellipse cx="103" cy="50" rx="22" ry="46" fill="none" stroke="#EB0A1E" strokeWidth="8" />
  </svg>
);

const MazdaLogo = () => (
  <svg viewBox="0 0 200 100" className="h-8 w-auto" aria-label="Mazda">
    {/* Óvalo base */}
    <ellipse cx="100" cy="50" rx="96" ry="46" fill="#FFFFFF" stroke="#B22222" strokeWidth="2" />
    {/* Alas tipo Mazda */}
    <path d="M100,25 C75,25 40,38 20,50 C40,62 75,75 100,75 C100,75 85,62 85,50 C85,38 100,25 100,25Z" fill="#B22222" />
    <path d="M100,25 C125,25 160,38 180,50 C160,62 125,75 100,75 C100,75 115,62 115,50 C115,38 100,25 100,25Z" fill="#B22222" />
    <ellipse cx="100" cy="50" rx="18" ry="22" fill="#B22222" />
  </svg>
);

const KiaLogo = () => (
  <svg viewBox="0 0 200 80" className="h-6 w-auto" aria-label="Kia">
    <rect width="200" height="80" rx="8" fill="#05141F" />
    {/* Letras KIA estilizadas */}
    <text x="100" y="58" textAnchor="middle" fontFamily="Arial Black, sans-serif" fontSize="44" fontWeight="900" fill="white" fontStyle="italic">KIA</text>
  </svg>
);

const NissanLogo = () => (
  <svg viewBox="0 0 220 100" className="h-8 w-auto" aria-label="Nissan">
    {/* Círculo exterior */}
    <ellipse cx="110" cy="50" rx="106" ry="46" fill="none" stroke="#C3002F" strokeWidth="6" />
    {/* Barra horizontal con texto */}
    <rect x="4" y="38" width="212" height="24" fill="#C3002F" />
    <text x="110" y="58" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="18" fontWeight="bold" fill="white" letterSpacing="3">NISSAN</text>
    {/* Semi-elipse superior */}
    <path d="M44,38 Q110,8 176,38" fill="none" stroke="#C3002F" strokeWidth="6" />
    {/* Semi-elipse inferior */}
    <path d="M44,62 Q110,92 176,62" fill="none" stroke="#C3002F" strokeWidth="6" />
  </svg>
);

const HyundaiLogo = () => (
  <svg viewBox="0 0 200 100" className="h-8 w-auto" aria-label="Hyundai">
    <ellipse cx="100" cy="50" rx="96" ry="46" fill="#002C5F" />
    {/* H estilizada */}
    <text x="100" y="68" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="68" fontWeight="900" fill="white" fontStyle="italic">H</text>
  </svg>
);

const FordLogo = () => (
  <svg viewBox="0 0 220 100" className="h-8 w-auto" aria-label="Ford">
    <ellipse cx="110" cy="50" rx="106" ry="46" fill="#003478" />
    <text x="110" y="68" textAnchor="middle" fontFamily="Times New Roman, serif" fontSize="52" fontWeight="bold" fill="white" fontStyle="italic">Ford</text>
  </svg>
);

const VolkswagenLogo = () => (
  <svg viewBox="0 0 200 200" className="h-9 w-auto" aria-label="Volkswagen">
    {/* Círculo exterior */}
    <circle cx="100" cy="100" r="96" fill="#001E50" />
    <circle cx="100" cy="100" r="78" fill="none" stroke="white" strokeWidth="6" />
    {/* V superior */}
    <path d="M100,30 L75,90 L100,75 L125,90 Z" fill="white" />
    {/* W inferior */}
    <path d="M60,90 L75,130 L100,105 L125,130 L140,90 L125,90 L100,120 L75,90 Z" fill="white" />
  </svg>
);

const SuzukiLogo = () => (
  <svg viewBox="0 0 200 100" className="h-8 w-auto" aria-label="Suzuki">
    <rect width="200" height="100" rx="6" fill="#E31F26" />
    {/* S estilizada */}
    <text x="100" y="72" textAnchor="middle" fontFamily="Arial Black, sans-serif" fontSize="68" fontWeight="900" fill="white">S</text>
  </svg>
);

const MitsubishiLogo = () => (
  <svg viewBox="0 0 200 180" className="h-9 w-auto" aria-label="Mitsubishi">
    {/* Tres diamantes */}
    <polygon points="100,0 140,65 60,65" fill="#E60012" />
    <polygon points="60,65 20,130 60,130 100,65" fill="#E60012" />
    <polygon points="140,65 100,65 140,130 180,130" fill="#E60012" />
    <polygon points="60,130 100,180 140,130" fill="#E60012" />
  </svg>
);

const BRANDS: Brand[] = [
  { name: "Renault",    logo: <RenaultLogo /> },
  { name: "Chevrolet", logo: <ChevroletLogo /> },
  { name: "Toyota",    logo: <ToyotaLogo /> },
  { name: "Mazda",     logo: <MazdaLogo /> },
  { name: "Kia",       logo: <KiaLogo /> },
  { name: "Nissan",    logo: <NissanLogo /> },
  { name: "Hyundai",   logo: <HyundaiLogo /> },
  { name: "Ford",      logo: <FordLogo /> },
  { name: "Volkswagen",logo: <VolkswagenLogo /> },
  { name: "Suzuki",    logo: <SuzukiLogo /> },
  { name: "Mitsubishi",logo: <MitsubishiLogo /> },
];

export default function BrandsMarquee() {
  const allBrands = [...BRANDS, ...BRANDS];

  return (
    <div className="relative overflow-hidden w-full py-3">
      {/* Sombras difuminadas acordes al fondo claro */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-[#f6f8fb] to-transparent z-10" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-[#f6f8fb] to-transparent z-10" />

      {/* Tira rotatoria continua */}
      <div className="flex w-max animate-marquee items-center gap-6 sm:gap-10">
        {allBrands.map((brand, idx) => (
          <div
            key={`${brand.name}-${idx}`}
            className="group relative flex items-center justify-center rounded-2xl bg-white border border-slate-200/80 shadow-sm px-5 py-3 transition-all duration-300 hover:shadow-md hover:border-slate-300 hover:scale-105"
            title={brand.name}
          >
            <div className="h-9 w-auto flex items-center justify-center min-w-[52px]">
              {brand.logo}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
