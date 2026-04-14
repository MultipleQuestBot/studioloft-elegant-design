"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { CheckCircle, Star } from "lucide-react";
import { ContactInfo } from "@/components/ContactInfo";
import { useState, type FormEvent } from "react";
import type { Project } from "@/types/project";
import { ProjectPreviewCard } from "@/components/portfolio/ProjectPreviewCard";
import { submitLeadRequest } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

type OrderViewProps = {
  projects: Project[];
};

const PHONE_MASK_PREFIX = "+7 ";

function formatPhoneValue(value: string): string {
  const digits = value.replace(/\D/g, "");
  const normalized = digits.startsWith("7") ? digits.slice(1, 11) : digits.slice(0, 10);

  if (normalized.length === 0) return PHONE_MASK_PREFIX;

  let result = `${PHONE_MASK_PREFIX}(`;
  result += normalized.slice(0, 3);
  if (normalized.length >= 3) result += ") ";
  if (normalized.length > 3) result += normalized.slice(3, 6);
  if (normalized.length >= 6) result += "-";
  if (normalized.length > 6) result += normalized.slice(6, 8);
  if (normalized.length >= 8) result += "-";
  if (normalized.length > 8) result += normalized.slice(8, 10);

  return result;
}

const Order = ({ projects }: OrderViewProps) => {
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState(PHONE_MASK_PREFIX);
  const [objectType, setObjectType] = useState("");
  const [customObjectType, setCustomObjectType] = useState("");
  const [area, setArea] = useState("");
  const [rooms, setRooms] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!objectType) {
      toast({ title: "Укажите тип объекта", variant: "destructive" });
      return;
    }
    if (objectType === "other" && !customObjectType.trim()) {
      toast({ title: "Уточните тип объекта", variant: "destructive" });
      return;
    }

    const phoneDigits = phone.replace(/\D/g, "");
    const phoneForApi =
      phoneDigits.length >= 10 ? `+${phoneDigits.startsWith("7") ? phoneDigits : `7${phoneDigits}`}` : null;
    const emailTrim = email.trim();
    const emailForApi = emailTrim.length > 0 ? emailTrim : null;

    if (!phoneForApi && !emailForApi) {
      toast({ title: "Укажите телефон или email", variant: "destructive" });
      return;
    }

    const areaNum = area.trim() ? Number.parseInt(area, 10) : Number.NaN;
    const roomsNum = rooms.trim() ? Number.parseInt(rooms, 10) : Number.NaN;

    setIsSubmitting(true);
    const ok = await submitLeadRequest({
      name: name.trim(),
      email: emailForApi,
      phone_number: phoneForApi,
      description: description.trim() || "Заявка с страницы заказа",
      square_footage: Number.isFinite(areaNum) ? areaNum : null,
      object_type: objectType === "other" ? customObjectType.trim() : objectType,
      number_of_rooms: Number.isFinite(roomsNum) ? roomsNum : null,
    });
    setIsSubmitting(false);

    if (!ok) {
      toast({ title: "Не удалось отправить заявку", variant: "destructive" });
      return;
    }

    toast({ title: "Заявка отправлена", description: "Мы свяжемся с вами в ближайшее время." });
    setName("");
    setEmail("");
    setPhone(PHONE_MASK_PREFIX);
    setObjectType("");
    setCustomObjectType("");
    setArea("");
    setRooms("");
    setDescription("");
  }

  const packageFeatures = [
    "Планировочное решение",
    "3D-визуализация всех помещений",
    "Подбор отделочных материалов",
    "Дизайн освещения",
    "Индивидуальная мебель",
    "Декор и аксессуары",
    "Рабочие чертежи",
    "Авторский надзор"
  ];

  return (
    <div className="min-h-screen pt-16">
      <section className="relative py-24 overflow-hidden">
        <Image
          src="/order-bg.jpg"
          alt="Персональный проект"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/45 to-black/60" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-display font-semibold text-white mb-6">
            Персональный проект
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Создаем интерьер полностью под ваши потребности — от планировки до последней детали
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Package Description */}
          <div>
            <Card className="shadow-elegant mb-8">
              <CardHeader className="bg-muted/30">
                <CardTitle className="text-2xl font-display flex items-center">
                  <Star className="h-6 w-6 text-primary mr-3" />
                  Что включено в персональный проект
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {packageFeatures.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                      <span className="text-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Examples */}
            <div>
              <h3 className="text-2xl font-display font-semibold text-foreground mb-6">
                Примеры реализованных решений
              </h3>
              <div className="space-y-6">
                {projects.map((project) => (
                  <ProjectPreviewCard
                    key={project.id}
                    project={project}
                    imageSizes="(max-width: 1024px) 100vw, 50vw"
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Order Form */}
          <div>
            <Card className="shadow-elegant">
              <CardHeader>
                <CardTitle className="text-2xl font-display">
                  Заказать персональный проект
                </CardTitle>
                <p className="text-muted-foreground">
                  Заполните форму, и мы свяжемся с вами для обсуждения деталей
                </p>
              </CardHeader>
              <CardContent className="p-6">
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Имя *</Label>
                      <Input
                        id="name"
                        placeholder="Ваше имя"
                        className="mt-1"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Телефон *</Label>
                      <Input
                        id="phone"
                        value={phone}
                        onChange={(event) => setPhone(formatPhoneValue(event.target.value))}
                        placeholder="+7 (999) 123-45-67"
                        className="mt-1"
                        inputMode="tel"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      className="mt-1"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div>
                    <Label htmlFor="object-type">Тип объекта *</Label>
                    <Select
                      value={objectType}
                      onValueChange={(value) => {
                        setObjectType(value);
                        if (value !== "other") setCustomObjectType("");
                      }}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Выберите тип объекта" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="apartment">Квартира</SelectItem>
                        <SelectItem value="house">Частный дом</SelectItem>
                        <SelectItem value="commercial">Коммерческое помещение</SelectItem>
                        <SelectItem value="office">Офис</SelectItem>
                        <SelectItem value="other">Другое</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {objectType === "other" && (
                    <div>
                      <Label htmlFor="custom-object-type">Уточните тип объекта *</Label>
                      <Input
                        id="custom-object-type"
                        value={customObjectType}
                        onChange={(event) => setCustomObjectType(event.target.value)}
                        placeholder="Например: таунхаус, студия, лофт"
                        className="mt-1"
                      />
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="area">Площадь (м²)</Label>
                      <Input
                        id="area"
                        placeholder="100"
                        className="mt-1"
                        inputMode="numeric"
                        value={area}
                        onChange={(e) => setArea(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="rooms">Количество комнат</Label>
                      <Input
                        id="rooms"
                        placeholder="3"
                        className="mt-1"
                        inputMode="numeric"
                        value={rooms}
                        onChange={(e) => setRooms(e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="description">Описание проекта</Label>
                    <Textarea
                      id="description"
                      placeholder="Расскажите о ваших пожеланиях, стиле, особенностях..."
                      className="mt-1 h-24"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>

                  <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                    {isSubmitting ? "Отправка..." : "Отправить заявку"}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <Card className="mt-6 shadow-soft">
              <CardContent className="p-6">
                <ContactInfo/>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;