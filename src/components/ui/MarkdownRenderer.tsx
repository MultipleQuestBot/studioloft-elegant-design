import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { cn } from "@/lib/utils";

type MarkdownRendererProps = {
  content: string;
  className?: string;
};

export function MarkdownRenderer({ content, className }: MarkdownRendererProps) {
  return (
    <div
      className={cn(
        "prose prose-neutral max-w-full text-muted-foreground font-medium leading-relaxed break-words whitespace-pre-wrap",
        "prose-headings:mt-6 prose-headings:mb-3 prose-headings:font-semibold prose-headings:text-foreground",
        "prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl",
        "prose-p:my-4",
        "prose-ul:my-4 prose-ul:list-disc prose-ul:pl-6",
        "prose-ol:my-4 prose-ol:list-decimal prose-ol:pl-6",
        "prose-li:my-1",
        "prose-table:block prose-table:w-full prose-table:overflow-x-auto",
        "prose-th:border prose-th:border-border prose-th:bg-muted/50 prose-th:px-3 prose-th:py-2 prose-th:text-left",
        "prose-td:border prose-td:border-border prose-td:px-3 prose-td:py-2",
        className,
      )}
    >
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </div>
  );
}
