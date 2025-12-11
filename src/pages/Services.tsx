import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Palette, Hammer, Clock, CheckCircle, Users, Award, ScanEye} from "lucide-react";

const Services = () => {
  const designSteps = [
    "Консультация и техническое задание",
    "Обмерный план и планировочные решения", 
    "3D-визуализация и подбор материалов",
    "Рабочие чертежи и комплектация",
    "Авторский надзор за реализацией"
  ];

  const renovationSteps = [
    "Демонтажные работы",
    "Возведение перегородок и черновые работы",
    "Инженерные системы (электрика, сантехника)",
    "Чистовая отделка стен, потолков, полов",
    "Установка мебели и финишный декор"
  ];

  const supervisionSteps = ["Передача проекта и согласование", 
    "Проверка сметы", 
    "Разметка («обнос»)",
    "Контроль общестроительных работ",
    "Контроль закупки материалов",
    "Передача исполнительной документации"
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Header */}
      <section className="py-20 bg-gradient-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-display font-semibold text-foreground mb-6">
            Наши услуги
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Полный цикл создания интерьера — от концепции до финишной отделки собственными силами
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Interior Design Service */}
        <div className="mb-20">
          <Card className="shadow-elegant overflow-hidden">
            <CardHeader className="bg-gradient-hero p-8">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-white/20 rounded-lg">
                  <Palette className="h-8 w-8 text-foreground" />
                </div>
                <div>
                  <CardTitle className="text-3xl font-display text-foreground">
                    Интерьер под ключ
                  </CardTitle>
                  <p className="text-muted-foreground text-lg">
                    Разработка индивидуального интерьера и изготовление мебели
                  </p>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-semibold text-foreground mb-6">
                    Что включено
                  </h3>
                  <div className="space-y-4">
                    {designSteps.map((step, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="flex-shrink-0 w-8 h-8 bg-primary/10 text-primary rounded-full flex items-center justify-center text-sm font-semibold">
                          {index + 1}
                        </div>
                        <div>
                          <p className="text-foreground font-medium">{step}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-semibold text-foreground mb-6">
                    Особенности процесса
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-primary" />
                      <span className="text-muted-foreground">Индивидуальная мебель по размерам</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-primary" />
                      <span className="text-muted-foreground">Подбор всех материалов и декора</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-primary" />
                      <span className="text-muted-foreground">3D-визуализация каждой комнаты</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-primary" />
                      <span className="text-muted-foreground">Сопровождение до сдачи объекта</span>
                    </div>
                  </div>

                  <Separator className="my-6" />

                  <div className="flex flex-wrap gap-2 mb-6">
                    <Badge variant="secondary">2-4 недели</Badge>
                    <Badge variant="secondary">От 3000 ₽/м²</Badge>
                    <Badge variant="secondary">Гарантия</Badge>
                  </div>

                  <Button variant="default" size="lg" className="w-full">
                    Заказать дизайн-проект
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Renovation Service */}
        <div>
          <Card className="shadow-elegant overflow-hidden">
            <CardHeader className="bg-muted/50 p-8">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Hammer className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-3xl font-display text-foreground">
                    Ремонт и отделка
                  </CardTitle>
                  <p className="text-muted-foreground text-lg">
                    Реализация проекта силами собственной команды
                  </p>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-semibold text-foreground mb-6">
                    Этапы ремонта
                  </h3>
                  <div className="space-y-4">
                    {renovationSteps.map((step, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="flex-shrink-0 w-8 h-8 bg-secondary/10 text-secondary-foreground rounded-full flex items-center justify-center text-sm font-semibold">
                          {index + 1}
                        </div>
                        <div>
                          <p className="text-foreground font-medium">{step}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-semibold text-foreground mb-6">
                    Преимущества
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Users className="h-5 w-5 text-primary" />
                      <span className="text-muted-foreground">Собственная бригада мастеров</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Clock className="h-5 w-5 text-primary" />
                      <span className="text-muted-foreground">Соблюдение сроков</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Award className="h-5 w-5 text-primary" />
                      <span className="text-muted-foreground">Контроль качества на каждом этапе</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-primary" />
                      <span className="text-muted-foreground">Авторский надзор дизайнера</span>
                    </div>
                  </div>

                  <Separator className="my-6" />

                  <div className="flex flex-wrap gap-2 mb-6">
                    <Badge variant="secondary">2-6 месяцев</Badge>
                    <Badge variant="secondary">От 15000 ₽/м²</Badge>
                    <Badge variant="secondary">Гарантия 2 года</Badge>
                  </div>

                  <Button variant="default" size="lg" className="w-full">
                    Заказать ремонт
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        {/* Supervision Service */}
        <div className="mt-20" >
          <Card className="shadow-elegant overflow-hidden">
            <CardHeader className="bg-muted/50 p-8">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <ScanEye className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-3xl font-display text-foreground">
                    Авторский надзор
                  </CardTitle>
                  <p className="text-muted-foreground text-lg">
                    Проследим, чтобы всё было выполнено согласно проекту
                  </p>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-semibold text-foreground mb-6">
                    Этапы надзора
                  </h3>
                  <div className="space-y-4">
                    {renovationSteps.map((step, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="flex-shrink-0 w-8 h-8 bg-secondary/10 text-secondary-foreground rounded-full flex items-center justify-center text-sm font-semibold">
                          {index + 1}
                        </div>
                        <div>
                          <p className="text-foreground font-medium">{step}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-semibold text-foreground mb-6">
                    Преимущества
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-primary" />
                      <span className="text-muted-foreground">Регулярные выезды (обычно 1-2 раза в неделю)</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-primary" />
                      <span className="text-muted-foreground">Внеплановые выезды</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-primary" />
                      <span className="text-muted-foreground">Удаленная поддержка</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-primary" />
                      <span className="text-muted-foreground">Постоянная коммуникация с заказчиком </span>
                    </div>
                  </div>

                  <Separator className="my-6" />

                  <div className="flex flex-wrap gap-2 mb-6">
                    <Badge variant="secondary">2-6 месяцев</Badge>
                    <Badge variant="secondary">От 15000 ₽/м²</Badge>
                    <Badge variant="secondary">Гарантия 2 года</Badge>
                  </div>

                  <Button variant="default" size="lg" className="w-full">
                    Заказать надзор
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        {/* CTA Section */}
        <div className="mt-20 text-center bg-gradient-hero p-12 rounded-lg">
          <h2 className="text-3xl font-display font-semibold text-foreground mb-4">
            Готовы обсудить ваш проект?
          </h2>
          <p className="text-muted-foreground text-lg mb-6 max-w-2xl mx-auto">
            Оставьте заявку, и мы свяжемся с вами для консультации и расчета стоимости
          </p>
          <Button variant="default" size="lg">
            Получить консультацию
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Services;