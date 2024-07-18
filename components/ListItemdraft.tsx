import Link from "next/link";
import Image from "next/image";
import { Meta, Auther } from "@/types";
import { BiEdit } from "react-icons/bi";
import profilepic from "public/images/profile-photo-640x640.png";
import DeleteDraft from "./DeleteDraft";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { badgeVariants } from "@/components/ui/badge";

type Props = {
  draft: Meta;
  user?: Auther;
};

export default function ListItemDraft({ draft, user }: Props) {
  const { id, title, date, tags, auther, imgURL } = draft;

  return (
    <Card className="relative grid grid-cols-12 gap-2 p-2 my-4 border border-green-200 rounded-md shadow-lg md:gap-4 md:flex-row">
      <div className="absolute z-10 px-2 bg-red-300 rounded top-2 left-2">
        Draft
      </div>
      {imgURL ? (
        <Link
          className="col-span-12 border w-full rounded overflow-hidden md:col-span-5 aspect-[1.75] no-underline "
          href={`/draft/${id}`}
        >
          <Image
            src={imgURL}
            alt={imgURL}
            className="w-full h-full"
            width={300}
            height={200}
            style={{ objectFit: "cover" }}
          />
        </Link>
      ) : (
        <div className="col-span-12 bg-gray-400 rounded md:col-span-5 aspect-[1.75]" />
      )}
      <div className="flex flex-col justify-start col-span-12 p-2 md:col-span-7 ">
        <div className="pr-10">
          <Link
            className="text-2xl no-underline sm:text-4xl hover:text-black/70 dark:hover:text-white/80 "
            href={`/draft/${id}`}
          >
            <CardTitle className="text-4xl md:text-3xl xl:text-2xl lg:text-4xl twolines">
              {title}
            </CardTitle>
          </Link>
        </div>

        <div className="flex flex-row items-center gap-2 mt-4 text-sm md:mt-1">
          <Link
            className="flex items-center gap-2 "
            href={`/authers/${auther.email}`}
          >
            <Image
              src={auther.img ? auther.img : profilepic}
              alt="Picture of the author"
              className="w-8 h-8 border rounded-full dark:border-zinc-600 "
              width={30}
              height={30}
            />
          </Link>
          <div className="flex flex-col ">
            <Link
              className="text-black no-underline dark:text-white hover:text-black/70 dark:hover:text-gray-300"
              href={`/authers/${auther.email}`}
            >
              <CardDescription>{auther.email}</CardDescription>
            </Link>
            <CardDescription>{date}</CardDescription>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 my-4 text-sm md:my-2 md:text-base">
          {tags.map((t: string, i: number) => (
            <Link
              key={i}
              href={`/tags/${t}`}
              className={badgeVariants({ variant: "secondary" })}
              // className="px-2 no-underline bg-gray-200 border rounded hover:bg-gray-300 dark:bg-zinc-600 dark:hover:bg-zinc-500 dark:border-zinc-500"
            >
              {t}
            </Link>
          ))}
        </div>
      </div>
      <div className="absolute top-2 right-2">
        {(auther.email == user?.email || user?.role == "admin") && (
          <Link href={`/editDraft/${id}`} className="rounded-lg bg-white/90">
            <BiEdit
              size={24}
              className="w-10 h-10 text-muted-foreground hover:text-blue-500 md:w-6 md:h-6"
            />
          </Link>
        )}
        {user?.role == "admin" && (
          <div className="rounded-lg bg-white/70">
            <DeleteDraft draftId={id} />
          </div>
        )}
      </div>
    </Card>
  );
}
