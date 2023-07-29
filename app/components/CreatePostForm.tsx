"use client";
import { useState } from "react";
import Taginput from "../components/taginput/Taginput";
import { createPosts } from "@/lib/posts";
import getFormattedDate from "@/lib/getFormattedDate";
import { Auther, tag } from "@/types";
import { OutputData, OutputBlockData } from "@editorjs/editorjs";
import dynamic from "next/dynamic";
import EditorJsRenderer from "../components/EditorJsRenderer";
import { data1 } from "./defultEditorData";

const EditorBlock = dynamic(() => import("../components/Editor"), {
  ssr: false,
});

export default function CreatePostForm(
  User: Auther,
  defultData: OutputBlockData
) {
  const [tags, setTags] = useState([]);
  const [title, setTitle] = useState("");
  const [editMode, setEditMode] = useState(true);
  const [data, setData] = useState<OutputData>();

  function onsubmit(e: any) {
    e.preventDefault();
    if (tags.length != 0) {
      const CreatedPostData = {
        meta: {
          auther: User,
          date: getFormattedDate(),
          title: title,
          tags: tags.map((t: tag) => t.text),
        },
        content: data,
      };
      console.log(data);
      createPosts(CreatedPostData);
      setTags([]);
      setTitle("");
      setData({ time: new Date().getMilliseconds(), blocks: [] });
    } else {
      alert("Select at least one tag");
    }
    //
  }

  return (
    <div className="p-4 pb-6">
      <div className="flex items-center justify-between py-4">
        <h1 className="text-2xl text-gray-900">Create post page</h1>
        <button
          onClick={() => setEditMode((pre) => !pre)}
          className="px-4 py-2 text-white bg-gray-700 rounded"
        >
          Toggle Edit Mode
        </button>
      </div>
      <form
        onSubmit={onsubmit}
        className="flex flex-col justify-between w-full h-full text-gray-800"
      >
        <div className="mb-4">
          <div className="p-4 bg-gray-100">
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
              <label htmlFor="tag" className="block mb-1 text-sm font-medium ">
                Tag
              </label>
              {/* {console.log(tags)} */}
              <Taginput setTags={setTags} tags={tags} />
            </div>
          </div>
          {editMode ? (
            <EditorBlock
              data={data}
              onChange={setData}
              holder="editorjs-container"
            />
          ) : (
            <div className="w-full pt-6">
              <h1 className="text-2xl font-bold text-green-600">Preview</h1>

              <div className="p-16">
                {data && (
                  <EditorJsRenderer
                    data={data}
                    title={title}
                    date={getFormattedDate()}
                    tags={tags.map((t: tag) => t.text)}
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
