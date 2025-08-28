import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CheckCircle, Clock, Users, Palette, Hammer, Award } from "lucide-react";
import heroImage from "@/assets/hero-interior.jpg";

const Home = () => {
  const advantages = [
    {
      icon: <Palette className="h-8 w-8" />,
      title: "Индивидуальный дизайн",
      description: "Каждый проект создается с нуля под ваши потребности и стиль жизни"
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Собственная команда",
      description: "Полный контроль качества благодаря работе с нашими мастерами"
    },
    {
      icon: <Hammer className="h-8 w-8" />,
      title: "Ремонт под ключ",
      description: "От проекта до финишной отделки — все в одних руках"
    },
    {
      icon: <Clock className="h-8 w-8" />,
      title: "Соблюдение сроков",
      description: "Четкое планирование и контроль на каждом этапе работ"
    },
    {
      icon: <CheckCircle className="h-8 w-8" />,
      title: "Авторский надзор",
      description: "Дизайнер контролирует реализацию проекта до мельчайших деталей"
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: "Гарантия качества",
      description: "Гарантируем результат и долговечность всех выполненных работ"
    }
  ];

  const faqItems = [
    {
      question: "Какие сроки реализации проекта?",
      answer: "Дизайн-проект занимает 2-4 недели, ремонтные работы — от 2 до 6 месяцев в зависимости от сложности и площади объекта."
    },
    {
      question: "Какие этапы включает работа?",
      answer: "Консультация → Замеры → Дизайн-проект → Согласование → Закупка материалов → Ремонтные работы → Расстановка мебели и декора."
    },
    {
      question: "Делаете ли вы только индивидуальную мебель?",
      answer: "Мы можем создать мебель по индивидуальным размерам и дизайну, а также подобрать готовые решения от проверенных производителей."
    },
    {
      question: "Работаете ли вы с существующим ремонтом?",
      answer: "Да, мы можем создать дизайн с учетом уже имеющейся отделки или предложить варианты частичного обновления интерьера."
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-black/20"></div>
        </div>
        
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-display font-light mb-6 leading-tight">
            Создаем пространства<br />
            <span className="font-semibold">для жизни</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-2xl mx-auto">
            Индивидуальный дизайн интерьера с полным сопровождением проекта от идеи до ключей
          </p>
          <div className="space-x-4">
            <Button variant="hero" size="lg" className="text-lg px-8 py-3">
              Начать проект
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-3 border-white text-white hover:bg-white hover:text-black">
              Посмотреть работы
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-gradient-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-display font-semibold text-foreground mb-6">
                О студии studioloft
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Мы — команда профессионалов, которая создает уникальные интерьеры с полным циклом реализации. 
                  От первого эскиза до финишной отделки.
                </p>
                <p>
                  Наша особенность — собственная бригада строителей и мастеров, что позволяет 
                  гарантировать качество и соблюдение авторского замысла на каждом этапе.
                </p>
                <p>
                  Каждый проект для нас — это история о людях, которые будут жить в созданном пространстве. 
                  Поэтому мы уделяем особое внимание вашему образу жизни и потребностям.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-6">
                <Card className="shadow-soft">
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl font-bold text-primary mb-2">120+</div>
                    <div className="text-sm text-muted-foreground">Реализованных проектов</div>
                  </CardContent>
                </Card>
                <Card className="shadow-soft">
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl font-bold text-primary mb-2">5</div>
                    <div className="text-sm text-muted-foreground">Лет на рынке</div>
                  </CardContent>
                </Card>
              </div>
              <div className="space-y-6 mt-8">
                <Card className="shadow-soft">
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl font-bold text-primary mb-2">15</div>
                    <div className="text-sm text-muted-foreground">Специалистов в команде</div>
                  </CardContent>
                </Card>
                <Card className="shadow-soft">
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl font-bold text-primary mb-2">100%</div>
                    <div className="text-sm text-muted-foreground">Довольных клиентов</div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Advantages Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-semibold text-foreground mb-4">
              Почему выбирают нас
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Каждое преимущество — это результат многолетнего опыта и стремления к совершенству
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {advantages.map((advantage, index) => (
              <Card key={index} className="shadow-soft hover:shadow-elegant transition-all duration-300 group">
                <CardContent className="p-8 text-center">
                  <div className="text-primary mb-4 flex justify-center group-hover:scale-110 transition-transform duration-300">
                    {advantage.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {advantage.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {advantage.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-semibold text-foreground mb-4">
              Часто задаваемые вопросы
            </h2>
            <p className="text-xl text-muted-foreground">
              Ответы на самые популярные вопросы о нашей работе
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqItems.map((item, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`} 
                className="bg-background border border-border rounded-lg px-6 shadow-soft"
              >
                <AccordionTrigger className="text-left font-medium">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-display font-semibold text-foreground mb-6">
            Готовы создать дом вашей мечты?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Запишитесь на бесплатную консультацию, и мы обсудим ваш проект
          </p>
          <Button variant="default" size="lg" className="text-lg px-8 py-3">
            Записаться на консультацию
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;