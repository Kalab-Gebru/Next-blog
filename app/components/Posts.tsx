import { getPostsMeta } from "@/lib/posts";
import ListItem from "./ListItem";

export default async function Posts() {
  const posts = await getPostsMeta();
  // console.log(posts);

  if (!posts) {
    return <p className="mt-10 text-center">Sorry, no posts available.</p>;
  }

  return (
    <section className="w-full xl:w-[900px] px-12 py-6">
      <h2 className="pb-2 text-4xl font-bold">Blog</h2>
      <ul className="w-full gap-4 p-0 my-6 list-none">
        {posts.map((post) => (
          <ListItem key={post.id} post={post} />
        ))}
      </ul>
    </section>
  );
}
