import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const hash = await bcrypt.hash(process.env.ADMIN_PASSWORD ?? "TallerJunior2024!", 12);
  const adminEmail = process.env.ADMIN_EMAIL ?? "junior@tallerjunior.com.co";

  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      name: "Junior Celedón",
      passwordHash: hash,
      role: "ADMIN",
      workshopName: "Taller Junior",
      workshopCity: "Santa Marta",
      workshopAddress: "Calle Principal # 12-34, Santa Marta, Magdalena",
      workshopPhone: "+57 300 123 4567",
      whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "573001234567",
      nit: "123456789-0",
      bankInfo: "Nequi / Daviplata: 300 123 4567 | Bancolombia Ahorros: 123-456789-01",
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
