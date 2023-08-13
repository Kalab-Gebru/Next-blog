import { getPostsMeta } from "@/lib/posts";
import ListItem from "@/app/components/ListItem";
import { options } from "../../api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth/next";
import Link from "next/link";
import AllTag from "../../components/AllTags";
import { Auther } from "@/types";

export const revalidate = 86400;

type Props = {
  params: {
    auther: string;
  };
};

export const generateStaticParams =
  process.env.NODE_ENV === "production" ? staticParams : undefined;
export const dynamic =
  process.env.NODE_ENV === "production" ? "auto" : "force-dynamic";

export async function staticParams() {
  const posts = await getPostsMeta(); //deduped!

  if (!posts) return [];

  const authers = new Set(posts.map((post) => post.auther.userName));

  return Array.from(authers).map((auther) => ({ auther }));
}

export function generateMetadata({ params: { auther } }: Props) {
  return {
    title: `Posts by ${auther.replace("%20", " ")}`,
  };
}

export default async function autherPostList({ params: { auther } }: Props) {
  const posts = await getPostsMeta(); //deduped!
  const session = await getServerSession(options);
  const user: Auther = {
    userName: session?.user?.name || null,
    img: session?.user?.image || null,
    email: session?.user?.email || null,
  };

  if (!posts)
    return <p className="mt-10 text-center">Sorry, no posts available.</p>;

  const autherPosts = posts.filter(
    (post) => post.auther.userName == auther.replace("%20", " ")
  );
  console.log(auther.replace("%20", " "), autherPosts);

  if (!autherPosts.length) {
    return (
      <div className="text-center">
        <p className="mt-10">Sorry, no posts for by the User.</p>
        <Link href="/">Back to Home</Link>
      </div>
    );
  }

  return (
    // <div className="flex flex-col items-center p-2 mx-auto mt-4">
    //   <h2 className="mt-4 mb-0 text-3xl">
    //     Results for: @{auther.replace("%20", " ")}
    //   </h2>
    //   <div className="flex gap-6 mt-6">
    //     <section className="w-full xl:w-[900px] px-12 py-6">
    //       <ul className="w-full list-none">
    //         {autherPosts.map((post) => (
    //           <ListItem key={post.id} post={post} user={user} />
    //         ))}
    //       </ul>
    //     </section>
    //     <AllTag />
    //   </div>
    // </div>
    <section className="w-full xl:w-[900px] px-12 py-6 mx-auto">
      <h2 className="pb-2 text-4xl">
        Results for: @{auther.replace("%20", " ")}
      </h2>
      <ul className="w-full gap-4 p-0 my-6 list-none">
        {posts.map((post) => (
          <ListItem key={post.id} post={post} user={user} />
        ))}
      </ul>
    </section>
  );
}
