import { getDraftMeta } from "@/lib/posts";
import ListItemDraft from "@/components/ListItemdraft";
import { Auther } from "@/types";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
export default async function page() {
  const draft = await getDraftMeta();
  const session = await getServerSession(options);
  const user: Auther = {
    userName: session?.user?.name || null,
    img: session?.user?.image || null,
    email: session?.user?.email || null,
    role: session?.user?.role || null,
  };

  if (!draft || draft?.length == 0)
    return <p className="mt-24 text-lg text-center">No Draft Available.</p>;

  return (
    <section className="flex flex-col gap-4 w-full xl:w-[900px] px-12 py-6 mx-auto">
      <h2 className="pb-2 text-3xl">Dafts</h2>
      <ul className="w-full gap-4 p-0 my-6 list-none">
        {draft.map((draft) => (
          <ListItemDraft key={draft.id} draft={draft} user={user} />
        ))}
      </ul>
    </section>
  );
}
