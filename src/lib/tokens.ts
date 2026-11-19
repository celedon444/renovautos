import { customAlphabet } from "nanoid";

// Alfabeto legible sin caracteres confusos (sin 0, O, I, 1)
const nanoid = customAlphabet("23456789ABCDEFGHJKLMNPQRSTUVWXYZ", 4);

/** Genera un token único para el portal público del cliente (ej. TJ-7K9P-2M4X) */
export function generatePublicToken(): string {
  return `TJ-${nanoid()}-${nanoid()}`;
}
