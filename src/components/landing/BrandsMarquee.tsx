"use client";

interface Brand {
  name: string;
  svg: React.ReactNode;
}

const BRANDS: Brand[] = [
  {
    name: "Renault",
    svg: (
      <svg viewBox="0 0 40 48" className="h-6 w-auto fill-current" aria-hidden="true">
        {/* Renault iconic diamond */}
        <path d="M20 0L4.5 16.5L12 24.5L20 16L28 24.5L35.5 16.5L20 0ZM20 48L35.5 31.5L28 23.5L20 32L12 23.5L4.5 31.5L20 48ZM15 24L20 19L25 24L20 29L15 24Z" />
      </svg>
    ),
  },
  {
    name: "Chevrolet",
    svg: (
      <svg viewBox="0 0 80 32" className="h-5 w-auto fill-current" aria-hidden="true">
        {/* Chevrolet Bowtie */}
        <path d="M26 0H54V8.5H79L75 23.5H54V32H26V23.5H1L5 8.5H26V0ZM28.5 2.5V11H4.5L1.5 21H28.5V29.5H51.5V21H75.5L78.5 11H51.5V2.5H28.5Z" />
      </svg>
    ),
  },
  {
    name: "Toyota",
    svg: (
      <svg viewBox="0 0 64 44" className="h-5 w-auto fill-current" aria-hidden="true">
        {/* Toyota Three Ovals */}
        <path fillRule="evenodd" clipRule="evenodd" d="M32 0C14.327 0 0 9.85 0 22C0 34.15 14.327 44 32 44C49.673 44 64 34.15 64 22C64 9.85 49.673 0 32 0ZM32 3C47.886 3 60.8 11.458 60.8 21.9C60.8 32.342 47.886 40.8 32 40.8C16.114 40.8 3.2 32.342 3.2 21.9C3.2 11.458 16.114 3 32 3ZM32 6.5C24.82 6.5 19 13.439 19 22C19 30.561 24.82 37.5 32 37.5C39.18 37.5 45 30.561 45 22C45 13.439 39.18 6.5 32 6.5ZM32 9.5C37.247 9.5 41.5 15.096 41.5 22C41.5 28.904 37.247 34.5 32 34.5C26.753 34.5 22.5 28.904 22.5 22C22.5 15.096 26.753 9.5 32 9.5ZM10 14C10 11.5 19.85 9.5 32 9.5C44.15 9.5 54 11.5 54 14C54 16.5 44.15 18.5 32 18.5C19.85 18.5 10 16.5 10 14Z" />
      </svg>
    ),
  },
  {
    name: "Mazda",
    svg: (
      <svg viewBox="0 0 60 48" className="h-5 w-auto fill-current" aria-hidden="true">
        {/* Mazda Winged M */}
        <path d="M30 0C13.431 0 0 10.745 0 24C0 37.255 13.431 48 30 48C46.569 48 60 37.255 60 24C60 10.745 46.569 0 30 0ZM30 4C44.359 4 56 12.954 56 24C56 35.046 44.359 44 30 44C15.641 44 4 35.046 4 24C4 12.954 15.641 4 30 4ZM17 34C21 34 26 23 30 23C34 23 39 34 43 34C40 25 36 14 30 14C24 14 20 25 17 34ZM30 18C33.5 18 36.5 23 38.5 28C35.5 27 32.5 26 30 26C27.5 26 24.5 27 21.5 28C23.5 23 26.5 18 30 18Z" />
      </svg>
    ),
  },
  {
    name: "Kia",
    svg: (
      <svg viewBox="0 0 64 24" className="h-4 w-auto fill-current" aria-hidden="true">
        {/* Kia modern wordmark */}
        <path d="M0 24V0H6.5V11L14.5 0H22L12.5 13.5L23 24H15L7.5 14.5L6.5 16V24H0ZM26 24L34.5 0H41L49.5 24H42.5L41 19.5H34.5L33 24H26ZM36 14.5H39.5L37.8 8.5L36 14.5ZM53 24V0H59.5V24H53Z" />
      </svg>
    ),
  },
  {
    name: "Nissan",
    svg: (
      <svg viewBox="0 0 54 48" className="h-5 w-auto fill-current" aria-hidden="true">
        {/* Nissan minimalist circle logo */}
        <path d="M27 0C12.088 0 0 10.745 0 24C0 37.255 12.088 48 27 48C41.912 48 54 37.255 54 24C54 10.745 41.912 0 27 0ZM27 5C38.5 5 48 13.1 48.9 22H5.1C6 13.1 15.5 5 27 5ZM5.1 26H48.9C48 34.9 38.5 43 27 43C15.5 43 6 34.9 5.1 26Z" />
      </svg>
    ),
  },
  {
    name: "Hyundai",
    svg: (
      <svg viewBox="0 0 64 40" className="h-5 w-auto fill-current" aria-hidden="true">
        {/* Hyundai Slanted H in Oval */}
        <path d="M32 0C14.327 0 0 8.954 0 20C0 31.046 14.327 40 32 40C49.673 40 64 31.046 64 20C64 8.954 49.673 0 32 0ZM32 4C47.464 4 60 11.163 60 20C60 28.837 47.464 36 32 36C16.536 36 4 28.837 4 20C4 11.163 16.536 4 32 4ZM19 32L24 10H30L26 21C29 18 36 18 39 21L43 10H49L44 32H38L40 23C37 25 31 25 28 23L25 32H19Z" />
      </svg>
    ),
  },
  {
    name: "Ford",
    svg: (
      <svg viewBox="0 0 64 36" className="h-5 w-auto fill-current" aria-hidden="true">
        {/* Ford Oval with Script typography */}
        <path d="M32 0C14.327 0 0 8.059 0 18C0 27.941 14.327 36 32 36C49.673 36 64 27.941 64 18C64 8.059 49.673 0 32 0ZM32 3C47.464 3 60 9.716 60 18C60 26.284 47.464 33 32 33C16.536 33 4 26.284 4 18C4 9.716 16.536 3 32 3ZM19 14C19 11 23 10 27 10H31L29 15H25C23 15 22 16 22 17C22 19 25 19 28 19L27 24C23 24 19 22 19 18V14ZM31 16C31 13 36 12 40 12C43 12 45 13 45 16C45 20 38 21 34 22L33 25C37 25 41 24 44 23L43 27C39 28 34 28 30 26C28 24 28 21 28 19C28 17 29 16 31 16Z" />
      </svg>
    ),
  },
  {
    name: "Volkswagen",
    svg: (
      <svg viewBox="0 0 48 48" className="h-5 w-auto fill-current" aria-hidden="true">
        {/* Volkswagen roundel */}
        <path d="M24 0C10.745 0 0 10.745 0 24C0 37.255 10.745 48 24 48C37.255 48 48 37.255 48 24C48 10.745 37.255 0 24 0ZM24 4C35.046 4 44 12.954 44 24C44 35.046 35.046 44 24 44C12.954 44 4 35.046 4 24C4 12.954 12.954 4 24 4ZM24 9L29 22H34L26 9H24ZM19 22L24 9H22L14 22H19ZM16 26L21 39H23L18 26H16ZM24 39L29 26H31L26 39H24Z" />
      </svg>
    ),
  },
  {
    name: "Suzuki",
    svg: (
      <svg viewBox="0 0 48 48" className="h-5 w-auto fill-current" aria-hidden="true">
        {/* Suzuki iconic geometric S */}
        <path d="M42 9L24 23H40L24 39H6L24 25H8L24 9H42Z" />
      </svg>
    ),
  },
];

export default function BrandsMarquee() {
  // Duplicamos el array para lograr el bucle infinito sin interrupciones
  const allBrands = [...BRANDS, ...BRANDS];

  return (
    <div className="relative overflow-hidden w-full py-2">
      {/* Sombras difuminadas en los extremos para entrada y salida suave */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-surface to-transparent z-10" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-surface to-transparent z-10" />

      {/* Tira rotatoria con animación CSS continua */}
      <div className="flex w-max animate-marquee items-center gap-4 sm:gap-6">
        {allBrands.map((brand, idx) => (
          <div
            key={`${brand.name}-${idx}`}
            className="group flex items-center gap-2.5 rounded-xl border border-surface-border bg-surface-elevated/40 px-3.5 py-2 text-steel-400 transition-all duration-300 hover:border-brand-500/50 hover:bg-surface-elevated hover:text-white"
          >
            <div className="transition-transform duration-200 group-hover:scale-110 text-steel-300 group-hover:text-brand-400">
              {brand.svg}
            </div>
            <span className="text-xs font-bold tracking-wider uppercase text-steel-300 group-hover:text-white transition-colors">
              {brand.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
