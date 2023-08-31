"use client";
import { deleteDraft } from "@/lib/posts";
import { MdDeleteForever } from "react-icons/md";

type Props = {
  draftId: string;
};
export default function DeleteDraft({ draftId }: Props) {
  return (
    <button onClick={() => deleteDraft(draftId)}>
      <MdDeleteForever size={25} color="red" />
    </button>
  );
}
