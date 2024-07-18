"use client";
import { deleteDraft } from "@/lib/posts";
import { MdDeleteForever } from "react-icons/md";

type Props = {
  draftId: string;
};
export default function DeleteDraft({ draftId }: Props) {
  return (
    <button onClick={() => deleteDraft(draftId)}>
      <MdDeleteForever
        size={25}
        color="red"
        className="w-10 h-10 text-red-600 hover:text-red-700 md:w-6 md:h-6"
      />
    </button>
  );
}
