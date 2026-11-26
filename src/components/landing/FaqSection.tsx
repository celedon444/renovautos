"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";

interface FAQItem {
  question: string;
  answer: string;
  badge?: string;
}

const FAQS: FAQItem[] = [
  {
    question: "¿Cuánto tiempo toma el diagnóstico y la entrega de mi vehículo?",
    answer:
      "El diagnóstico computarizado inicial suele tomar entre 45 minutos y 2 horas. Los mantenimientos preventivos (cambio de aceite, filtros y revisión de frenos) se realizan en jornada continua en el mismo día. Para reparaciones mayores de motor o suspensión, te damos un tiempo estimado exacto con fecha y hora de entrega antes de iniciar.",
    badge: "Tiempos",
  },
  {
    question: "¿Cómo funciona el seguimiento en vivo por WhatsApp?",
    answer:
      "Al ingresar tu vehículo a Renovautos, el sistema genera automáticamente una orden de trabajo digital con un código único (ej: TJ-7K9P-2M4X) y te envía el enlace directo a tu WhatsApp. No requieres crear usuarios ni contraseñas. Al abrirlo, ves en qué fase va tu auto y fotos reales de las piezas retiradas y los repuestos nuevos instalados.",
    badge: "Tecnología",
  },
  {
    question: "¿Debo autorizar la cotización antes de que compren los repuestos?",
    answer:
      "Totalmente. En Renovautos practicamos una política de Cero Sorpresas. Desglosamos mano de obra y repuestos en tu portal web. Ninguna pieza es adquirida ni montada sin tu previa aprobación por WhatsApp o en persona. Lo que autorizas es lo que pagas.",
    badge: "Transparencia",
  },
  {
    question: "¿Qué garantía tienen los trabajos realizados?",
    answer:
      "Todos nuestros trabajos de mano de obra cuentan con garantía certificada por escrito de 30 días o 1.000 kilómetros recorridos. Los repuestos nuevos cuentan con la garantía directa del fabricante o distribuidor oficial.",
    badge: "Garantía",
  },
  {
    question: "¿Cuáles son los medios de pago aceptados?",
    answer:
      "Aceptamos transferencias electrónicas por Nequi, Daviplata, Bancolombia, pagos en efectivo y transferencias interbancarias. Entregamos recibo y soporte detallado de cada servicio.",
    badge: "Pagos",
  },
  {
    question: "¿Atienden vehículos particulares, taxis y camionetas de turismo?",
    answer:
      "Sí, atendemos todo tipo de vehículos livianos, camionetas 4x4, SUVs familiares, taxis y flotas de turismo que operan en las rutas de Santa Marta, El Rodadero, Minca y La Guajira.",
    badge: "Cobertura",
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-20 px-4 sm:px-8 lg:px-12 border-b border-surface-border bg-surface/30">
      <div className="max-w-5xl mx-auto space-y-12">
        <div className="text-center space-y-3">
          <span className="rounded-full bg-brand-500/10 border border-brand-500/30 px-3.5 py-1 text-xs font-bold text-brand-400 uppercase tracking-wider inline-flex items-center gap-1.5">
            <HelpCircle suppressHydrationWarning className="h-3.5 w-3.5" />
            Resolvemos tus Dudas
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Preguntas Frecuentes
          </h2>
          <p className="text-xs sm:text-sm text-steel-400 max-w-xl mx-auto">
            Todo lo que necesitas saber antes de traer tu vehículo a Renovautos en Santa Marta.
          </p>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-surface-border bg-surface-elevated overflow-hidden transition-all duration-200 hover:border-brand-500/40"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full flex items-center justify-between p-5 text-left focus:outline-none gap-4"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    {faq.badge && (
                      <span className="hidden sm:inline-block rounded-md bg-brand-500/10 px-2 py-0.5 text-[10px] font-bold uppercase text-brand-400 border border-brand-500/20 shrink-0">
                        {faq.badge}
                      </span>
                    )}
                    <span className="font-bold text-white text-sm sm:text-base leading-snug">
                      {faq.question}
                    </span>
                  </div>
                  <div
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-surface border border-surface-border text-steel-400 transition-transform duration-300 ${
                      isOpen ? "rotate-180 text-brand-400 border-brand-500/40" : ""
                    }`}
                  >
                    <ChevronDown suppressHydrationWarning className="h-4 w-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-steel-300 leading-relaxed border-t border-surface-border/60">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* CTA si tienen otra pregunta */}
        <div className="rounded-2xl border border-surface-border bg-surface-elevated/80 p-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <h3 className="text-sm font-bold text-white">¿Tienes otra consulta sobre tu vehículo?</h3>
            <p className="text-xs text-steel-400 mt-0.5">
              Kilmer responde directamente tus preguntas por WhatsApp en horario de taller.
            </p>
          </div>
          <a
            href="https://wa.me/573025449422?text=Hola%20Renovautos,%20tengo%20una%20pregunta%20sobre%20mi%20auto"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-xl bg-[#25D366] px-5 py-2.5 text-xs font-bold text-white shadow-lg shadow-[#25D366]/25 hover:bg-[#20ba5a] transition-all shrink-0 active:scale-95"
          >
            <WhatsAppIcon className="h-4 w-4 fill-white" />
            <span>Preguntar al WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  );
}
