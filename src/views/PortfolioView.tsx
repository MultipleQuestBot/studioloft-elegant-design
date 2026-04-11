"use client";

import { useMemo, useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import { getProjects } from "@/lib/api";
import type { Project, ProjectType } from "@/types/project";
import { PROJECT_TYPES } from "@/constants/project-types";
import { PortfolioFeedbackDialog } from "@/components/portfolio/PortfolioFeedbackDialog";
import { ProjectPreviewCard } from "@/components/portfolio/ProjectPreviewCard";
import { PageHeroCover } from "@/components/layout/PageHeroCover";
import { MarketingCtaCover } from "@/components/layout/MarketingCtaCover";

const PAGE_LIMIT = 12;

const PORTFOLIO_HERO_BG = "/portfolio-header.jpg";
const PORTFOLIO_CTA_BG = "/order-bg.jpg";

type PortfolioViewProps = {
  initialProjects: Project[];
  initialHasMore: boolean;
};

const Portfolio = ({ initialProjects, initialHasMore }: PortfolioViewProps) => {
  const [isPending, startTransition] = useTransition();
  const [activeFilter, setActiveFilter] = useState<ProjectType | "all">("all");
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(initialHasMore);

  const filters = useMemo(
    () => [{ id: "all" as const, label: "Все проекты" }, ...PROJECT_TYPES],
    [],
  );

  async function handleFilterChange(nextFilter: ProjectType | "all") {
    setActiveFilter(nextFilter);
    const result = await getProjects({
      type: nextFilter === "all" ? undefined : nextFilter,
      page: 1,
      limit: PAGE_LIMIT,
    });
    setProjects(result.items);
    setCurrentPage(1);
    setHasMore(result.hasMore);
  }

  async function handleLoadMore() {
    const nextPage = currentPage + 1;
    const result = await getProjects({
      type: activeFilter === "all" ? undefined : activeFilter,
      page: nextPage,
      limit: PAGE_LIMIT,
    });
    setProjects((prev) => [...prev, ...result.items]);
    setCurrentPage(nextPage);
    setHasMore(result.hasMore);
  }

  return (
    <div className="min-h-screen pt-16">
      <PageHeroCover
        imageSrc={PORTFOLIO_HERO_BG}
        title="Портфолио"
        subtitle="Реализованные проекты — от уютных квартир до просторных загородных домов"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex flex-wrap items-center gap-4 mb-12">
          <div className="flex items-center text-muted-foreground">
            <Filter className="h-5 w-5 mr-2" />
            <span className="font-medium">Фильтр:</span>
          </div>
          {filters.map((filter) => (
            <Button
              key={filter.id}
              variant={activeFilter === filter.id ? "default" : "outline"}
              onClick={() =>
                startTransition(() => {
                  void handleFilterChange(filter.id);
                })
              }
              className="transition-all duration-300 hover:scale-105"
              disabled={isPending}
            >
              {filter.label}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <ProjectPreviewCard
              key={project.id}
              project={project}
              imageSizes="(max-width: 768px) 100vw, 33vw"
            />
          ))}
        </div>

        {projects.length === 0 && (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg">Проекты в данной категории пока не добавлены</p>
          </div>
        )}

        {projects.length > 0 && hasMore && (
          <div className="text-center mt-16">
            <Button
              variant="outline"
              size="lg"
              onClick={() =>
                startTransition(() => {
                  void handleLoadMore();
                })
              }
              className="hover:scale-105 transition-transform duration-300"
              disabled={isPending}
            >
              Ещё
            </Button>
          </div>
        )}

        <MarketingCtaCover
          className="mt-20"
          imageSrc={PORTFOLIO_CTA_BG}
          title="Хотите увидеть свой проект в нашем портфолио?"
          description="Начните создавать интерьер вашей мечты вместе с нами"
          actions={<PortfolioFeedbackDialog />}
        />
      </div>
    </div>
  );
};

export default Portfolio;
