import { getPostsMeta } from "@/lib/posts";
import Link from "next/link";

export default async function AllTags() {
  const posts = await getPostsMeta(); //deduped!

  if (!posts)
    return <p className="mt-10 text-center">Sorry, no tags available.</p>;

  const alltagsSet = new Set([...posts.map((post) => post.tags).flat()]);
  const Uniquetags = Array.from(alltagsSet);

  if (!Uniquetags.length)
    return <p className="mt-10 text-center">Sorry, no tags available.</p>;

  return (
    <div className="hidden xl:block p-8 bg-white dark:bg-slate-700 w-80 h-fit ">
      <h3 className="">All Tags:</h3>
      <div className="flex flex-wrap gap-2 my-2 text-base">
        {Uniquetags.map((t: string, i: number) => (
          <Link
            key={i}
            href={`/tags/${t}`}
            className="px-2 no-underline bg-gray-200 hover:bg-gray-300 dark:bg-slate-600 border dark:hover:bg-slate-500 dark:border-slate-500 rounded"
          >
            {t}
          </Link>
        ))}
      </div>
    </div>
  );
}
