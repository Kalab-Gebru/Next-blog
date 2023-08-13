import { options } from "../api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth/next";
import CreatePostForm from "../components/CreatePostForm";
import { Auther } from "@/types";
import ScrollToBottom from "../components/ScrollToBottom";

export default async function CreatePost() {
  const session = await getServerSession(options);
  const User: Auther = {
    userName: session?.user?.name || null,
    img: session?.user?.image || null,
    email: session?.user?.email || null,
  };
  return (
    <div className="relative w-full xl:w-[900px] text-black dark:text-white">
      <CreatePostForm auther={User} />
      <ScrollToBottom />
    </div>
  );
}
