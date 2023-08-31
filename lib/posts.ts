import {
  collection,
  doc,
  addDoc,
  getDocs,
  getDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";
import { db, storage } from "../firebase.config";
import {
  BlogDraft,
  BlogPost,
  BlogPostAndHeading,
  DraftPostAndHeading,
  Meta,
  createdPost,
  headings,
} from "@/types";
import toast from "react-hot-toast";
import { error } from "console";

export async function getPostById(
  postId: string
): Promise<BlogPostAndHeading | undefined> {
  const postref = doc(db, "Posts", postId);

  try {
    const data = await getDoc(postref);
    // console.log(data.data());
    const blogPostObj: BlogPost = {
      meta: {
        id: data.id,
        ...data.data()?.meta,
      },
      content: data.data()?.content,
    };

    const titles: headings[] = blogPostObj.content.blocks
      .map((data: any) => {
        if (data.type == "header") {
          return {
            text: data.data.text,
            level: data.data.level,
          };
        }
      })
      .filter((data: any) => data != undefined);
    // console.log(titles);

    const postdata: BlogPostAndHeading = {
      post: blogPostObj,
      titles: titles,
    };

    return postdata;
  } catch (err) {
    console.log("get by id/n");
    console.log(err);
    return undefined;
  }
}

export async function getDraftById(
  postId: string
): Promise<DraftPostAndHeading | undefined> {
  const drftref = doc(db, "Draft", postId);

  try {
    const data = await getDoc(drftref);
    // console.log(data.data());
    const blogPostObj: BlogDraft = {
      type: {
        ...data.data()?.type,
      },
      meta: {
        id: data.id,
        ...data.data()?.meta,
      },
      content: data.data()?.content,
    };

    const titles: headings[] = blogPostObj.content.blocks
      .map((data: any, i: number) => {
        if (data.type == "header") {
          return {
            text: data.data.text,
            blockNo: i,
            level: data.data.level,
          };
        }
      })
      .filter((data: any) => data != undefined);
    // console.log(titles);

    const postdata: DraftPostAndHeading = {
      post: blogPostObj,
      titles: titles,
    };

    return postdata;
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

export async function getDraftMeta(id?: string): Promise<Meta[] | undefined> {
  const drftref = collection(db, "Draft");
  let q;
  //  id? q = query(drftref, where("continent", "==", "Asia")):
  q = drftref;
  try {
    const data = await getDocs(q);
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

export async function createDrafts(postInput: createdPost) {
  const draftref = collection(db, "Draft");

  try {
    await addDoc(draftref, { ...postInput, type: { update: false, id: null } });
    console.log("draft created");
    toast.success("draft added successfully.");
  } catch (err) {
    console.log(err);
    toast.error("Failed to create draft. Please try again.");
  }
}

export async function PublishPosts(postInput: createdPost, postId: string) {
  const postref = collection(db, "Posts");
  const drftref = doc(db, "Draft", postId);

  try {
    await addDoc(postref, { ...postInput });
    console.log("post created");
    await deleteDoc(drftref);
    toast.success("posted successfully.");
    // redirect(`/authers/${postInput.meta.auther.email}`);
  } catch (err) {
    console.log(err);
    toast.error("Failed to create post. Please try again.");
  }
}

export async function updatePosts(postInput: createdPost, id: string) {
  const draftref = collection(db, "Draft");

  try {
    await addDoc(draftref, {
      ...postInput,
      type: { update: true, id: id },
    });
    console.log("post updated");
    toast.success("Updated Post Added Draft successfully.");
  } catch (err) {
    console.log(err);
    toast.error("Failed to update post. Please try again.");
    throw new Error();
  }
}

export async function updateDrafts(
  post: any,
  postInput: createdPost,
  id: string
) {
  const postref = doc(db, "Draft", id);

  try {
    await updateDoc(postref, {
      type: {
        ...post.type,
      },
      meta: {
        ...post.meta,
        title: postInput.meta.title,
        tags: postInput.meta.tags,
        imgURL: postInput.meta.imgURL,
      },
      content: { ...post.content, blocks: postInput.content.blocks },
    });
    console.log("Drafts updated");
    toast.success("Drafts updated successfully.");
  } catch (err) {
    console.log(err);
    toast.error("Failed to update draft. Please try again.");
    throw new Error();
  }
}

export async function publishUpdatePost(
  postInput: createdPost,
  postId: string,
  draftId: string
) {
  const postref = doc(db, "Posts", postId);
  const drftref = doc(db, "Draft", draftId);

  try {
    const data = await getDoc(postref);
    await updateDoc(postref, {
      meta: {
        ...data.data()?.meta,
        title: postInput.meta.title,
        tags: postInput.meta.tags,
        imgURL: postInput.meta.imgURL,
      },
      content: { ...data.data()?.content, blocks: postInput.content.blocks },
    });
    if (data.data()?.meta.imgURL != postInput.meta.imgURL) {
      const desertRef = ref(storage, data.data()?.meta.imgURL);
      try {
        await deleteObject(desertRef);
        console.log("deleted old cover image");
      } catch (err) {
        console.log(err);
      }
    }

    console.log("posts updated");
    await deleteDoc(drftref);
    toast.success("posts updated successfully.");
  } catch (err) {
    console.log(err);
    toast.error("Failed to update draft. Please try again.");
    throw new Error();
  }
}

export async function deleteDraft(draftId: string) {
  const drftref = doc(db, "Draft", draftId);

  try {
    await deleteDoc(drftref);
    console.log("draft deleted");
    await deleteDoc(drftref);
    toast.success("draft deleted successfully.");
  } catch (err) {
    console.log(err);
    toast.error("Failed to delete draft. Please try again.");
    throw new Error();
  }
}
