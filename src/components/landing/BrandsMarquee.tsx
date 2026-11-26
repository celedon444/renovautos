"use client";

import Image from "next/image";

interface Brand {
  name: string;
  logo: string;
}

const BRANDS: Brand[] = [
  {
    name: "Renault",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Renault_2021_Text-Free_Logo.svg/120px-Renault_2021_Text-Free_Logo.svg.png",
  },
  {
    name: "Chevrolet",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Chevrolet_logo.svg/120px-Chevrolet_logo.svg.png",
  },
  {
    name: "Toyota",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Toyota_carlogo.svg/120px-Toyota_carlogo.svg.png",
  },
  {
    name: "Mazda",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Mazda_logo.svg/120px-Mazda_logo.svg.png",
  },
  {
    name: "Kia",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Kia-logo.svg/120px-Kia-logo.svg.png",
  },
  {
    name: "Nissan",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Nissan_2020_logo.svg/120px-Nissan_2020_logo.svg.png",
  },
  {
    name: "Hyundai",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Hyundai_Motor_Company_logo.svg/120px-Hyundai_Motor_Company_logo.svg.png",
  },
  {
    name: "Ford",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Ford_logo_flat.svg/120px-Ford_logo_flat.svg.png",
  },
  {
    name: "Volkswagen",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Volkswagen_logo_2019.svg/120px-Volkswagen_logo_2019.svg.png",
  },
  {
    name: "Suzuki",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Suzuki_logo_2.svg/120px-Suzuki_logo_2.svg.png",
  },
  {
    name: "Mitsubishi",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Mitsubishi_logo.svg/120px-Mitsubishi_logo.svg.png",
  },
];

export default function BrandsMarquee() {
  // Duplicamos para el bucle infinito sin cortes
  const allBrands = [...BRANDS, ...BRANDS];

  return (
    <div className="relative overflow-hidden w-full py-3">
      {/* Sombras difuminadas en los extremos */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-r from-[#0b0d13] to-transparent z-10" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-l from-[#0b0d13] to-transparent z-10" />

      {/* Tira rotatoria continua */}
      <div className="flex w-max animate-marquee items-center gap-6 sm:gap-10">
        {allBrands.map((brand, idx) => (
          <div
            key={`${brand.name}-${idx}`}
            className="group relative flex items-center justify-center rounded-xl px-4 py-2.5 opacity-40 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0"
            title={brand.name}
          >
            <Image
              src={brand.logo}
              alt={`Logo ${brand.name}`}
              width={48}
              height={28}
              className="h-7 w-auto object-contain"
              unoptimized
            />
          </div>
        ))}
      </div>
    </div>
  );
}
