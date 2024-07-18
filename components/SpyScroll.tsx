// "use client";
import { Card, CardTitle } from "@/components/ui/card";
import { headings } from "@/types";

type Props = {
  titles: headings[];
};
function SpyScroll({ titles }: Props) {
  return (
    <div className="sticky p-8 hidden lg:block top-[100px] w-96 h-fit">
      <CardTitle className="mb-2 text-2xl font-bold">Content:</CardTitle>

      <div className="flex flex-col gap-1 text-sm">
        {titles.map((t, i) => (
          <li
            className="inline-block no-underline transition-colors hover:text-foreground text-muted-foreground"
            data-to-scrollspy-id={`${i}`}
            key={i}
          >
            <a href={`#${i}`}>{t.text}</a>
          </li>
        ))}
      </div>
    </div>
  );
}

export default SpyScroll;
