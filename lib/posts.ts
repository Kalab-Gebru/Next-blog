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
import { BlogPost, Meta, createdPost } from "@/types";

export async function getPostById(
  postId: string
): Promise<BlogPost | undefined> {
  const postref = doc(db, "Posts", postId);

  try {
    const data = await getDoc(postref);
    console.log(data.data());
    const blogPostObj: BlogPost = {
      meta: {
        id: data.id,
        ...data.data()?.meta,
      },
      content: data.data()?.content,
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
        ...doc.data().meta,
      },
      content: doc.data().content,
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

export async function createPosts(postInput: createdPost) {
  const postref = collection(db, "Posts");

  try {
    await addDoc(postref, { ...postInput });
    console.log("post created");
  } catch (err) {
    console.log(err);
  }
}

export async function updatePosts(
  post: any,
  postInput: createdPost,
  id: string
) {
  const postref = doc(db, "Posts", id);

  try {
    await updateDoc(postref, {
      meta: {
        ...post.meta,
        title: postInput.meta.title,
        tags: postInput.meta.tags,
        imgURL: postInput.meta.imgURL,
      },
      content: { ...post.content, blocks: postInput.content.blocks },
    });
    console.log("post updated");
  } catch (err) {
    console.log(err);
  }
}
