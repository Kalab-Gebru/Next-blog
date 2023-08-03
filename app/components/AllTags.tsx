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
    <div className="p-8 bg-white w-80 h-fit ">
      <h3 className="">All Tags:</h3>
      <div className="flex flex-wrap gap-2 my-2 text-base">
        {Uniquetags.map((t: string, i: number) => (
          <Link
            key={i}
            href={`/tags/${t}`}
            className="px-2 no-underline bg-gray-200 border rounded"
          >
            {t}
          </Link>
        ))}
      </div>
    </div>
  );
}
