import { options } from "@/app/api/auth/[...nextauth]/options";
import { getPostById } from "@/lib/posts";
import { notFound } from "next/navigation";
import { getServerSession } from "next-auth/next";
import EditPostForm from "@/components/EditPostForm";
import { redirect } from "next/navigation";
import { Auther } from "@/types";
import ScrollToBottom from "@/components/ScrollToBottom";
import EditDraftForm from "@/components/EditDraftForm";

type Props = {
  params: {
    postId: string;
  };
};

export default async function EditPost({ params: { postId } }: Props) {
  const postData = await getPostById(postId); //deduped!

  if (!postData) notFound();

  const { post } = postData;

  const session = await getServerSession(options);
  const User: Auther = {
    userName: session?.user?.name || null,
    img: session?.user?.image || null,
    email: session?.user?.email || null,
    role: session?.user?.role || null,
  };

  if (post.meta.auther.email != User.email && User.role != "admin") {
    redirect("/");
  }

  return (
    <div className="w-full xl:w-[900px] text-black dark:text-white">
      <EditPostForm
        post={post}
        id={post.meta.id}
        auther={User}
        imgURL={post.meta.imgURL}
      />
      <ScrollToBottom />
    </div>
  );
}
