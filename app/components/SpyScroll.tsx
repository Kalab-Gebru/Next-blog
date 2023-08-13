import { headings } from "@/types";

type Props = {
  titles: headings[];
};
function SpyScroll({ titles }: Props) {
  return (
    <div className="sticky p-8 hidden lg:block border-2 rounded-lg top-[100px] dark:border-gray-400 w-96 h-fit">
      <h3 className="text-2xl font-bold">Content:</h3>

      <div className="flex flex-col">
        {titles.map((t, i) => (
          <li>
            <a href={`#${t.blockNo.toString()}`}>{t.text}</a>
          </li>
        ))}
      </div>
      <p className="mt-8">
        👍
        <span className="underline">
          Content with style and Scrollspy will be inplimented soon
        </span>
        👍
      </p>
    </div>
  );
}

export default SpyScroll;
