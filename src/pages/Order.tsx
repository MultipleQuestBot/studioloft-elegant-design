import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { CheckCircle, Star, Phone, Mail } from "lucide-react";

const Order = () => {
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

  const completedProjects = [
    {
      title: "Квартира 65 м² в ЖК «Северный»",
      result: "Светлая скандинавская квартира с функциональным зонированием",
      image: "/placeholder.svg"
    },
    {
      title: "Дом 150 м² в поселке «Лесной»",
      result: "Современный интерьер с камином и панорамными окнами",
      image: "/placeholder.svg"
    },
    {
      title: "Студия 40 м² в центре города",
      result: "Максимально функциональное пространство для молодой пары",
      image: "/placeholder.svg"
    }
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Header */}
      <section className="py-20 bg-gradient-hero">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-display font-semibold text-foreground mb-6">
            Персональный проект
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
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
                {completedProjects.map((project, index) => (
                  <Card key={index} className="shadow-soft">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-20 h-20 bg-muted rounded-lg flex-shrink-0">
                          <img 
                            src={project.image} 
                            alt={project.title}
                            className="w-full h-full object-cover rounded-lg"
                          />
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground mb-2">
                            {project.title}
                          </h4>
                          <p className="text-muted-foreground text-sm">
                            {project.result}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
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
                <form className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Имя *</Label>
                      <Input id="name" placeholder="Ваше имя" className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="phone">Телефон *</Label>
                      <Input id="phone" placeholder="+7 (999) 123-45-67" className="mt-1" />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="your@email.com" className="mt-1" />
                  </div>

                  <div>
                    <Label htmlFor="object-type">Тип объекта *</Label>
                    <Select>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Выберите тип объекта" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="apartment">Квартира</SelectItem>
                        <SelectItem value="house">Частный дом</SelectItem>
                        <SelectItem value="commercial">Коммерческое помещение</SelectItem>
                        <SelectItem value="office">Офис</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="area">Площадь (м²)</Label>
                      <Input id="area" placeholder="100" className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="rooms">Количество комнат</Label>
                      <Input id="rooms" placeholder="3" className="mt-1" />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="budget">Бюджет проекта</Label>
                    <Select>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Выберите диапазон" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="300-500">300 - 500 тыс. ₽</SelectItem>
                        <SelectItem value="500-1000">500 тыс. - 1 млн ₽</SelectItem>
                        <SelectItem value="1000-2000">1 - 2 млн ₽</SelectItem>
                        <SelectItem value="2000+">Более 2 млн ₽</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="description">Описание проекта</Label>
                    <Textarea 
                      id="description" 
                      placeholder="Расскажите о ваших пожеланиях, стиле, особенностях..."
                      className="mt-1 h-24"
                    />
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="design" />
                      <Label htmlFor="design">Дизайн-проект</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="renovation" />
                      <Label htmlFor="renovation">Ремонт и отделка</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="furniture" />
                      <Label htmlFor="furniture">Изготовление мебели</Label>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox id="consent" />
                    <Label htmlFor="consent" className="text-sm text-muted-foreground">
                      Согласен на обработку персональных данных
                    </Label>
                  </div>

                  <Button type="submit" className="w-full" size="lg">
                    Отправить заявку
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <Card className="mt-6 shadow-soft">
              <CardContent className="p-6">
                <h3 className="font-semibold text-foreground mb-4">
                  Или свяжитесь с нами напрямую
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-primary" />
                    <span className="text-foreground">+7 (999) 123-45-67</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-primary" />
                    <span className="text-foreground">hello@studioloft.ru</span>
                  </div>
                </div>
                <p className="text-muted-foreground text-sm mt-4">
                  Работаем ежедневно с 9:00 до 21:00
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;