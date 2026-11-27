"use client";

import Image from "next/image";

/* ─────────────────────────────────────────────────────────────────────────────
   BrandsMarquee – logos PNG reales almacenados en /public/brands/logos/
   ───────────────────────────────────────────────────────────────────────────── */

interface Brand {
  name: string;
  src: string;
  width: number;
  height: number;
}

const BRANDS: Brand[] = [
  { name: "Renault",     src: "/brands/logos/renault.png",     width: 120, height: 60 },
  { name: "Chevrolet",   src: "/brands/logos/chevrolet.png",   width: 120, height: 60 },
  { name: "Toyota",      src: "/brands/logos/toyota.png",      width: 120, height: 60 },
  { name: "Mazda",       src: "/brands/logos/mazda.png",       width: 120, height: 60 },
  { name: "Kia",         src: "/brands/logos/kia.png",         width: 120, height: 60 },
  { name: "Nissan",      src: "/brands/logos/nissan.png",      width: 120, height: 60 },
  { name: "Hyundai",     src: "/brands/logos/hyundai.png",     width: 120, height: 60 },
  { name: "Ford",        src: "/brands/logos/ford.png",        width: 120, height: 60 },
  { name: "Volkswagen",  src: "/brands/logos/volkswagen.png",  width: 120, height: 60 },
  { name: "Suzuki",      src: "/brands/logos/suzuki.png",      width: 120, height: 60 },
  { name: "Mitsubishi",  src: "/brands/logos/mitsubishi.png",  width: 120, height: 60 },
];

export default function BrandsMarquee() {
  // Triplicamos para que el bucle sea perfectamente continuo
  const allBrands = [...BRANDS, ...BRANDS, ...BRANDS];

  return (
    <div className="relative overflow-hidden w-full pt-12 pb-2">
      {/* Sombras difuminadas en los extremos */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-[#f6f8fb] to-transparent z-10" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-[#f6f8fb] to-transparent z-10" />

      {/* Tira rotatoria continua */}
      <div className="flex w-max animate-marquee items-center gap-6 sm:gap-10">
        {allBrands.map((brand, idx) => (
          <div
            key={`${brand.name}-${idx}`}
            className="group relative flex h-16 w-28 sm:w-32 items-center justify-center rounded-2xl bg-white border border-slate-200/80 shadow-sm px-4 py-3 transition-all duration-300 hover:shadow-md hover:border-slate-300 hover:scale-105"
            title={brand.name}
          >
            <Image
              src={brand.src}
              alt={`Logo ${brand.name}`}
              width={brand.width}
              height={brand.height}
              className="max-h-9 w-auto object-contain transition-all duration-300"
              priority={idx < 11}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
