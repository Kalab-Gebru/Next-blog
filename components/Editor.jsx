//./components/Editor
"use client";
import React, { memo, useEffect, useRef } from "react";
import EditorJS, { OutputData } from "@editorjs/editorjs";
import { EDITOR_JS_TOOLS } from "./constants";

//props
// type Props = {
//   data?: OutputData;
//   onChange(val: OutputData): void;
//   holder: string;
// };

const EditorBlock = ({ data, onChange, holder }) => {
  //add a reference to editor
  const ref = useRef();

  //initialize editorjs
  useEffect(() => {
    //initialize editor if we don't have a reference
    if (!ref.current) {
      const editor = new EditorJS({
        holder: holder,
        tools: EDITOR_JS_TOOLS,
        placeholder: "Press 'Tab' for Options",
        data,
        async onChange(api, event) {
          const data = await api.saver.save();
          onChange(data);
        },
      });
      ref.current = editor;
    }

    //add a return function handle cleanup
    return () => {
      if (ref.current && ref.current.destroy) {
        ref.current.destroy();
      }
    };
  }, []);

  return (
    <div
      className="pt-6 mx-4 prose-xl md:mx-16 lg:prose-lg dark:prose-invert"
      id={holder}
    />
  );
};

export default memo(EditorBlock);
