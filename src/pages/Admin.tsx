import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Upload, Plus, Image as ImageIcon, FileText, Phone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Admin = () => {
  const [uploadStep, setUploadStep] = useState<'form' | 'success'>('form');
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setUploadStep('success');
    toast({
      title: "Проект отправлен!",
      description: "Мы рассмотрим вашу заявку и свяжемся с вами в течение 2-3 дней.",
    });
  };

  if (uploadStep === 'success') {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <div className="max-w-md mx-auto px-4 text-center">
          <Card className="shadow-elegant">
            <CardContent className="p-8">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Plus className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                Заявка отправлена!
              </h2>
              <p className="text-muted-foreground mb-6">
                Спасибо за интерес к нашему портфолио. Мы рассмотрим ваш проект и свяжемся с вами в ближайшие дни.
              </p>
              <Button 
                onClick={() => setUploadStep('form')} 
                variant="outline" 
                className="w-full"
              >
                Отправить еще один проект
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16">
      {/* Header */}
      <section className="py-20 bg-gradient-subtle">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-display font-semibold text-foreground mb-6">
            Добавить проект в портфолио
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Поделитесь своим интерьерным проектом с нами. Лучшие работы мы разместим в нашем портфолио.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Info Sidebar */}
          <div className="lg:col-span-1">
            <Card className="shadow-soft mb-6">
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-primary" />
                  Требования
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div>
                  <Badge variant="secondary" className="mb-2">Фотографии</Badge>
                  <p className="text-sm text-muted-foreground">
                    5-15 качественных фото интерьера в высоком разрешении
                  </p>
                </div>
                <div>
                  <Badge variant="secondary" className="mb-2">Описание</Badge>
                  <p className="text-sm text-muted-foreground">
                    Краткое описание проекта, площадь, стиль, особенности
                  </p>
                </div>
                <div>
                  <Badge variant="secondary" className="mb-2">Контакты</Badge>
                  <p className="text-sm text-muted-foreground">
                    Данные для связи и согласования публикации
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Phone className="h-5 w-5 mr-2 text-primary" />
                  Связь с нами
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-sm text-muted-foreground mb-4">
                  Есть вопросы о размещении в портфолио?
                </p>
                <div className="space-y-2 text-sm">
                  <p>📞 +7 (999) 123-45-67</p>
                  <p>📧 portfolio@studioloft.ru</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Upload Form */}
          <div className="lg:col-span-2">
            <Card className="shadow-elegant">
              <CardHeader>
                <CardTitle className="text-2xl font-display">
                  Форма подачи проекта
                </CardTitle>
                <p className="text-muted-foreground">
                  Заполните информацию о вашем проекте
                </p>
              </CardHeader>
              <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Project Info */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-foreground">
                      Информация о проекте
                    </h3>
                    
                    <div>
                      <Label htmlFor="project-title">Название проекта *</Label>
                      <Input 
                        id="project-title" 
                        placeholder="Например: Современная квартира в центре города" 
                        className="mt-1" 
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="project-type">Тип объекта *</Label>
                        <Select required>
                          <SelectTrigger className="mt-1">
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
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="style">Стиль интерьера</Label>
                      <Input 
                        id="style" 
                        placeholder="Например: скандинавский, лофт, классический" 
                        className="mt-1" 
                      />
                    </div>

                    <div>
                      <Label htmlFor="description">Описание проекта *</Label>
                      <Textarea 
                        id="description" 
                        placeholder="Расскажите об особенностях проекта, использованных материалах, цветовых решениях..."
                        className="mt-1 h-32"
                        required
                      />
                    </div>
                  </div>

                  {/* Photos Upload */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-foreground">
                      Фотографии проекта
                    </h3>
                    
                    <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                      <ImageIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <div className="space-y-2">
                        <p className="text-foreground font-medium">
                          Загрузите фотографии проекта
                        </p>
                        <p className="text-muted-foreground text-sm">
                          Поддерживаются форматы: JPG, PNG. Максимум 15 файлов.
                        </p>
                      </div>
                      <Button type="button" variant="outline" className="mt-4">
                        <Upload className="h-4 w-4 mr-2" />
                        Выбрать файлы
                      </Button>
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-foreground">
                      Контактная информация
                    </h3>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="author-name">Ваше имя *</Label>
                        <Input 
                          id="author-name" 
                          placeholder="Имя Фамилия" 
                          className="mt-1" 
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="author-phone">Телефон *</Label>
                        <Input 
                          id="author-phone" 
                          placeholder="+7 (999) 123-45-67" 
                          className="mt-1" 
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="author-email">Email *</Label>
                      <Input 
                        id="author-email" 
                        type="email" 
                        placeholder="your@email.com" 
                        className="mt-1" 
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="company">Компания/студия</Label>
                      <Input 
                        id="company" 
                        placeholder="Название компании (если есть)" 
                        className="mt-1" 
                      />
                    </div>
                  </div>

                  <div className="pt-6 border-t">
                    <Button type="submit" className="w-full" size="lg">
                      Отправить проект на рассмотрение
                    </Button>
                    <p className="text-xs text-muted-foreground text-center mt-4">
                      Отправляя форму, вы соглашаетесь на обработку персональных данных и возможную публикацию проекта в нашем портфолио
                    </p>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;