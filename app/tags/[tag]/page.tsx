import { getPostsMeta } from "@/lib/posts";
import ListItem from "@/app/components/ListItem";
import Link from "next/link";
import AllTags from "../../components/AllTags";

export const revalidate = 86400;

type Props = {
  params: {
    tag: string;
  };
};

export async function generateStaticParams() {
  const posts = await getPostsMeta(); //deduped!

  if (!posts) return [];

  const tags = new Set(posts.map((post) => post.tags).flat());

  return Array.from(tags).map((tag) => ({ tag }));
}

export function generateMetadata({ params: { tag } }: Props) {
  return {
    title: `Posts about ${tag}`,
  };
}

export default async function TagPostList({ params: { tag } }: Props) {
  const posts = await getPostsMeta(); //deduped!

  if (!posts)
    return <p className="mt-10 text-center">Sorry, no posts available.</p>;

  const tagPosts = posts.filter((post) => post.tags.includes(tag));

  if (!tagPosts.length) {
    return (
      <div className="text-center">
        <p className="mt-10">Sorry, no posts for that keyword.</p>
        <Link href="/">Back to Home</Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center p-2 mx-auto mt-4">
      <h2 className="mt-4 mb-0 text-3xl">Results for: #{tag}</h2>
      <div className="flex gap-6 mt-6">
        <section className="w-full xl:w-[900px] p-12 bg-white shadow ">
          <ul className="w-full list-none">
            {tagPosts.map((post) => (
              <ListItem key={post.id} post={post} />
            ))}
          </ul>
        </section>
        <AllTags />
      </div>
    </div>
  );
}
