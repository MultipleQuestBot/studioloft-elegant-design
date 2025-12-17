import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Filter } from "lucide-react";
import config from "@/ApiConfig";

const MAX_PER_PAGE = 6;

const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [visibleProjects, setVisibleProjects] = useState(MAX_PER_PAGE);
  const [allProjects, setAllProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch projects once on mount, with abort support
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchProjects = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${config.backendPath}/portfolio`, { signal });
        if (!res.ok) throw new Error(`Ошибка: ${res.status}`);
        const data = await res.json();
        // guard: expect array
        setAllProjects(Array.isArray(data) ? data : []);
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error(err);
          setError("Не удалось загрузить проекты");
          setAllProjects([]);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();

    return () => controller.abort();
  }, []);

  const filters = [
    { id: "all", label: "Все проекты" },
    { id: "apartment", label: "Квартиры" },
    { id: "house", label: "Дома" },
    { id: "renovation", label: "Ремонт" }
  ];

  // memoize filtered list
  const filteredProjects = useMemo(() => {
    if (activeFilter === "all") return allProjects;
    return allProjects.filter(project => project.category === activeFilter);
  }, [allProjects, activeFilter]);

  // Reset visibleProjects when filter changes (so items don't "накопляются")
  useEffect(() => {
    setVisibleProjects(MAX_PER_PAGE);
  }, [activeFilter]);

  // Slice visible items
  const projectsToShow = filteredProjects.slice(0, visibleProjects);

  // Handler for "Показать ещё" — ограничиваем по фактическому объёму
  function handleMoreProjects() {
    setVisibleProjects(prev => {
      const next = prev + MAX_PER_PAGE;
      return Math.min(next, filteredProjects.length);
    });
  }

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

        {/* Loading / Error */}
        {loading && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Загрузка проектов…</p>
          </div>
        )}

        {error && (
          <div className="text-center py-12">
            <p className="text-destructive">{error}</p>
          </div>
        )}

        {/* Projects Grid */}
        {!loading && !error && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projectsToShow.map((project) => (
                <Card
                  key={project.id ?? `${project.title}-${Math.random()}`}
                  className="group shadow-soft hover:shadow-elegant transition-all duration-300 cursor-pointer overflow-hidden"
                >
                  <div className="aspect-[4/3] bg-muted relative overflow-hidden">
                    {project.image && (
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    )}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>
                  </div>

                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      {project.area && (
                        <Badge variant="secondary" className="text-xs">
                          {project.area}
                        </Badge>
                      )}
                      {project.duration && (
                        <Badge variant="outline" className="text-xs">
                          {project.duration}
                        </Badge>
                      )}
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

            {/* Load More — показываем только если ещё есть скрытые */}
            {filteredProjects.length > 0 && visibleProjects < filteredProjects.length && (
              <div className="text-center mt-16">
                <Button variant="outline" size="lg" onClick={handleMoreProjects}>
                  Показать еще проекты
                </Button>
              </div>
            )}
          </>
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
