"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {ContactInfo} from "@/components/ContactInfo";
import { submitLeadRequest } from "@/lib/api";
import { formatPhoneValue, normalizePhoneToApi } from "@/lib/phone";
import { useToast } from "@/hooks/use-toast";

const Footer = () => {
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [phoneOrEmail, setPhoneOrEmail] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const contact = phoneOrEmail.trim();
    const email = contact.includes("@") ? contact : null;
    const phone_number = contact.includes("@") ? null : normalizePhoneToApi(contact);

    if (!name.trim() || !description.trim() || (!email && !phone_number)) {
      toast({
        title: "Проверьте данные формы",
        description: "Укажите имя, описание и корректный телефон или email.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    const ok = await submitLeadRequest({
      name: name.trim(),
      email,
      phone_number,
      description: description.trim(),
      square_footage: null,
      object_type: null,
      number_of_rooms: null,
    });
    setIsSubmitting(false);

    if (!ok) {
      toast({ title: "Не удалось отправить заявку", variant: "destructive" });
      return;
    }

    toast({ title: "Заявка отправлена", description: "Мы свяжемся с вами в ближайшее время." });
    setName("");
    setPhoneOrEmail("");
    setDescription("");
  }

  return (
    <footer className="bg-muted/50 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Contact Info */}
          <ContactInfo/>

          {/* Quick Contact */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">Быстрая связь</h3>
            <form className="space-y-3" onSubmit={handleSubmit}>
              <Input
                placeholder="Ваше имя"
                className="bg-background"
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
              />
              <Input
                placeholder="Телефон или email"
                className="bg-background"
                value={phoneOrEmail}
                onChange={(event) => {
                  const value = event.target.value;
                  setPhoneOrEmail(value.includes("@") ? value : formatPhoneValue(value));
                }}
                required
              />
              <Textarea
                placeholder="Сообщение"
                className="bg-background h-20"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                required
              />
              <Button variant="soft" className="w-full" type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Отправка..." : "Отправить"}
              </Button>
            </form>
          </div>

          {/* About */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">studioloft</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Создаем уникальные интерьеры с полным сопровождением проекта — от дизайна до финишной отделки собственными силами.
            </p>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-muted-foreground text-sm">
            © 2026 studioloft. Все права защищены.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;