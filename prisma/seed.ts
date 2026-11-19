import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const hash = await bcrypt.hash(process.env.ADMIN_PASSWORD ?? "TallerJunior2024!", 12);
  const adminEmail = process.env.ADMIN_EMAIL ?? "junior@tallerjunior.com.co";

  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {
      name: "Kilmer Primiento",
      workshopAddress: "Calle 156 #7-15, Santa Marta, Magdalena, Colombia",
      workshopPhone: "+57 302 544 9422",
      whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "573025449422",
      bankInfo: "Nequi / Daviplata: 302 544 9422 | Bancolombia Ahorros: 123-456789-01",
    },
    create: {
      email: adminEmail,
      name: "Kilmer Primiento",
      passwordHash: hash,
      role: "ADMIN",
      workshopName: "Taller Junior",
      workshopCity: "Santa Marta",
      workshopAddress: "Calle 156 #7-15, Santa Marta, Magdalena, Colombia",
      workshopPhone: "+57 302 544 9422",
      whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "573025449422",
      nit: "123456789-0",
      bankInfo: "Nequi / Daviplata: 302 544 9422 | Bancolombia Ahorros: 123-456789-01",
      invoiceFooter: "Garantía de mano de obra: 30 días o 1.000 km. Repuestos según fabricante. ¡Gracias por confiar en Taller Junior!",
    },
  });

  console.log("✅ Usuario administrador creado:", admin.email);
}

main()
  .catch((e) => {
    console.error("❌ Error en seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
