"use client";

import { useState } from "react";
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
  const [uploadStep, setUploadStep] = useState<'form' | 'success'>('form');
  const [description, setDescription] = useState("");
  const [descriptionMode, setDescriptionMode] = useState<"edit" | "preview">("edit");
  const [mainProjectImages, setMainProjectImages] = useState<File[]>([]);
  const [projectGalleryImages, setProjectGalleryImages] = useState<File[]>([]);
  const { toast } = useToast();

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.replace("/admin/login");
    router.refresh();
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setUploadStep('success');
    toast({
      title: "Проект отправлен!",
      description: "Мы рассмотрим вашу заявку и свяжемся с вами в течение 2-3 дней.",
    });
  };

  if (uploadStep === 'success') {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <div className="max-w-md mx-auto px-4 text-center">
          <Card className="shadow-elegant">
            <CardContent className="p-8">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Plus className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                Заявка отправлена!
              </h2>
              <p className="text-muted-foreground mb-6">
                Спасибо за интерес к нашему портфолио. Мы рассмотрим ваш проект и свяжемся с вами в ближайшие дни.
              </p>
              <Button 
                onClick={() => setUploadStep('form')} 
                variant="outline" 
                className="w-full"
              >
                Отправить еще один проект
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16">
      {/* Header */}
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
                  <Badge variant="secondary" className="mb-2">Фотографии</Badge>
                  <p className="text-sm text-muted-foreground">
                    5-15 качественных фото интерьера в высоком разрешении
                  </p>
                </div>
                <div>
                  <Badge variant="secondary" className="mb-2">Описание</Badge>
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
                <CardTitle className="text-2xl font-display">
                  Форма подачи проекта
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Project Info */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-foreground">
                      Информация о проекте
                    </h3>
                    
                    <div>
                      <Label htmlFor="project-title">Название проекта *</Label>
                      <Input 
                        id="project-title" 
                        placeholder="Например: Современная квартира в центре города" 
                        className="mt-1" 
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="project-type">Тип объекта *</Label>
                        <Select required>
                          <SelectTrigger className="mt-1">
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
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="style">Стиль интерьера</Label>
                      <Input 
                        id="style" 
                        placeholder="Например: скандинавский, лофт, классический" 
                        className="mt-1" 
                      />
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
                          placeholder="Расскажите об особенностях проекта, использованных материалах, цветовых решениях..."
                          className="mt-1 h-32"
                          required
                          value={description}
                          onChange={(event) => setDescription(event.target.value)}
                        />
                      ) : (
                        <div className="min-h-32 rounded-md border border-input p-3 prose prose-sm max-w-none">
                          <ReactMarkdown>{description || "*Начните вводить описание, чтобы увидеть предпросмотр.*"}</ReactMarkdown>
                        </div>
                      )}
                    </div>
                  </div>

                  <ImageUploadField
                    id="main-images"
                    title="Главные фотографии проекта"
                    description="Загрузите главные изображения проекта. Можно выбрать несколько файлов."
                    files={mainProjectImages}
                    onChange={setMainProjectImages}
                  />

                  <ImageUploadField
                    id="gallery-images"
                    title="Фотографии проекта"
                    description="Поддерживаются форматы: JPG, PNG. Максимум 15 файлов."
                    files={projectGalleryImages}
                    onChange={setProjectGalleryImages}
                  />

                  <div className="pt-6 border-t">
                    <Button type="submit" className="w-full" size="lg">
                      Отправить
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