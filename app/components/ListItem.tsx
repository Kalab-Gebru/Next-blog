import Link from "next/link";
import getFormattedDate from "@/lib/getFormattedDate";
import { Meta } from "@/types";

type Props = {
  post: Meta;
};

export default function ListItem({ post }: Props) {
  const { id, title, date, tags } = post;

  return (
    <li className="grid grid-cols-12 gap-4 p-4 my-4 text-3xl border rounded-md">
      <div className="h-full col-span-4 bg-gray-400 rounded"></div>
      <div className="flex flex-col col-span-8">
        <Link
          className="no-underline hover:text-black/70"
          href={`/posts/${id}`}
        >
          {title}
        </Link>
        <p className="mt-1 text-sm text-gray-400">{date}</p>
        <p className="my-2 text-sm">
          Each size modifier comes with a baked in max-width designed to keep
          the content as readable as possible. This isn’t always what you want
          though.
        </p>
        <div className="flex flex-wrap gap-2 my-2 text-base">
          {tags.map((t: string, i: number) => (
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
    </li>
  );
}
