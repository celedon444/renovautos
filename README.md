# 🔧 Taller Junior — Sistema Web Integral

> Sistema web integral (Landing Page + ERP Ligero / CRM Automotriz + Portal de Seguimiento en Vivo para Clientes) diseñado a medida para **Taller Junior** en **Santa Marta, Colombia**.

---

## 🚀 Arquitectura y Tecnologías
- **Framework Full-Stack:** Next.js 14+ (App Router) con TypeScript
- **Estilos & UI:** Tailwind CSS v4 + Lucide Icons (Diseño Mobile-First adaptado para uso en taller)
- **Base de Datos & ORM:** PostgreSQL + Prisma ORM v6
- **Autenticación:** NextAuth v5 (Auth.js) protegida con credenciales y JWT
- **Seguimiento en Vivo:** Portal público `/estado/[token]` accesible sin contraseña mediante enlace único
- **Automatización WhatsApp:** Generación de enlaces prellenados `wa.me` para avisos de avance y confirmación de presupuestos

---

## 📋 Módulos Implementados

### 1. Módulo Público
- **Landing Page (`/`):** Hero section con propuesta de valor para Santa Marta, catálogo de servicios automotrices, buscador de estado por token y botón de contacto directo a WhatsApp.
- **Agendamiento de Citas (`/agendar`):** Formulario para solicitud de citas que guarda en la base de datos y abre WhatsApp con el mensaje prellenado listo para confirmar.
- **Portal de Seguimiento del Cliente (`/estado/[token]`):** Línea de tiempo visual del avance (`Recibido` → `Diagnóstico` → `Cotizado` → `En Reparación` → `Listo`), fotos de evidencia de piezas desgastadas, desglose transparente de costos y botón para aprobar presupuesto por WhatsApp.

### 2. Panel Administrativo Privado (`/admin`)
- **Dashboard Principal (`/admin`):** Resumen financiero del día/mes (ingresos, gastos, utilidad neta real), vehículos en taller y citas pendientes de confirmación.
- **Directorio de Clientes (`/admin/clientes`):** Búsqueda multi-campo instantánea (por nombre, WhatsApp o placa), registro de clientes y perfiles con historial.
- **Hojas de Vida por Placa (`/admin/vehiculos`):** Ficha técnica (marca, modelo, año, tipo de aceite recomendado, motor, transmisión) e historial cronológico de visitas.
- **Órdenes de Trabajo (`/admin/ordenes`):**
  - **Creación Rápida (`/admin/ordenes/nueva`):** Detección automática de cliente por placa, registro táctil de nivel de combustible (emojis de tanque), kilometraje y síntomas.
  - **Detalle y Control (`/admin/ordenes/[id]`):** Avance de estado con un solo toque, subida de fotos por etapas con cámara de celular, editor de repuestos y mano de obra con cálculo de margen en tiempo real, registro de abonos y botón para enviar actualización al cliente por WhatsApp.
- **Finanzas y Flujo de Caja (`/admin/finanzas`):** Registro de egresos (repuestos, arriendo, herramientas, servicios públicos) y cálculo automático de ganancia real.
- **Gestión de Citas Web (`/admin/citas`):** Bandeja de solicitudes de clientes recibidas desde la página.

---

## 🛠️ Comandos de Ejecución

### 1. Variables de Entorno
Configura tu archivo `.env.local` con tus credenciales de PostgreSQL y claves deseadas:
```bash
# Copia o edita .env.local
DATABASE_URL="postgresql://usuario:contrasena@localhost:5432/taller_junior?schema=public"
AUTH_SECRET="tu_clave_secreta_de_al_menos_32_caracteres"
ADMIN_EMAIL="junior@tallerjunior.com.co"
ADMIN_PASSWORD="TallerJunior2024!"
NEXT_PUBLIC_WHATSAPP_NUMBER="573001234567"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### 2. Sincronizar Base de Datos y Crear Usuario Administrador
```bash
# Aplica el esquema de datos en PostgreSQL
pnpm run db:push

# Crea el usuario administrador por defecto
pnpm run db:seed
```

### 3. Iniciar Servidor de Desarrollo
```bash
pnpm run dev
```
Abre tu navegador en [http://localhost:3000](http://localhost:3000).

---

## 🔐 Credenciales del Administrador (Por Defecto)
- **URL de Ingreso:** [http://localhost:3000/login](http://localhost:3000/login)
- **Email:** `junior@tallerjunior.com.co`
- **Contraseña:** `TallerJunior2024!`
