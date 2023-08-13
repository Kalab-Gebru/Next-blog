import getFormattedDate from "@/lib/getFormattedDate";
import { getPostsMeta, getPostById } from "@/lib/posts";
import { notFound } from "next/navigation";
import Link from "next/link";
import "highlight.js/styles/github-dark.css";
import EditorJsRenderer from "@/app/components/EditorJsRenderer";
import StickySocialShare from "@/app/components/StickySocialShare";
import SpyScroll from "@/app/components/SpyScroll";

export const revalidate = 86400;

type Props = {
  params: {
    postId: string;
  };
};

// fix "dynamic server usage" errors in dev mode by turning off static generation and forcing dynamic rendering
// uncomment the next 2 exports for local dev and replace staticParams with generateStaticParams

// export const generateStaticParams =
//   process.env.NODE_ENV === "production" ? staticParams : undefined;
// export const dynamic =
//   process.env.NODE_ENV === "production" ? "auto" : "force-dynamic";

export async function generateStaticParams() {
  const posts = await getPostsMeta(); //deduped!

  if (!posts) return [];

  return posts.map((post) => ({
    postId: post.id,
  }));
}

export async function generateMetadata({ params: { postId } }: Props) {
  const postData = await getPostById(postId); //deduped!

  if (!postData) {
    return {
      title: "Post Not Found",
    };
  }
  const { post } = postData;

  return {
    title: post.meta.title,
  };
}

export default async function Post({ params: { postId } }: Props) {
  const postData = await getPostById(postId); //deduped!

  if (!postData) notFound();

  const { post, titles } = postData;

  const { meta, content } = post;

  const tags = meta.tags.map((tag, i) => (
    <Link key={i} href={`/tags/${tag}`}>
      {tag}
    </Link>
  ));

  return (
    <div className="">
      <div className="relative flex justify-center gap-6 mx-auto mt-8">
        <StickySocialShare title={meta.title} />
        <div className="w-full xl:w-[900px]  p-6 lg:p-16 pt-0 divide-y-2">
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
          <p className="py-4">
            <Link href="/">← Back to home</Link>
          </p>
        </div>
        <SpyScroll titles={titles} />
      </div>
    </div>
  );
}
