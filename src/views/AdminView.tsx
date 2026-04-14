"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Plus, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ImageUploadField } from "@/components/admin/ImageUploadField";

const Admin = () => {
  const router = useRouter();
  const { toast } = useToast();
  const publicBackendBase = process.env.NEXT_PUBLIC_PATH_BACKEND || "";
  const [uploadStep, setUploadStep] = useState<"form" | "success">("form");
  const [description, setDescription] = useState("");
  const [descriptionMode, setDescriptionMode] = useState<"edit" | "preview">("edit");
  const [projectTitle, setProjectTitle] = useState("");
  const [projectType, setProjectType] = useState("");
  const [area, setArea] = useState("");
  const [rooms, setRooms] = useState("");
  const [style, setStyle] = useState("");
  const [mainImages, setMainImages] = useState<string[]>([]);
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [isUploadingMain, setIsUploadingMain] = useState(false);
  const [isUploadingGallery, setIsUploadingGallery] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.replace("/admin/login");
    router.refresh();
  }

  async function uploadImages(files: File[], target: "main" | "gallery") {
    if (files.length === 0) return;
    const hasInvalidFile = files.some((file) => !file.type.startsWith("image/"));
    if (hasInvalidFile) {
      toast({ title: "Можно загружать только изображения", variant: "destructive" });
      return;
    }

    target === "main" ? setIsUploadingMain(true) : setIsUploadingGallery(true);
    const formData = new FormData();
    for (const file of files) {
      formData.append("files", file);
    }

    try {
      const res = await fetch("/api/admin/upload-images", {
        method: "POST",
        credentials: "include",
        body: formData,
      });
      if (!res.ok) {
        const errorText = await res.text();
        toast({
          title: "Ошибка загрузки изображений",
          description: errorText.slice(0, 200) || `Код ${res.status}`,
          variant: "destructive",
        });
        return;
      }
      const payload = (await res.json()) as { paths?: string[] };
      const paths = Array.isArray(payload.paths) ? payload.paths : [];
      const normalizedPaths = paths.map((path) =>
        path.startsWith("/") && publicBackendBase ? `${publicBackendBase}${path}` : path,
      );
      if (target === "main") {
        setMainImages((prev) => [...prev, ...normalizedPaths]);
      } else {
        setGalleryImages((prev) => [...prev, ...normalizedPaths]);
      }
    } finally {
      target === "main" ? setIsUploadingMain(false) : setIsUploadingGallery(false);
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const areaNum = area.trim() ? Number.parseInt(area, 10) : Number.NaN;
    const roomsNum = rooms.trim() ? Number.parseInt(rooms, 10) : Number.NaN;

    if (!projectType) {
      toast({ title: "Выберите тип объекта", variant: "destructive" });
      return;
    }
    if (mainImages.length === 0) {
      toast({ title: "Добавьте хотя бы один путь к главному изображению", variant: "destructive" });
      return;
    }

    setIsSubmitting(true);
    const res = await fetch("/api/admin/portfolio", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: projectTitle.trim(),
        type: projectType,
        rooms: Number.isFinite(roomsNum) ? roomsNum : 0,
        area: Number.isFinite(areaNum) ? areaNum : 0,
        style: style.trim(),
        description: description.trim(),
        mainImages,
        images,
      }),
    });
    setIsSubmitting(false);

    if (!res.ok) {
      const errText = await res.text();
      toast({
        title: "Ошибка сохранения",
        description: errText.slice(0, 200) || `Код ${res.status}`,
        variant: "destructive",
      });
      return;
    }

    setUploadStep("success");
    toast({
      title: "Проект сохранён",
      description: "Проект добавлен в портфолио.",
    });
  }

  if (uploadStep === "success") {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <div className="max-w-md mx-auto px-4 text-center">
          <Card className="shadow-elegant">
            <CardContent className="p-8">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Plus className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Проект добавлен</h2>
              <p className="text-muted-foreground mb-6">
                Данные сохранены на сервере и доступны в портфолио.
              </p>
              <Button
                onClick={() => {
                  setUploadStep("form");
                  setProjectTitle("");
                  setProjectType("");
                  setArea("");
                  setRooms("");
                  setStyle("");
                  setDescription("");
                  setMainImages([]);
                  setGalleryImages([]);
                }}
                variant="outline"
                className="w-full"
              >
                Добавить ещё один проект
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16">
      <section className="py-14 bg-gradient-subtle">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-4xl font-display font-semibold text-foreground">
            Добавить проект в портфолио
          </h1>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-primary" />
                  Требования
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div>
                  <Badge variant="secondary" className="mb-2">
                    Изображения
                  </Badge>
                  <p className="text-sm text-muted-foreground">
                    Загрузите изображения через системный выбор файлов. После загрузки пути добавятся автоматически.
                  </p>
                </div>
                <div>
                  <Badge variant="secondary" className="mb-2">
                    Описание
                  </Badge>
                  <p className="text-sm text-muted-foreground">
                    Поддерживается markdown: #, ##, **жирный**, *курсив*
                  </p>
                </div>
                <Button type="button" variant="outline" className="w-full mt-2" onClick={handleLogout}>
                  Выйти
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2">
            <Card className="shadow-elegant">
              <CardHeader>
                <CardTitle className="text-2xl font-display">Форма подачи проекта</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-foreground">Информация о проекте</h3>

                    <div>
                      <Label htmlFor="project-title">Название проекта *</Label>
                      <Input
                        id="project-title"
                        placeholder="Например: Современная квартира в центре города"
                        className="mt-1"
                        required
                        value={projectTitle}
                        onChange={(event) => setProjectTitle(event.target.value)}
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="project-type">Тип объекта *</Label>
                        <Select required value={projectType} onValueChange={setProjectType}>
                          <SelectTrigger id="project-type" className="mt-1">
                            <SelectValue placeholder="Выберите тип" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="apartment">Квартира</SelectItem>
                            <SelectItem value="house">Частный дом</SelectItem>
                            <SelectItem value="commercial">Коммерческое помещение</SelectItem>
                            <SelectItem value="renovation">Ремонт/реконструкция</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="area">Площадь (м²) *</Label>
                        <Input
                          id="area"
                          placeholder="85"
                          className="mt-1"
                          required
                          inputMode="numeric"
                          value={area}
                          onChange={(event) => setArea(event.target.value)}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="rooms">Количество комнат *</Label>
                        <Input
                          id="rooms"
                          placeholder="3"
                          className="mt-1"
                          required
                          inputMode="numeric"
                          value={rooms}
                          onChange={(event) => setRooms(event.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="style">Стиль интерьера</Label>
                        <Input
                          id="style"
                          placeholder="Например: скандинавский, лофт"
                          className="mt-1"
                          value={style}
                          onChange={(event) => setStyle(event.target.value)}
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Label htmlFor="description">Описание проекта *</Label>
                      <div className="flex gap-2">
                        <Button
                          type="button"
                          variant={descriptionMode === "edit" ? "default" : "outline"}
                          size="sm"
                          onClick={() => setDescriptionMode("edit")}
                        >
                          Редактировать
                        </Button>
                        <Button
                          type="button"
                          variant={descriptionMode === "preview" ? "default" : "outline"}
                          size="sm"
                          onClick={() => setDescriptionMode("preview")}
                        >
                          Предпросмотр
                        </Button>
                      </div>
                      {descriptionMode === "edit" ? (
                        <Textarea
                          id="description"
                          placeholder="Расскажите об особенностях проекта..."
                          className="mt-1 h-32"
                          required
                          value={description}
                          onChange={(event) => setDescription(event.target.value)}
                        />
                      ) : (
                        <div className="min-h-32 rounded-md border border-input p-3 prose prose-sm max-w-none">
                          <ReactMarkdown>
                            {description || "*Начните вводить описание, чтобы увидеть предпросмотр.*"}
                          </ReactMarkdown>
                        </div>
                      )}
                    </div>
                  </div>

                  <ImageUploadField
                    id="main-images-upload"
                    title="Главные изображения (пути)"
                    description={
                      isUploadingMain
                        ? "Загрузка..."
                        : "Загрузите 1+ изображения. Можно удалить из списка перед сохранением."
                    }
                    paths={mainImages}
                    onUpload={(files) => uploadImages(files, "main")}
                    onRemovePath={(path) => setMainImages((prev) => prev.filter((item) => item !== path))}
                  />

                  <ImageUploadField
                    id="gallery-images-upload"
                    title="Галерея (пути)"
                    description={
                      isUploadingGallery
                        ? "Загрузка..."
                        : "Загрузите дополнительные изображения. Можно удалить в любой момент."
                    }
                    paths={galleryImages}
                    onUpload={(files) => uploadImages(files, "gallery")}
                    onRemovePath={(path) => setGalleryImages((prev) => prev.filter((item) => item !== path))}
                  />

                  <div className="pt-6 border-t">
                    <Button
                      type="submit"
                      className="w-full"
                      size="lg"
                      disabled={isSubmitting || isUploadingMain || isUploadingGallery}
                    >
                      {isSubmitting ? "Сохранение..." : "Сохранить проект"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
