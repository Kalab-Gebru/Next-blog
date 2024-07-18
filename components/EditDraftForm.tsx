"use client";
import { useState } from "react";
import Image from "next/image";
import { updateDrafts } from "@/lib/posts";
import getFormattedDate from "@/lib/getFormattedDate";
import { Auther, BlogPost, createdPost, tag } from "@/types";
import { OutputData } from "@editorjs/editorjs";
import dynamic from "next/dynamic";
import EditorJsRenderer from "./EditorJsRenderer";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import UploadImageToStorage from "./UploadImg";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import TagSelector from "./taginput/TagSelector";

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
export default function EditDraftForm({
  auther,
  id,
  post,
  imgURL,
}: Props): JSX.Element {
  const defultTags = post?.meta.tags.map((d) => ({ value: d, label: d }));
  const [tags, setTags] = useState(defultTags);
  const [title, setTitle] = useState(post.meta.title);
  const [downloadURL, setDownloadURL] = useState(imgURL);
  const [editMode, setEditMode] = useState(true);
  const [data, setData] = useState<OutputData>(post.content);
  const router = useRouter();

  function resetRedirect() {
    setTags([]);
    setTitle("");
    setData({ time: new Date().getMilliseconds(), blocks: [] });
    setEditMode(false);
    setDownloadURL("");
    setEditMode(true);
    router.push(`/authers/${auther.email}`);
  }

  function onsubmit(e: any) {
    e.preventDefault();
    if (tags?.length != 0) {
      const CreatedPostData: createdPost = {
        meta: {
          auther,
          date: getFormattedDate(),
          title: title,
          tags: tags?.map((t: tag) => t.label),
          imgURL: downloadURL,
        },
        content: data,
      };

      try {
        updateDrafts(post, CreatedPostData, id);
        resetRedirect();
      } catch (error) {
        console.log(error);
      }
    } else {
      toast.error("Select at least one tag");
    }
  }

  return (
    <div className="p-4 pb-6">
      <div className="flex flex-col items-end justify-between gap-4 py-4 sm:items-center sm:flex-row">
        <h1 className="w-full text-2xl sm:w-fit">Edit Draft page</h1>

        {/* <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            value=""
            className="sr-only peer"
            onChange={() => setEditMode((pre) => !pre)}
            checked={editMode}
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:tranzinc-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
            Edit Mode
          </span>
        </label> */}
        <div className="flex items-center space-x-2">
          <Switch
            id="edit-mode"
            checked={editMode}
            onCheckedChange={() => setEditMode((pre) => !pre)}
          />
          <Label htmlFor="edit-mode">Edit Mode</Label>
        </div>
      </div>
      <form
        onSubmit={onsubmit}
        className="flex flex-col justify-between w-full h-full text-black dark:text-white"
      >
        <div className="mb-4">
          {editMode ? (
            <>
              <Card className="flex flex-col gap-4 px-8 py-4 ">
                <div className="flex flex-col w-full gap-1">
                  <Label htmlFor="title" className="font-medium">
                    Title
                  </Label>
                  <Input
                    type="text"
                    placeholder="Blog Title"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>
                <div className="z-20 flex flex-col w-full gap-1">
                  <Label htmlFor="tag" className="font-medium">
                    Tag
                  </Label>
                  {/* {console.log(tags)} */}
                  {/* <Taginput setTags={setTags} tags={tags} /> */}
                  <TagSelector setTags={setTags} tags={tags} />
                </div>
                <div className="flex flex-col w-full gap-1">
                  <Label htmlFor="file-input" className="font-medium">
                    Cover Image
                  </Label>
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
              </Card>

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
                    tags={tags?.map((t: tag) => t.label)}
                    auther={auther}
                  />
                )}
              </div>
            </div>
          )}
        </div>
        <Button onSubmit={(e) => onsubmit(e)} className="w-full">
          Save Draft
        </Button>
      </form>
    </div>
  );
}
