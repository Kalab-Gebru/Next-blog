import getFormattedDate from "@/lib/getFormattedDate";
import { getPostsMeta, getPostById } from "@/lib/posts";
import { notFound } from "next/navigation";
import Link from "next/link";
import "highlight.js/styles/github-dark.css";
import EditorJsRenderer from "@/app/components/EditorJsRenderer";

export const revalidate = 86400;

type Props = {
  params: {
    postId: string;
  };
};

// fix "dynamic server usage" errors in dev mode by turning off static generation and forcing dynamic rendering
export const generateStaticParams =
  process.env.NODE_ENV === "production" ? staticParams : undefined;
export const dynamic =
  process.env.NODE_ENV === "production" ? "auto" : "force-dynamic";

export async function staticParams() {
  const posts = await getPostsMeta(); //deduped!

  if (!posts) return [];

  return posts.map((post) => ({
    postId: post.id,
  }));
}

export async function generateMetadata({ params: { postId } }: Props) {
  const post = await getPostById(postId); //deduped!

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: post.meta.title,
  };
}

export default async function Post({ params: { postId } }: Props) {
  const post = await getPostById(postId); //deduped!

  if (!post) notFound();

  const { meta, content } = post;

  const tags = meta.tags.map((tag, i) => (
    <Link key={i} href={`/tags/${tag}`}>
      {tag}
    </Link>
  ));

  return (
    <div className="w-full xl:w-[900px] mx-auto bg-white dark:bg-slate-700 shadow p-16 mt-4 divide-y-2">
      <article className="mb-8">
        <EditorJsRenderer
          data={content}
          title={meta.title}
          date={meta.date}
          tags={meta.tags}
          coverImg={meta.imgURL}
          auther={meta.auther}
        />
      </article>
      {/* <section>
        <h3>Related:</h3>
        <div className="flex flex-row gap-4">{tags}</div>
      </section> */}
      <p className="py-4">
        <Link href="/">← Back to home</Link>
      </p>
    </div>
  );
}
