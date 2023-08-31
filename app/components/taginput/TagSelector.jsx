"use client";
import { useTheme } from "next-themes";
import { TagSuggestions } from "./Tagesuggestions";
import Select from "react-select";

const suggestions = TagSuggestions.map((catagory) => {
  return {
    value: catagory,
    label: catagory,
  };
});

export default function TagSelector({ tags, setTags }) {
  const { theme } = useTheme();

  const colorStyles = {
    control: (styles) => ({
      ...styles,
      backgroundColor: theme == "light" ? "white" : "#48484b",
    }),
    option: (styles) => {
      return {
        ...styles,
        backgroundColor: theme == "light" ? "white" : "#28282b",
        color: theme == "light" ? "black" : "white",
      };
    },

    menuPortal: (base) => ({ ...base, zIndex: 9999 }),
  };
  return (
    <div className="z-20 text-black">
      <Select
        instanceId={1}
        defaultValue={tags}
        onChange={setTags}
        options={suggestions}
        isMulti
        menuPortalTarget={document.body}
        styles={colorStyles}
      />
    </div>
  );
}
