"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Palette, Hammer, Clock, CheckCircle, Users, Award, ScanEye } from "lucide-react";
import { PageHeroCover } from "@/components/layout/PageHeroCover";
import { MarketingCtaCover } from "@/components/layout/MarketingCtaCover";
import { ConsultationRequestDialog } from "@/components/ConsultationRequestDialog";
import { ConsultationTriggerButton } from "@/components/ConsultationTriggerButton";

const SERVICES_HERO_BG = "/order-bg.jpg";
const SERVICES_CTA_BG = "/portfolio-header.jpg";

const Services = () => {
  const designSteps = [
    "Консультация и техническое задание",
    "Обмерный план и планировочные решения",
    "3D-визуализация и подбор материалов",
    "Рабочие чертежи и комплектация",
    "Авторский надзор за реализацией",
  ];

  const renovationSteps = [
    "Демонтажные работы",
    "Возведение перегородок и черновые работы",
    "Инженерные системы (электрика, сантехника)",
    "Чистовая отделка стен, потолков, полов",
    "Установка мебели и финишный декор",
  ];

  const supervisionSteps = [
    "Передача проекта и согласование",
    "Проверка сметы",
    "Разметка («обнос»)",
    "Контроль общестроительных работ",
    "Контроль закупки материалов",
    "Передача исполнительной документации",
  ];

  return (
    <div className="min-h-screen pt-16">
      <PageHeroCover
        imageSrc={SERVICES_HERO_BG}
        title="Наши услуги"
        subtitle="Полный цикл создания интерьера — от концепции до финишной отделки собственными силами"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="mb-20">
          <Card className="shadow-elegant overflow-hidden">
            <CardHeader className="bg-gradient-hero p-8">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-white/20 rounded-lg">
                  <Palette className="h-8 w-8 text-foreground" />
                </div>
                <div>
                  <CardTitle className="text-3xl font-display text-foreground">Интерьер под ключ</CardTitle>
                  <p className="text-muted-foreground text-lg">Разработка индивидуального интерьера и изготовление мебели</p>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-semibold text-foreground mb-6">Что включено</h3>
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
                  <h3 className="text-2xl font-semibold text-foreground mb-6">Особенности процесса</h3>
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

                  <Button variant="default" size="lg" className="w-full hover:scale-[1.02] transition-transform duration-300" asChild>
                    <Link href="/order">Заказать дизайн-проект</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="shadow-elegant overflow-hidden">
            <CardHeader className="bg-muted/50 p-8">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Hammer className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-3xl font-display text-foreground">Ремонт и отделка</CardTitle>
                  <p className="text-muted-foreground text-lg">Реализация проекта силами собственной команды</p>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-semibold text-foreground mb-6">Этапы ремонта</h3>
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
                  <h3 className="text-2xl font-semibold text-foreground mb-6">Преимущества</h3>
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

                  <Button variant="default" size="lg" className="w-full hover:scale-[1.02] transition-transform duration-300" asChild>
                    <Link href="/order">Заказать ремонт</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-20">
          <Card className="shadow-elegant overflow-hidden">
            <CardHeader className="bg-muted/50 p-8">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <ScanEye className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-3xl font-display text-foreground">Авторский надзор</CardTitle>
                  <p className="text-muted-foreground text-lg">Проследим, чтобы всё было выполнено согласно проекту</p>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-semibold text-foreground mb-6">Этапы надзора</h3>
                  <div className="space-y-4">
                    {supervisionSteps.map((step, index) => (
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
                  <h3 className="text-2xl font-semibold text-foreground mb-6">Преимущества</h3>
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

                  <Button variant="default" size="lg" className="w-full hover:scale-[1.02] transition-transform duration-300" asChild>
                    <Link href="/order">Заказать надзор</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <MarketingCtaCover
          className="mt-20"
          imageSrc={SERVICES_CTA_BG}
          title="Готовы обсудить ваш проект?"
          description="Оставьте заявку, и мы свяжемся с вами для консультации и расчета стоимости"
          actions={
            <ConsultationRequestDialog
              title="Получить консультацию"
              trigger={<ConsultationTriggerButton>Получить консультацию</ConsultationTriggerButton>}
            />
          }
        />
      </div>
    </div>
  );
};

export default Services;
