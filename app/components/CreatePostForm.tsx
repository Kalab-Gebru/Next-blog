"use client";
import { useState } from "react";
import Image from "next/image";
import Taginput from "../components/taginput/Taginput";
import { createPosts, updatePosts } from "@/lib/posts";
import getFormattedDate from "@/lib/getFormattedDate";
import { Auther, BlogPost, createdPost, tag } from "@/types";
import { OutputData } from "@editorjs/editorjs";
import dynamic from "next/dynamic";
import EditorJsRenderer from "../components/EditorJsRenderer";
// import { data1 } from "./defultEditorData";
import toast from "react-hot-toast";
import UploadImageToStorage from "./UploadImg";

const EditorBlock = dynamic(() => import("../components/Editor"), {
  ssr: false,
});

type Props = {
  auther: Auther;
};
/**
 * Renders a form for creating or updating a blog post.
 *
 * @param {Props} props - The props object containing the post data, author information, and optional post ID.
 * @returns {JSX.Element} - The rendered form for creating or updating a blog post.
 */
export default function CreatePostForm({ auther }: Props): JSX.Element {
  const [tags, setTags] = useState([]);
  const [title, setTitle] = useState(" ");
  const [downloadURL, setDownloadURL] = useState("");
  const [editMode, setEditMode] = useState(true);
  const [data, setData] = useState<OutputData>();

  function onsubmit(e: any) {
    e.preventDefault();
    if (tags?.length != 0) {
      if (downloadURL != "") {
        const CreatedPostData: createdPost = {
          meta: {
            auther,
            date: getFormattedDate(),
            title: title,
            tags: tags?.map((t: tag) => t.text),
            imgURL: downloadURL,
          },
          content: data,
        };
        console.log(CreatedPostData);

        try {
          createPosts(CreatedPostData);
          toast.success("posted successfully.");
        } catch (error) {
          toast.error("Failed to create post. Please try again.");
        }

        setTags([]);
        setTitle("");
        setData({ time: new Date().getMilliseconds(), blocks: [] });
        setEditMode((pre) => false);
        setDownloadURL("");
        setEditMode((pre) => true);
      } else {
        toast.error("there is no uploaded image");
      }
    } else {
      toast.error("Select at least one tag");
    }
  }

  return (
    <div className="p-4 pb-6 text-black dark:text-white">
      <div className="flex items-center justify-between py-4">
        <h1 className="text-2xl">Create post page</h1>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            value=""
            className="sr-only peer"
            onChange={() => setEditMode((pre) => !pre)}
            checked={editMode}
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
            Edit Mode
          </span>
        </label>
      </div>
      <form
        onSubmit={onsubmit}
        className="flex flex-col justify-between w-full h-full text-black dark:text-white"
      >
        <div className="mb-4">
          {editMode ? (
            <>
              <div className="p-4 bg-gray-100 rounded-lg dark:bg-slate-600">
                <div className="my-2">
                  <label
                    htmlFor="title"
                    className="block mb-2 text-sm font-medium "
                  >
                    Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="border border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-50 "
                    placeholder="Blog Title"
                    required
                  />
                </div>
                <div className="mt-2 mb-6">
                  <label
                    htmlFor="tag"
                    className="block mb-1 text-sm font-medium "
                  >
                    Tag
                  </label>
                  {/* {console.log(tags)} */}
                  <Taginput setTags={setTags} tags={tags} />
                </div>
                <div className="mt-4">
                  <UploadImageToStorage setURL={setDownloadURL} />
                  {downloadURL && (
                    <div className="flex flex-col gap-2 mt-4">
                      <Image
                        src={downloadURL}
                        alt={downloadURL}
                        className="border rounded"
                        width={200}
                        height={200}
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                  )}
                </div>
              </div>
              <EditorBlock
                data={data}
                onChange={setData}
                holder="editorjs-container"
              />
            </>
          ) : (
            <div className="w-full pt-6">
              <h1 className="text-2xl font-bold text-green-600">Preview</h1>

              <div className="p-16">
                {data && (
                  <EditorJsRenderer
                    data={data}
                    title={title}
                    coverImg={downloadURL}
                    date={getFormattedDate()}
                    tags={tags?.map((t: tag) => t.text)}
                    auther={auther}
                  />
                )}
              </div>
            </div>
          )}
        </div>
        <button
          onSubmit={(e) => onsubmit(e)}
          className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Post Blog
        </button>
      </form>
    </div>
  );
}
