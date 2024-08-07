import { getPostsMeta } from "@/lib/posts";
import ListItem from "@/components/ListItem";
import Link from "next/link";

export const revalidate = 86400;

type Props = {
  params: {
    tag: string;
  };
};

// uncomment the next 2 exports for local dev and replace staticParams with generateStaticParams

// export const generateStaticParams =
//   process.env.NODE_ENV === "production" ? staticParams : undefined;
// export const dynamic =
//   process.env.NODE_ENV === "production" ? "auto" : "force-dynamic";

export async function generateStaticParams() {
  const posts = await getPostsMeta(); //deduped!

  if (!posts) return [];

  const tags = new Set(posts.map((post) => post.tags).flat());

  return Array.from(tags).map((tag) => ({ tag }));
}

export function generateMetadata({ params: { tag } }: Props) {
  return {
    title: `Posts about ${tag.replaceAll("%20", " ")}`,
  };
}

export default async function TagPostList({ params: { tag } }: Props) {
  const posts = await getPostsMeta(); //deduped!

  if (!posts)
    return <p className="mt-10 text-center">Sorry, no posts available.</p>;

  const tagPosts = posts.filter((post) =>
    post.tags.includes(tag.replaceAll("%20", " "))
  );

  if (!tagPosts.length) {
    return (
      <div className="text-center">
        <p className="mt-10">Sorry, no posts for that keyword.</p>
        <Link href="/">Back to Home</Link>
      </div>
    );
  }

  return (
    <section className="w-full xl:w-[900px] px-2 md:px-12 py-3 md:py-6 mx-auto">
      <h2 className="pb-2 text-2xl md:text-3xl ">
        Results for: #{tag.replaceAll("%20", " ")}
      </h2>
      <ul className="w-full gap-4 p-0 my-6 list-none">
        {tagPosts.map((post) => (
          <ListItem key={post.id} post={post} />
        ))}
      </ul>
    </section>
  );
}
