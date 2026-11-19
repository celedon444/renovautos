"use client";

import { useRef, useState, useTransition } from "react";
import { saveOrderPhotoAction, deleteOrderPhotoAction } from "@/actions/workorders";
import { Camera, Image as ImageIcon, Trash2, Loader2 } from "lucide-react";
import type { OrderPhoto, PhotoStage } from "@prisma/client";

const STAGES: { stage: PhotoStage; label: string }[] = [
  { stage: "INTAKE", label: "Ingreso (Rayones/Golpes)" },
  { stage: "DIAGNOSIS", label: "Diagnóstico (Fallas/Fugas)" },
  { stage: "IN_PROGRESS", label: "En Reparación" },
  { stage: "COMPLETED", label: "Listo / Finalizado" },
];

interface Props {
  workOrderId: string;
  photos: OrderPhoto[];
}

export default function PhotoUploader({ workOrderId, photos }: Props) {
  const [selectedStage, setSelectedStage] = useState<PhotoStage>("INTAKE");
  const [isUploading, setIsUploading] = useState(false);
  const [isDeleting, startDelete] = useTransition();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const stagePhotos = photos.filter((p) => p.stage === selectedStage);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);

    try {
      for (const file of Array.from(files)) {
        // Enviar a Cloudinary si está configurado, o convertir a base64 / dataUrl para visualización
        const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
        const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

        let photoUrl = "";
        let publicId = "";

        if (cloudName && uploadPreset && cloudName !== "demo") {
          const formData = new FormData();
          formData.append("file", file);
          formData.append("upload_preset", uploadPreset);

          const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
            method: "POST",
            body: formData,
          });
          const data = await res.json();
          photoUrl = data.secure_url;
          publicId = data.public_id;
        } else {
          // Fallback con FileReader local DataURL
          photoUrl = await new Promise((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result as string);
            reader.readAsDataURL(file);
          });
          publicId = `local_${Date.now()}`;
        }

        await saveOrderPhotoAction(
          workOrderId,
          photoUrl,
          publicId,
          selectedStage,
          file.name
        );
      }
    } catch (err) {
      console.error("Error subiendo foto:", err);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  return (
    <div className="rounded-2xl border border-surface-border bg-surface-elevated p-4 sm:p-5 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-bold uppercase tracking-wider text-steel-400">
          Registro Fotográfico de Evidencia
        </h3>
        <span className="text-xs text-brand-400 font-bold">
          {photos.length} fotos totales
        </span>
      </div>

      {/* Selector de Etapa */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {STAGES.map((s) => {
          const count = photos.filter((p) => p.stage === s.stage).length;
          return (
            <button
              key={s.stage}
              type="button"
              onClick={() => setSelectedStage(s.stage)}
              className={`p-2.5 rounded-xl border text-xs font-bold transition-all text-left flex flex-col justify-between ${
                selectedStage === s.stage
                  ? "border-brand-500 bg-brand-500/10 text-brand-400"
                  : "border-surface-border bg-surface text-steel-400 hover:text-white"
              }`}
            >
              <span>{s.label.split(" ")[0]}</span>
              <span className="text-[10px] text-steel-500 font-normal mt-1">
                {count} fotos
              </span>
            </button>
          );
        })}
      </div>

      {/* Botón de Captura Rápida (Cámara de celular) */}
      <div className="flex items-center gap-2">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          multiple
          className="hidden"
          onChange={handleFileChange}
        />

        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
          className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-brand-500 py-3 text-xs font-bold text-white shadow-lg shadow-brand-500/25 transition-all hover:bg-brand-600 active:scale-95 disabled:opacity-50"
        >
          {isUploading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Guardando foto...</span>
            </>
          ) : (
            <>
              <Camera className="h-4 w-4" />
              <span>Tomar Foto / Subir Evidencia</span>
            </>
          )}
        </button>
      </div>

      {/* Galería de la etapa seleccionada */}
      {stagePhotos.length === 0 ? (
        <div className="rounded-xl border border-dashed border-surface-border p-6 text-center text-xs text-steel-500 bg-surface/50">
          No hay fotos registradas para esta etapa.
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {stagePhotos.map((photo) => (
            <div
              key={photo.id}
              className="relative rounded-xl border border-surface-border overflow-hidden group aspect-square bg-surface"
            >
              <img
                src={photo.url}
                alt={photo.caption ?? "Foto de orden"}
                className="h-full w-full object-cover group-hover:scale-105 transition-transform"
              />
              <button
                type="button"
                onClick={() => startDelete(() => deleteOrderPhotoAction(photo.id, workOrderId))}
                disabled={isDeleting}
                className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/75 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
              {photo.caption && (
                <div className="absolute bottom-0 left-0 right-0 p-1.5 bg-black/80 text-[10px] text-white truncate">
                  {photo.caption}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
