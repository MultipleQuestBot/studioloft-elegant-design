import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Filter } from "lucide-react";

const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState("all");

  const filters = [
    { id: "all", label: "Все проекты" },
    { id: "apartment", label: "Квартиры" },
    { id: "house", label: "Дома" },
    { id: "renovation", label: "Ремонт" }
  ];

  // Placeholder projects data
  const projects = [
    {
      id: 1,
      title: "Светлая квартира в скандинавском стиле",
      category: "apartment",
      area: "75 м²",
      duration: "3 месяца",
      description: "Минималистичный интерьер с акцентом на натуральные материалы",
      image: "/placeholder.svg"
    },
    {
      id: 2,
      title: "Современный загородный дом",
      category: "house",
      area: "180 м²",
      duration: "6 месяцев",
      description: "Открытые пространства с панорамными окнами",
      image: "/placeholder.svg"
    },
    {
      id: 3,
      title: "Капитальный ремонт двухкомнатной квартиры",
      category: "renovation",
      area: "65 м²",
      duration: "4 месяца",
      description: "Полная перепланировка с объединением кухни и гостиной",
      image: "/placeholder.svg"
    },
    {
      id: 4,
      title: "Элегантная квартира в центре города",
      category: "apartment",
      area: "95 м²",
      duration: "3.5 месяца",
      description: "Классический интерьер с современными удобствами",
      image: "/placeholder.svg"
    },
    {
      id: 5,
      title: "Дом у озера",
      category: "house",
      area: "220 м²",
      duration: "8 месяцев",
      description: "Интерьер в стиле эко с большими окнами",
      image: "/placeholder.svg"
    },
    {
      id: 6,
      title: "Студия для молодой семьи",
      category: "renovation",
      area: "45 м²",
      duration: "2 месяца",
      description: "Функциональное зонирование малогабаритного пространства",
      image: "/placeholder.svg"
    }
  ];

  const filteredProjects = activeFilter === "all" 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  return (
    <div className="min-h-screen pt-16">
      {/* Header */}
      <section className="py-20 bg-gradient-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-display font-semibold text-foreground mb-6">
            Портфолио
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Реализованные проекты — от уютных квартир до просторных загородных домов
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Filters */}
        <div className="flex flex-wrap items-center gap-4 mb-12">
          <div className="flex items-center text-muted-foreground">
            <Filter className="h-5 w-5 mr-2" />
            <span className="font-medium">Фильтр:</span>
          </div>
          {filters.map((filter) => (
            <Button
              key={filter.id}
              variant={activeFilter === filter.id ? "default" : "outline"}
              onClick={() => setActiveFilter(filter.id)}
              className="transition-all duration-300"
            >
              {filter.label}
            </Button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <Card 
              key={project.id} 
              className="group shadow-soft hover:shadow-elegant transition-all duration-300 cursor-pointer overflow-hidden"
            >
              <div className="aspect-[4/3] bg-muted relative overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>
              </div>
              
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="secondary" className="text-xs">
                    {project.area}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {project.duration}
                  </Badge>
                </div>
                
                <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {project.description}
                </p>

                <Button 
                  variant="ghost" 
                  className="w-full mt-4 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300"
                >
                  Подробнее
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg">
              Проекты в данной категории пока не добавлены
            </p>
          </div>
        )}

        {/* Load More */}
        {filteredProjects.length > 0 && (
          <div className="text-center mt-16">
            <Button variant="outline" size="lg">
              Показать еще проекты
            </Button>
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-20 text-center bg-gradient-hero p-12 rounded-lg">
          <h2 className="text-3xl font-display font-semibold text-foreground mb-4">
            Хотите увидеть свой проект в нашем портфолио?
          </h2>
          <p className="text-muted-foreground text-lg mb-6 max-w-2xl mx-auto">
            Начните создавать интерьер вашей мечты вместе с нами
          </p>
          <Button variant="default" size="lg">
            Обсудить проект
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;