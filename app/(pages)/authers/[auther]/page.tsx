import { getDraftMeta, getPostsMeta } from "@/lib/posts";
import ListItem from "@/components/ListItem";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth/next";
import Link from "next/link";
import { Auther } from "@/types";
import ListItemDraft from "@/components/ListItemdraft";

export const revalidate = 86400;

type Props = {
  params: {
    auther: string;
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

  const authers = new Set(posts.map((post) => post.auther.userName));

  return Array.from(authers).map((auther) => ({ auther }));
}

export function generateMetadata({ params: { auther } }: Props) {
  return {
    title: `Posts by ${auther.replace("%40", "@")}`,
  };
}

export default async function autherPostList({ params: { auther } }: Props) {
  const posts = await getPostsMeta(); //deduped!
  const draft = await getDraftMeta(); //deduped!
  const session = await getServerSession(options);
  const user: Auther = {
    userName: session?.user?.name || null,
    img: session?.user?.image || null,
    email: session?.user?.email || null,
    role: session?.user?.role || null,
  };

  if (!posts || !draft)
    return (
      <p className="mt-10 text-center">Sorry, no posts or draft available.</p>
    );

  const autherPosts = posts.filter(
    (post) => post.auther.email == auther.replace("%40", "@")
  );

  const autherDrafts = draft.filter(
    (draft) => draft.auther.email == auther.replace("%40", "@")
  );

  if (!autherPosts.length && !draft?.length) {
    return (
      <div className="text-center">
        <p className="mt-10">Sorry, no posts or drafts by the User.</p>
        <Link href="/">Back to Home</Link>
      </div>
    );
  }

  return (
    <section className="flex flex-col gap-4 w-full xl:w-[900px] px-2 md:px-12 py-3 md:py-6 mx-auto">
      <h2 className="pb-2 sm:text-2xl md:text-3xl">
        Results for: {auther.replace("%40", "@")}
      </h2>
      {user.email == auther.replace("%40", "@") && autherDrafts.length > 0 && (
        <div className="p-4 border rounded-md ">
          <h2 className="pb-2 text-3xl">Dafts</h2>
          <ul className="w-full gap-4 p-0 my-6 list-none">
            {autherDrafts.map((draft) => (
              <ListItemDraft key={draft.id} draft={draft} user={user} />
            ))}
          </ul>
        </div>
      )}
      <div className="">
        <h2 className="pb-2 text-xl md:text-3xl">Posts</h2>
        <ul className="w-full gap-4 p-0 my-6 list-none">
          {autherPosts.map((post) => (
            <ListItem key={post.id} post={post} user={user} />
          ))}
        </ul>
      </div>
    </section>
  );
}
