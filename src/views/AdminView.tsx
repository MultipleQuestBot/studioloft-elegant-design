"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { MarkdownRenderer } from "@/components/ui/MarkdownRenderer";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import {
  adminCreateProject,
  adminDeleteProject,
  adminDeleteRequest,
  adminListRequests,
  adminUpdateProject,
  listProjectsClient,
  type AdminLeadRequest,
  type AdminProjectUpsertPayload,
} from "@/lib/api";
import type { Project } from "@/types/project";
import { getProjectTypeLabel } from "@/lib/project-types";

type AdminTab = "projects" | "requests";

type EditingState =
  | { mode: "none" }
  | { mode: "create" }
  | { mode: "edit"; project: Project };

const Admin = () => {
  const router = useRouter();
  const { toast } = useToast();
  const publicBackendBase = process.env.NEXT_PUBLIC_PATH_BACKEND || "";
  const [activeTab, setActiveTab] = useState<AdminTab>("projects");

  const [projects, setProjects] = useState<Project[]>([]);
  const [requests, setRequests] = useState<AdminLeadRequest[]>([]);
  const [expandedRequestId, setExpandedRequestId] = useState<string | null>(null);

  const [editing, setEditing] = useState<EditingState>({ mode: "none" });

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState("Вы уверены, что хотите удалить этот объект?");
  const [confirmAction, setConfirmAction] = useState<null | (() => Promise<void>)>(null);

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST", credentials: "include" });
    router.replace("/admin/login");
    router.refresh();
  }

  useEffect(() => {
    void (async () => {
      const list = await listProjectsClient(100);
      setProjects(list);
    })();
  }, []);

  useEffect(() => {
    if (activeTab !== "requests") return;
    void (async () => {
      const list = await adminListRequests();
      setRequests(list);
    })();
  }, [activeTab]);

  function openConfirm(action: () => Promise<void>) {
    setConfirmMessage("Вы уверены, что хотите удалить этот объект?");
    setConfirmAction(() => action);
    setConfirmOpen(true);
  }

  const projectFormTitle = editing.mode === "edit" ? "Редактировать проект" : "Создать проект";
  const projectFormSubmitLabel = editing.mode === "edit" ? "Сохранить изменения" : "Сохранить проект";

  const initialForm: AdminProjectUpsertPayload = useMemo(() => {
    if (editing.mode !== "edit") {
      return {
        name: "",
        type: "apartment",
        rooms: 0,
        area: 0,
        style: "",
        description: "",
        mainImages: [],
        images: [],
      };
    }
    return {
      name: editing.project.name,
      type: editing.project.type,
      rooms: editing.project.rooms,
      area: editing.project.area,
      style: editing.project.style,
      description: editing.project.description,
      mainImages: editing.project.mainImages,
      images: editing.project.images,
    };
  }, [editing]);

  return (
    <div className="min-h-screen pt-16">
      <section className="py-10 bg-gradient-subtle border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            <h1 className="text-2xl md:text-3xl font-display font-semibold text-foreground">Админ-панель</h1>
            <Button type="button" variant="outline" onClick={handleLogout}>
              Выйти
            </Button>
          </div>
          <div className="mt-6 inline-flex rounded-md border bg-background p-1">
            <button
              type="button"
              className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                activeTab === "projects" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
              onClick={() => setActiveTab("projects")}
            >
              Управление проектами
            </button>
            <button
              type="button"
              className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                activeTab === "requests" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
              onClick={() => setActiveTab("requests")}
            >
              Управление заявками
            </button>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {activeTab === "projects" ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 space-y-6">
              <Card className="shadow-soft">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <FileText className="h-5 w-5 mr-2 text-primary" />
                    Проекты
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <Button
                    type="button"
                    className="w-full"
                    onClick={() => setEditing({ mode: "create" })}
                  >
                    Создать новый проект
                  </Button>
                  <div className="space-y-2">
                    {projects.map((p) => (
                      <div key={p.id} className="flex items-center justify-between gap-3 rounded-md border px-3 py-2">
                        <span className="text-sm text-foreground truncate">{p.name}</span>
                        <div className="flex items-center gap-2">
                          <Button type="button" variant="outline" size="sm" onClick={() => setEditing({ mode: "edit", project: p })}>
                            Редактировать
                          </Button>
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            onClick={() =>
                              openConfirm(async () => {
                                const res = await adminDeleteProject(p.id);
                                if (!res.ok) {
                                  toast({ title: "Не удалось удалить", variant: "destructive" });
                                  return;
                                }
                                setProjects((prev) => prev.filter((x) => x.id !== p.id));
                                toast({ title: "Удалено" });
                              })
                            }
                          >
                            Удалить
                          </Button>
                        </div>
                      </div>
                    ))}
                    {projects.length === 0 ? (
                      <p className="text-sm text-muted-foreground">Нет проектов.</p>
                    ) : null}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-2">
              {editing.mode === "none" ? (
                <Card className="shadow-elegant">
                  <CardHeader>
                    <CardTitle className="text-2xl font-display">Форма проекта</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <p className="text-muted-foreground">Выберите проект для редактирования или создайте новый.</p>
                  </CardContent>
                </Card>
              ) : (
                <ProjectForm
                  key={editing.mode === "edit" ? editing.project.id : "create"}
                  publicBackendBase={publicBackendBase}
                  title={projectFormTitle}
                  submitLabel={projectFormSubmitLabel}
                  initial={initialForm}
                  onCancel={() => setEditing({ mode: "none" })}
                  onSaved={async () => {
                    const list = await listProjectsClient(100);
                    setProjects(list);
                    setEditing({ mode: "none" });
                  }}
                  onSubmit={async (payload) => {
                    const res =
                      editing.mode === "edit"
                        ? await adminUpdateProject(editing.project.id, payload)
                        : await adminCreateProject(payload);
                    return res;
                  }}
                />
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <Card className="shadow-elegant">
              <CardHeader>
                <CardTitle className="text-2xl font-display">Заявки</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-3">
                {requests.map((r) => (
                  <div key={r.id} className="rounded-md border">
                    <button
                      type="button"
                      className="w-full flex items-center justify-between gap-4 px-4 py-3 text-left"
                      onClick={() => setExpandedRequestId((prev) => (prev === r.id ? null : r.id))}
                    >
                      <div className="min-w-0">
                        <div className="font-medium text-foreground truncate">{r.name}</div>
                        <div className="text-sm text-muted-foreground">{r.created_at}</div>
                      </div>
                      <span className="text-sm text-muted-foreground">{expandedRequestId === r.id ? "−" : "+"}</span>
                    </button>
                    {expandedRequestId === r.id ? (
                      <div className="px-4 pb-4 space-y-2 text-sm">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          <div><span className="text-muted-foreground">Email:</span> {r.email || "—"}</div>
                          <div><span className="text-muted-foreground">Телефон:</span> {r.phone_number || "—"}</div>
                          <div><span className="text-muted-foreground">Площадь:</span> {r.square_footage ?? "—"}</div>
                          <div><span className="text-muted-foreground">Тип:</span> {getProjectTypeLabel(r.object_type)}</div>
                          <div><span className="text-muted-foreground">Комнаты:</span> {r.number_of_rooms ?? "—"}</div>
                        </div>
                        <div className="pt-2">
                          <div className="text-muted-foreground mb-1">Описание:</div>
                          <div className="max-w-full break-words whitespace-pre-wrap">{r.description}</div>
                        </div>
                        <div className="pt-3">
                          <Button
                            type="button"
                            variant="destructive"
                            onClick={() =>
                              openConfirm(async () => {
                                const res = await adminDeleteRequest(r.id);
                                if (!res.ok && res.status !== 204) {
                                  toast({ title: "Не удалось удалить заявку", variant: "destructive" });
                                  return;
                                }
                                setRequests((prev) => prev.filter((x) => x.id !== r.id));
                                toast({ title: "Заявка удалена" });
                              })
                            }
                          >
                            Удалить заявку
                          </Button>
                        </div>
                      </div>
                    ) : null}
                  </div>
                ))}
                {requests.length === 0 ? <p className="text-muted-foreground">Нет заявок.</p> : null}
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      <ConfirmDialog
        open={confirmOpen}
        message={confirmMessage}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={async () => {
          const action = confirmAction;
          setConfirmOpen(false);
          setConfirmAction(null);
          if (action) await action();
        }}
      />
    </div>
  );
};

export default Admin;

type ProjectFormProps = {
  publicBackendBase: string;
  title: string;
  submitLabel: string;
  initial: AdminProjectUpsertPayload;
  onSubmit: (payload: AdminProjectUpsertPayload) => Promise<Response>;
  onSaved: () => void | Promise<void>;
  onCancel: () => void;
};

function ProjectForm({
  publicBackendBase,
  title,
  submitLabel,
  initial,
  onSubmit,
  onSaved,
  onCancel,
}: ProjectFormProps) {
  const { toast } = useToast();
  const [description, setDescription] = useState(initial.description);
  const [descriptionMode, setDescriptionMode] = useState<"edit" | "preview">("edit");
  const [projectTitle, setProjectTitle] = useState(initial.name);
  const [projectType, setProjectType] = useState<Project["type"]>(initial.type);
  const [area, setArea] = useState(String(initial.area || ""));
  const [rooms, setRooms] = useState(String(initial.rooms || ""));
  const [style, setStyle] = useState(initial.style);
  const [mainImages, setMainImages] = useState<string[]>(initial.mainImages);
  const [galleryImages, setGalleryImages] = useState<string[]>(initial.images);
  const [isUploadingMain, setIsUploadingMain] = useState(false);
  const [isUploadingGallery, setIsUploadingGallery] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    const res = await onSubmit({
      name: projectTitle.trim(),
      type: projectType,
      rooms: Number.isFinite(roomsNum) ? roomsNum : 0,
      area: Number.isFinite(areaNum) ? areaNum : 0,
      style: style.trim(),
      description: description.trim(),
      mainImages,
      images: galleryImages,
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

    toast({ title: "Сохранено" });
    await onSaved();
  }

  return (
    <Card className="shadow-elegant">
      <CardHeader>
        <CardTitle className="text-2xl font-display">{title}</CardTitle>
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
                <Select required value={projectType} onValueChange={(v) => setProjectType(v as Project["type"])}>
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
                <div className="min-h-32 rounded-md border border-input p-3 max-w-full overflow-x-auto">
                  <MarkdownRenderer content={description || "*Начните вводить описание, чтобы увидеть предпросмотр.*"} />
                </div>
              )}
            </div>
          </div>

          <ImageUploadField
            id="main-images-upload"
            title="Главные изображения (пути)"
            description={
              isUploadingMain ? "Загрузка..." : "Загрузите 1+ изображения. Можно удалить из списка перед сохранением."
            }
            paths={mainImages}
            onUpload={(files) => uploadImages(files, "main")}
            onRemovePath={(path) => setMainImages((prev) => prev.filter((item) => item !== path))}
          />

          <ImageUploadField
            id="gallery-images-upload"
            title="Галерея (пути)"
            description={
              isUploadingGallery ? "Загрузка..." : "Загрузите дополнительные изображения. Можно удалить в любой момент."
            }
            paths={galleryImages}
            onUpload={(files) => uploadImages(files, "gallery")}
            onRemovePath={(path) => setGalleryImages((prev) => prev.filter((item) => item !== path))}
          />

          <div className="pt-6 border-t flex gap-3">
            <Button
              type="submit"
              className="flex-1"
              size="lg"
              disabled={isSubmitting || isUploadingMain || isUploadingGallery}
            >
              {isSubmitting ? "Сохранение..." : submitLabel}
            </Button>
            <Button type="button" variant="outline" size="lg" className="flex-1" onClick={onCancel}>
              Отмена
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
