"use client";
import { useState } from "react";
import Image from "next/image";
import Taginput from "./taginput/Taginput";
import { createPosts, updatePosts } from "@/lib/posts";
import getFormattedDate from "@/lib/getFormattedDate";
import { Auther, BlogPost, createdPost, tag } from "@/types";
import { OutputData } from "@editorjs/editorjs";
import dynamic from "next/dynamic";
import EditorJsRenderer from "./EditorJsRenderer";
// import { data1 } from "./defultEditorData";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";
import UploadImageToStorage from "./UploadImg";

const notify = () => toast.success("posted successfully.");

const EditorBlock = dynamic(() => import("./Editor"), {
  ssr: false,
});

type Props = {
  auther: Auther;
  post: BlogPost;
  id: string;
  imgURL: string;
};
/**
 * Renders a form for creating or updating a blog post.
 *
 * @param {Props} props - The props object containing the post data, author information, and optional post ID.
 * @returns {JSX.Element} - The rendered form for creating or updating a blog post.
 */
export default function EditPostForm({
  auther,
  id,
  post,
  imgURL,
}: Props): JSX.Element {
  const defultTags = post?.meta.tags.map((d) => ({ id: d, text: d }));
  const [tags, setTags] = useState(defultTags);
  const [title, setTitle] = useState(post.meta.title);
  const [downloadURL, setDownloadURL] = useState(imgURL);
  const [editMode, setEditMode] = useState(true);
  const [data, setData] = useState<OutputData>(post.content);

  function onsubmit(e: any) {
    e.preventDefault();
    if (tags?.length != 0) {
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
        updatePosts(post, CreatedPostData, id);
        toast.success("posted successfully.");
        redirect(`/posts/${id}`);
      } catch (error) {
        toast.error("Failed to update post. Please try again.");
      }

      setTags([]);
      setTitle("");
      setData({ time: new Date().getMilliseconds(), blocks: [] });
      setEditMode(true);
    } else {
      toast.error("Select at least one tag");
    }
  }

  return (
    <div className="p-4 pb-6">
      <div className="flex items-center justify-between py-4">
        <h1 className="text-2xl">Edit post page</h1>
        <button
          onClick={() => setEditMode((pre) => !pre)}
          className="px-4 py-2 text-white bg-gray-700 border rounded dark:bg-slate-600 dark:border-slate-500"
        >
          Toggle Edit Mode
        </button>
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
