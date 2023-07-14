import { compileMDX } from "next-mdx-remote/rsc";
import rehypeAutolinkHeadings from "rehype-autolink-headings/lib";
import rehypeHighlight from "rehype-highlight/lib";
import rehypeSlug from "rehype-slug";
import Video from "@/app/components/Video";
import CustomImage from "@/app/components/CustomImage";
import {
  collection,
  doc,
  addDoc,
  getDocs,
  getDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firebase.config";

type Filetree = {
  tree: [
    {
      path: string;
    }
  ];
};

export async function getPostByName(
  postId: string
): Promise<BlogPost | undefined> {
  const postref = doc(db, "Posts", postId);

  try {
    const data = await getDoc(postref);
    console.log(data.data());
    const blogPostObj: BlogPost = {
      meta: {
        id: data.id,
        title: data.data()?.Title,
        date: data.data()?.Date,
        tags: data.data()?.Tags,
      },
      content: data.data()?.Content,
    };

    return blogPostObj;
  } catch (err) {
    console.log("get by id/n");
    console.log(err);
    return undefined;
  }
}

export async function getPostsMeta(): Promise<Meta[] | undefined> {
  const postref = collection(db, "Posts");

  try {
    const data = await getDocs(postref);
    const filterdData = data.docs.map((doc) => ({
      meta: {
        id: doc.id,
        title: doc.data().Title,
        date: doc.data().Date,
        tags: doc.data().Tags,
      },
      content: doc.data().Content,
    }));
    const posts: Meta[] = [];

    for (const post of filterdData) {
      if (post) {
        const { meta } = post;
        posts.push(meta);
      }
    }
    return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
  } catch (err) {
    console.log(err);
    return undefined;
  }
}
