"use client";

import { useRef } from "react";
import Image from "next/image";
import { Upload, Image as ImageIcon, X } from "lucide-react";
import { Button } from "@/components/ui/button";

type ImageUploadFieldProps = {
  id: string;
  title: string;
  description: string;
  paths: string[];
  onUpload: (files: File[]) => Promise<void>;
  onRemovePath: (path: string) => void;
};

export function ImageUploadField({
  id,
  title,
  description,
  paths,
  onUpload,
  onRemovePath,
}: ImageUploadFieldProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-foreground">{title}</h3>
      <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
        <ImageIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <div className="space-y-2">
          <p className="text-foreground font-medium">{title}</p>
          <p className="text-muted-foreground text-sm">{description}</p>
        </div>
        <input
          id={id}
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(event) => {
            const selectedFiles = Array.from(event.target.files || []);
            void onUpload(selectedFiles);
            event.currentTarget.value = "";
          }}
        />
        <Button
          type="button"
          variant="outline"
          className="mt-4"
          onClick={() => inputRef.current?.click()}
        >
          <Upload className="h-4 w-4 mr-2" />
          Выбрать файлы
        </Button>
      </div>

      {paths.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {paths.map((path) => (
            <div key={path} className="relative aspect-square rounded-md overflow-hidden border">
              <Image
                src={path}
                alt={title}
                fill
                className="object-cover"
              />
              <Button
                type="button"
                size="icon"
                variant="secondary"
                className="absolute right-2 top-2 h-7 w-7"
                onClick={() => onRemovePath(path)}
                aria-label="Удалить изображение"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
