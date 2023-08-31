import Posts from "./components/Posts";
import AllTags from "./components/AllTags";

export const revalidate = 86400;

export default function Home() {
  return (
    <div className="w-full">
      <p className="px-4 mt-12 mb-6 text-3xl text-center">
        Hello And Welcome 👋&nbsp;
        <span className="whitespace-nowrap">
          I'm <span className="font-bold">Kalab</span>.
        </span>{" "}
        And This My Blog
      </p>

      <div className="flex justify-center gap-6 mx-auto">
        <Posts />
        <AllTags />
      </div>
    </div>
  );
}
