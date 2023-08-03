import { options } from "../../api/auth/[...nextauth]/options";
import { getPostById } from "@/lib/posts";
import { notFound } from "next/navigation";
import { getServerSession } from "next-auth/next";
import CreatePostForm from "../../components/CreatePostForm";
import { redirect } from "next/navigation";

type Props = {
  params: {
    postId: string;
  };
};

export default async function EditPost({ params: { postId } }: Props) {
  const post = await getPostById(postId); //deduped!

  if (!post) notFound();

  const session = await getServerSession(options);
  const User = {
    userName: session?.user?.name || null,
    email: session?.user?.email || null,
  };

  if (post.meta.auther.email != User.email) {
    redirect("/");
  }

  return (
    <div className="w-full xl:w-[900px] text-black bg-gray-50">
      <CreatePostForm
        post={post}
        id={post.meta.id}
        auther={User}
        update={true}
      />
    </div>
  );
}
