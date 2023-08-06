import { options } from "../api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth/next";
import CreatePostForm from "../components/CreatePostForm";

export default async function CreatePost() {
  const session = await getServerSession(options);
  const User = {
    userName: session?.user?.name || null,
    email: session?.user?.email || null,
  };
  return (
    <div className="w-full xl:w-[900px] text-black dark:text-white bg-gray-50 dark:bg-slate-700">
      <CreatePostForm auther={User} />
    </div>
  );
}
