import { type } from "os";

type Meta = {
  id: string;
  title: string;
  auther: Auther;
  date: string;
  imgURL: string;
  tags: string[];
};

type BlogPost = {
  meta: Meta;
  // content: ReactElement<any, string | JSXElementConstructor<any>>,
  content: any;
};

type BlogDraft = {
  type: { update: boolean; id: string };
  meta: Meta;
  // content: ReactElement<any, string | JSXElementConstructor<any>>,
  content: any;
};

type BlogPostAndHeading = {
  post: BlogPost;
  // content: ReactElement<any, string | JSXElementConstructor<any>>,
  titles: headings[];
};

type DraftPostAndHeading = {
  post: BlogDraft;
  // content: ReactElement<any, string | JSXElementConstructor<any>>,
  titles: headings[];
};

type createdPost = {
  meta: {
    auther: Auther;
    date: string;
    title: string;
    tags: string[];
    imgURL: string;
  };
  content: any;
};

type Auther = {
  userName: string | null;
  img: string | null;
  email: string | null;
  role: string | null;
};

type tag = {
  value: string;
  label: string;
};

type headings = {
  text: string;
  blockNo: number;
  level: number;
};
