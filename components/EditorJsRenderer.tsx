import { OutputData, OutputBlockData } from "@editorjs/editorjs";
import Link from "next/link";
import Image from "next/image";
import profilepic from "public/images/profile-photo-640x640.png";
import { Auther } from "@/types";
import Usespyscroll from "./Usespyscroll";
import { badgeVariants } from "@/components/ui/badge";

//use require since editorjs-html doesn't have types
// const editorJsHtml = require("editorjs-html");
// const EditorJsToHtml = editorJsHtml();

type Props = {
  data: OutputData;
  title: string;
  date: string;
  tags: string[];
  coverImg?: string;
  auther?: Auther;
};

// type ParsedContent = string | JSX.Element;

const EditorJsRenderer = ({
  data,
  title,
  date,
  tags,
  auther,
  coverImg,
}: Props) => {
  // const html = EditorJsToHtml.parse(data) as ParsedContent[];

  function paragraph(block: OutputBlockData<string, any>) {
    const paragraphAlign = block.data.alignment || block.data.align;

    return (
      <p
        dangerouslySetInnerHTML={{ __html: block.data.text }}
        className={`text-${paragraphAlign}`}
      ></p>
    );
  }

  function header(block: OutputBlockData<string, any>) {
    switch (block.data.level) {
      case 1:
        return <h1 dangerouslySetInnerHTML={{ __html: block.data.text }}></h1>;
      case 2:
        return <h2 dangerouslySetInnerHTML={{ __html: block.data.text }}></h2>;
      case 3:
        return <h3 dangerouslySetInnerHTML={{ __html: block.data.text }}></h3>;
      case 4:
        return <h4 dangerouslySetInnerHTML={{ __html: block.data.text }}></h4>;
      case 5:
        return <h5 dangerouslySetInnerHTML={{ __html: block.data.text }}></h5>;
      case 6:
        return <h6 dangerouslySetInnerHTML={{ __html: block.data.text }}></h6>;
    }
  }

  function delimiter(block: OutputBlockData<string, any>) {
    return <br />;
  }

  function warning(block: OutputBlockData<string, any>) {
    return (
      // <div className="grid w-full grid-cols-12 gap-2 px-6 py-4 my-2 text-red-500 bg-orange-300 rounded-md">
      //   <div className="flex justify-center">
      //     <svg
      //       xmlns="http://www.w3.org/2000/svg"
      //       viewBox="0 0 24 24"
      //       fill="currentColor"
      //       className="w-8 h-8 "
      //     >
      //       <path
      //         fillRule="evenodd"
      //         d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
      //         clipRule="evenodd"
      //       />
      //     </svg>
      //   </div>
      //   <h3 className="col-span-11 m-0 font-medium text-red-500">
      //     {block.data.title}
      //   </h3>

      //   <p className="col-span-11 col-start-2 m-0">{block.data.message}</p>
      // </div>
      <div
        className="p-4 border border-red-200 rounded-md bg-red-50"
        role="alert"
      >
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <svg
              className="h-4 w-4 text-red-400 mt-0.5"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
            </svg>
          </div>
          <div className="ml-4">
            <h3 className="mt-0 text-sm font-semibold text-red-800">
              {block.data.title}
            </h3>
            <div className="mt-1 text-sm text-red-700">
              {block.data.message}
            </div>
          </div>
        </div>
      </div>
    );
  }

  function quote(block: OutputBlockData<string, any>) {
    return (
      <div>
        <blockquote>{block.data.text}</blockquote> - {block.data.caption}
      </div>
    );
  }

  function linkTool(block: OutputBlockData<string, any>) {
    return (
      <div className="p-8 bg-white border rounded shadow-md dark:bg-zinc-500">
        <div className="flex gap-4">
          <div className="">
            <h3 className="mt-0">{block.data.meta.title}</h3>
            <p className="font-medium font">{block.data.meta.description}</p>
          </div>
          <div className="w-32">
            <Image
              src={block.data.meta.image.url}
              alt={block.data.meta.site_name}
              className="w-full border h-fit"
              width={70}
              height={70}
              priority
            />
          </div>
        </div>
        <Link href={block.data.link} className="text-gray-400 no-underline">
          {block.data.meta.site_name}
        </Link>
      </div>
    );
  }

  function raw(block: OutputBlockData<string, any>) {
    return (
      <div className="w-full p-4 bg-gray-500 rounded text-zinc-50">
        <p>{block.data.html}</p>
      </div>
    );
  }

  function code(block: OutputBlockData<string, any>) {
    return (
      <pre className="max-h-[800px] overflow-scroll">
        <code>${block.data.code}</code>
      </pre>
    );
  }

  function list(block: OutputBlockData<string, any>) {
    switch (block.data.style) {
      case "unordered":
        return (
          <ul>
            {block.data.items.map((item: any, index: number) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        );
      case "ordered":
        return (
          <ol>
            {block.data.items.map((item: any, index: number) => (
              <li key={index}>{item}</li>
            ))}
          </ol>
        );
    }
  }

  function checklist(block: OutputBlockData<string, any>) {
    return (
      <div>
        {block.data.items.map((item: any, index: number) => (
          // <div>
          //   {item.checked ? (
          //     <input
          //       type="checkbox"
          //       id={`item${index}`}
          //       name={item.text}
          //       checked
          //       value={item.text}
          //     />
          //   ) : (
          //     <input
          //       type="checkbox"
          //       id={`item${index}`}
          //       name={item.text}
          //       value={item.text}
          //     />
          //   )}
          //   <label htmlFor={`item${index}`}>{item.text}</label>
          // </div>
          <div key={index} className="flex items-center">
            <label
              className="relative flex items-center p-3 rounded-full cursor-pointer"
              htmlFor="login"
              data-ripple-dark="true"
            >
              {item.checked ? (
                <input
                  type="checkbox"
                  className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-tranzinc-y-2/4 before:-tranzinc-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-pink-500 checked:bg-pink-500 checked:before:bg-pink-500 hover:before:opacity-10"
                  id={`item${index}`}
                  checked
                  readOnly
                />
              ) : (
                <input
                  type="checkbox"
                  className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-tranzinc-y-2/4 before:-tranzinc-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-pink-500 checked:bg-pink-500 checked:before:bg-pink-500 hover:before:opacity-10"
                  id={`item${index}`}
                  readOnly
                />
              )}
            </label>
            <div className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -tranzinc-y-2/4 -tranzinc-x-2/4 peer-checked:opacity-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3.5 w-3.5"
                viewBox="0 0 20 20"
                fill="currentColor"
                stroke="currentColor"
                strokeWidth="1"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
            <label
              className="relative flex items-center p-3 rounded-full cursor-pointer"
              htmlFor={`item${index}`}
              data-ripple-dark="true"
            >
              {item.text}
            </label>
          </div>
        ))}
      </div>
    );
  }

  function simpleImage(block: OutputBlockData<string, any>) {
    let caption = block.data.caption ? block.data.caption : "Image";
    return (
      <Image
        src={block.data.url}
        alt={caption}
        className="rounded w-fit h-fit aspect-2 dark:border-zinc-600"
        width={1200}
        height={720}
      />
    );
  }

  function embed(block: OutputBlockData<string, any>) {
    switch (block.data.service) {
      case "vimeo":
        return (
          <iframe
            src="${block.data.embed}"
            height="${block.data.height}"
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
          ></iframe>
        );
      case "youtube":
        return (
          <iframe
            className="w-full"
            width={`${block.data.width}`}
            height={`${block.data.height}`}
            src={`${block.data.embed}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        );
      default:
        throw new Error(
          "Only Youtube and Vime Embeds are supported right now."
        );
    }
  }

  function table(block: OutputBlockData<string, any>) {
    return (
      <table className="border border-collapse border-gray-200">
        {...block.data.content.map((row: any, i: number) =>
          i == 0 && block.data.withHeadings ? (
            <tr key={i}>
              {row.map((col: any, j: number) => (
                <th key={`${i}${j}`} className="border border-gray-300">
                  {col}
                </th>
              ))}
            </tr>
          ) : (
            <tr key={i}>
              {row.map((col: any, j: number) => (
                <td key={`${i}${j}`} className="border border-gray-200">
                  {col}
                </td>
              ))}
            </tr>
          )
        )}
      </table>
    );
  }

  function element(block: OutputBlockData<string, any>) {
    switch (block.type) {
      case "paragraph":
        return paragraph(block);
      case "header":
        return header(block);
      case "list":
        return list(block);
      case "checklist":
        return checklist(block);
      case "warning":
        return warning(block);
      case "delimiter":
        return delimiter(block);
      case "quote":
        return quote(block);
      case "linkTool":
        return linkTool(block);
      case "raw":
        return raw(block);
      case "code":
        return code(block);
      case "simpleImage":
        return simpleImage(block);
      case "embed":
        return embed(block);
      case "table":
        return table(block);
    }
  }
  function test(blocks: any) {
    blocks;
    let result: any = [];
    let temp: any = [];
    blocks.map((b: any) => {
      if (b.type == "header") {
        if (temp.length != 0) {
          result.push(temp);
          temp = [];
        }

        temp.push(b);
      } else {
        temp.push(b);
      }
    });

    if (temp.length != 0) {
      result.push(temp);
    }

    return result;
  }
  const newblock = test(data.blocks);
  return (
    //✔️ It's important to add key={data.time} here to re-render based on the latest data.
    <div className="divide-y-2" key={data.time}>
      <div className="mb-4">
        <h1 className="text-3xl font-bold text-black md:text-4xl lg:text-5xl dark:text-white">
          {title}
        </h1>
        <div className="mt-2 mb-4 text-sm ">
          {auther && (
            <div className="flex items-center gap-2">
              <Link
                className="flex items-center gap-2 "
                href={`/authers/${auther.email}`}
              >
                <Image
                  src={auther.img ? auther.img : profilepic}
                  alt="Picture of the author"
                  className="border rounded-full dark:border-zinc-600"
                  width={35}
                  height={35}
                />
              </Link>
              <div className="flex flex-col">
                <Link
                  className="text-black no-underline dark:text-white hover:text-black/70 dark:hover:text-gray-300"
                  href={`/authers/${auther.email}`}
                >
                  {" "}
                  {auther.email}{" "}
                </Link>
                <span className="text-gray-400">{date}</span>
              </div>
            </div>
          )}
        </div>
        <div className="flex flex-wrap gap-2 my-2">
          {tags.map((t: string, i: number) => (
            <Link
              key={i}
              href={`/tags/${t}`}
              className={badgeVariants({ variant: "secondary" })}
              // className="px-2 text-black no-underline border rounded dark:text-white hover:bg-gray-300 dark:bg-zinc-600 dark:hover:bg-zinc-500 dark:border-zinc-500"
            >
              {t}
            </Link>
          ))}
        </div>
      </div>
      <div>
        <div className="mb-16">
          {coverImg && (
            <Image
              src={coverImg}
              alt={coverImg}
              className="w-full border rounded aspect-2"
              width={300}
              height={300}
              style={{ objectFit: "cover" }}
            />
          )}
        </div>

        <div className="prose-sm sm:prose md:prose-md lg:prose-lg dark:prose-invert">
          <Usespyscroll>
            {...newblock.map((bb: any, i: number) => {
              return (
                <section key={`b${i}`} className="" id={i.toString()}>
                  {bb.map((b: any, index: number) => {
                    return (
                      <div className="" key={`${index}`}>
                        {element(b)}
                      </div>
                    );
                  })}
                </section>
              );
            })}
          </Usespyscroll>
        </div>
      </div>
    </div>
  );
};

export default EditorJsRenderer;
