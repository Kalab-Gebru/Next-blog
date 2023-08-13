import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import { storage } from "@/firebase.config";
import { parseForm, FormidableError } from "./parse-form";

// Important for NextJS!
export const config = {
  api: {
    bodyParser: false,
  },
};

type Data = {
  success: number;
  file: {
    url: string;
    // ... and any additional fields you want to store, such as width, height, color, extension, etc
  };
};

type Error = {
  error: string;
};

const handler: NextApiHandler = async (req, res) => {
  // try {
  //   const { fields, files } = await parseForm(req);

  //   if (Object.keys(fields).length === 0 && Object.keys(files).length === 0) {
  //     return res.status(400).json({ error: "No files or fields provided." });
  //   }

  //   console.log({ fields, files });

  return NextResponse.json({
    success: 1,
    file: {
      url: "https://www.tesla.com/tesla_theme/assets/img/_vehicle_redesign/roadster_and_semi/roadster/hero.jpg",
    },
  });
  // } catch (e) {
  //   if (e instanceof FormidableError) {
  //     res.status(e.httpCode || 400).json({ error: e.message });
  //   } else {
  //     console.error(e);
  //     res.status(500).json({ error: "Internal Server Error" });
  //   }
  // }
};

export { handler as GET, handler as POST };
