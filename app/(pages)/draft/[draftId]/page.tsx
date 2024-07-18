import getFormattedDate from "@/lib/getFormattedDate";
import { getDraftById, getDraftMeta } from "@/lib/posts";
import { notFound } from "next/navigation";
import Link from "next/link";
import "highlight.js/styles/github-dark.css";
import EditorJsRenderer from "@/components/EditorJsRenderer";
import StickySocialShare from "@/components/StickySocialShare";
import SpyScroll from "@/components/SpyScroll";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Auther } from "@/types";
import { options } from "@/app/api/auth/[...nextauth]/options";

export const revalidate = 86400;

type Props = {
  params: {
    draftId: string;
  };
};

// fix "dynamic server usage" errors in dev mode by turning off static generation and forcing dynamic rendering
// uncomment the next 2 exports for local dev and replace staticParams with generateStaticParams

// export const generateStaticParams =
//   process.env.NODE_ENV === "production" ? staticParams : undefined;
// export const dynamic =
//   process.env.NODE_ENV === "production" ? "auto" : "force-dynamic";

export async function generateStaticParams() {
  const posts = await getDraftMeta(); //deduped!

  if (!posts) return [];

  return posts.map((draftId) => ({
    draftId: draftId.id,
  }));
}

export async function generateMetadata({ params: { draftId } }: Props) {
  const postData = await getDraftById(draftId); //deduped!

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

export default async function draft({ params: { draftId } }: Props) {
  const draftData = await getDraftById(draftId);

  const session = await getServerSession(options);
  const User: Auther = {
    userName: session?.user?.name || null,
    img: session?.user?.image || null,
    email: session?.user?.email || null,
    role: session?.user?.role || null,
  };

  if (draftData?.post.meta.auther.email != User.email && User.role != "admin") {
    redirect("/");
  }

  //deduped!

  if (!draftData) notFound();

  const { post, titles } = draftData;

  const { meta, content } = post;

  return (
    <div className="">
      <div className="relative flex justify-center gap-6 mx-auto mt-8">
        <StickySocialShare title={meta.title} />
        <div className="w-full xl:w-[900px]  p-4 lg:p-16 pt-0 divide-y-2">
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
