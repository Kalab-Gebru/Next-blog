import { badgeVariants } from "@/components/ui/badge";
import { Card, CardTitle } from "@/components/ui/card";
import { getPostsMeta } from "@/lib/posts";
import Link from "next/link";

export default async function AllTags() {
  const posts = await getPostsMeta(); //deduped!

  if (!posts)
    return (
      <p className="hidden p-8 mt-10 text-center border-2 rounded-lg xl:block">
        Sorry, no tags available.
      </p>
    );

  const alltagsSet = new Set([...posts.map((post) => post.tags).flat()]);
  const Uniquetags = Array.from(alltagsSet);

  if (!Uniquetags.length)
    return (
      <Card className="hidden p-8 mt-10 text-center xl:block">
        Sorry, no tags available.
      </Card>
    );

  return (
    <Card className="hidden px-8 py-6 xl:block w-80 h-fit ">
      <CardTitle className="">All Tags:</CardTitle>
      <div className="flex flex-wrap gap-2 my-2 text-base">
        {Uniquetags.map((t: string, i: number) => (
          <Link
            key={i}
            href={`/tags/${t}`}
            className={badgeVariants({ variant: "secondary" })}
            // className="px-2 no-underline bg-gray-200 border rounded hover:bg-gray-300 dark:bg-zinc-600 dark:hover:bg-zinc-500 dark:border-zinc-500"
          >
            {t}
          </Link>
        ))}
      </div>
    </Card>
  );
}
