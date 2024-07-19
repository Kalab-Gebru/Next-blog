import Link from "next/link";
import Image from "next/image";
import { Meta, Auther } from "@/types";
import { BiEdit } from "react-icons/bi";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { badgeVariants } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type Props = {
  post: Meta;
  user?: Auther;
};

export default function ListItem({ post, user }: Props) {
  const { id, title, date, tags, auther, imgURL } = post;

  return (
    <Card className="relative grid grid-cols-12 gap-2 p-2 my-4 md:gap-4 md:flex-row">
      {imgURL ? (
        <Link
          className="col-span-12 border w-full rounded-md overflow-hidden md:col-span-5 aspect-[1.75] no-underline "
          href={`/posts/${id}`}
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
      <div className="flex flex-col justify-between col-span-12 p-2 md:col-span-7">
        <div className="flex flex-col">
          <div className="pr-10">
            <Link
              className="no-underline hover:opacity-60"
              href={`/posts/${id}`}
            >
              <CardTitle className="text-4xl md:text-3xl xl:text-2xl lg:text-4xl twolines">
                {title}
              </CardTitle>
              {/* <span className="twolines">{title}</span> */}
            </Link>
          </div>

          <div className="flex flex-row items-center gap-2 mt-4 text-sm md:mt-1">
            <Link
              className="flex items-center gap-2 "
              href={`/authers/${auther.email}`}
            >
              <Avatar className="w-[30px] h-[30px]">
                <AvatarImage
                  src={auther.img || ""}
                  alt="Picture of the author"
                />
                <AvatarFallback>
                  {auther.userName ? auther.userName.slice(0, 2) : ""}
                </AvatarFallback>
              </Avatar>
            </Link>
            <div className="flex flex-col ">
              <Link
                className="text-black no-underline dark:text-white hover:text-black/70 dark:hover:text-gray-300"
                href={`/authers/${auther.email}`}
              >
                <CardDescription> {auther.email}</CardDescription>
              </Link>
              {/* <span className="text-gray-400">{date}</span> */}
              <CardDescription>{date}</CardDescription>
            </div>
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
      {auther.email == user?.email || user?.role == "admin" ? (
        <Link
          href={`/editPost/${id}`}
          className="absolute rounded-lg top-2 right-2 bg-white/90"
        >
          <BiEdit
            size={24}
            className="w-10 h-10 text-muted-foreground hover:text-blue-500 md:w-6 md:h-6"
          />
        </Link>
      ) : null}
    </Card>
  );
}
