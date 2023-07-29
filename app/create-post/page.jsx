import { options } from "../api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth/next";
import CreatePostForm from "../components/CreatePostForm";

export default async function CreatePost() {
  const session = await getServerSession(options);
  const User = {
    userName: session?.user?.name,
    email: session?.user?.email,
  };

  return (
    <div className="w-full xl:w-[900px] text-black bg-gray-50">
      <CreatePostForm User={User} />
    </div>
  );
}
