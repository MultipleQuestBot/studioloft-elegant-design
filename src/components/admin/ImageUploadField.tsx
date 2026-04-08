"use client";

import { useEffect, useMemo, useRef } from "react";
import Image from "next/image";
import { Upload, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

type ImageUploadFieldProps = {
  id: string;
  title: string;
  description: string;
  files: File[];
  onChange: (files: File[]) => void;
};

export function ImageUploadField({
  id,
  title,
  description,
  files,
  onChange,
}: ImageUploadFieldProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const previews = useMemo(
    () => files.map((file) => ({ file, url: URL.createObjectURL(file) })),
    [files],
  );

  useEffect(() => {
    return () => {
      previews.forEach((preview) => URL.revokeObjectURL(preview.url));
    };
  }, [previews]);

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
            onChange(selectedFiles);
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

      {previews.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {previews.map((preview) => (
            <div key={`${preview.file.name}-${preview.file.lastModified}`} className="relative aspect-square rounded-md overflow-hidden border">
              <Image
                src={preview.url}
                alt={preview.file.name}
                fill
                unoptimized
                className="object-cover"
              />
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
