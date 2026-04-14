"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { submitLeadRequest } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { parseContactInput } from "@/lib/contact";
import { formatPhoneValue } from "@/lib/phone";

type ConsultationRequestDialogProps = {
  title?: string;
  trigger: ReactNode;
};

export function ConsultationRequestDialog({
  title = "Консультация",
  trigger,
}: ConsultationRequestDialogProps) {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [description, setDescription] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);

    const { email, phone_number } = parseContactInput(contact);
    if (!email && !phone_number) {
      setIsSubmitting(false);
      toast({ title: "Укажите корректный телефон или email", variant: "destructive" });
      return;
    }

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
      toast({ title: "Не удалось отправить", variant: "destructive" });
      return;
    }
    setOpen(false);
    setName("");
    setContact("");
    setDescription("");
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label htmlFor="consultation-name">Имя</Label>
            <Input
              id="consultation-name"
              required
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="consultation-contact">Телефон</Label>
            <Input
              id="consultation-contact"
              required
              type="text"
              autoComplete="tel"
              value={contact}
              onChange={(event) => {
                const value = event.target.value;
                setContact(value.includes("@") ? value : formatPhoneValue(value));
              }}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="consultation-description">Описание</Label>
            <Textarea
              id="consultation-description"
              rows={4}
              required
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
          </div>
          <Button type="submit" className="w-full hover:scale-[1.02] transition-transform duration-300" disabled={isSubmitting}>
            {isSubmitting ? "Отправка..." : "Отправить"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
