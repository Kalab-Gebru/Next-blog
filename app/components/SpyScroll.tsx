// "use client";
import { headings } from "@/types";

type Props = {
  titles: headings[];
};
function SpyScroll({ titles }: Props) {
  return (
    <div className="sticky p-8 hidden lg:block border-2 rounded-lg top-[100px] dark:border-gray-400 w-96 h-fit">
      <h3 className="mb-2 text-2xl font-bold">Content:</h3>

      <div className="flex flex-col gap-1 text-sm">
        {titles.map((t, i) => (
          <li
            className="px-2 list-none border-l-4"
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
