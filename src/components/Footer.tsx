import { Instagram, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const Footer = () => {
  return (
    <footer className="bg-muted/50 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">Контакты</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-primary" />
                <span className="text-muted-foreground">+7 (999) 123-45-67</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-primary" />
                <span className="text-muted-foreground">hello@studioloft.ru</span>
              </div>
              <div className="flex items-center space-x-3">
                <Instagram className="h-5 w-5 text-primary" />
                <span className="text-muted-foreground">@studioloft_design</span>
              </div>
            </div>
          </div>

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
            © 2024 studioloft. Все права защищены.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;