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
  email: string | null;
};

type tag = {
  id: string;
  text: string;
};
