import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {ContactInfo} from "@/components/ContactInfo";

const Footer = () => {
  return (
    <footer className="bg-muted/50 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Contact Info */}
          <ContactInfo/>

          {/* Quick Contact */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">Быстрая связь</h3>
            <form className="space-y-3">
              <Input placeholder="Ваше имя" className="bg-background" />
              <Input placeholder="Телефон" className="bg-background" />
              <Textarea placeholder="Сообщение" className="bg-background h-20" />
              <Button variant="soft" className="w-full">
                Отправить
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