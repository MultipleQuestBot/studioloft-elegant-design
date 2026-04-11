"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

type ConsultationRequestDialogProps = {
  title?: string;
  trigger: ReactNode;
};

export function ConsultationRequestDialog({
  title = "Консультация",
  trigger,
}: ConsultationRequestDialogProps) {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [description, setDescription] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);

    await fetch("/api/portfolio-feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, contact, description }),
    });

    setIsSubmitting(false);
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
            <Label htmlFor="consultation-contact">Телефон или email</Label>
            <Input
              id="consultation-contact"
              required
              type="text"
              autoComplete="email"
              value={contact}
              onChange={(event) => setContact(event.target.value)}
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
