import type { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
// import { storage } from "@/firebase.config";
// import { parseForm, FormidableError } from "./parse-form";

// Important for NextJS!
// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

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

export async function POST(
  request: NextRequest,
  res: NextApiResponse<Data | Error>
) {
  // const secret = request.nextUrl.searchParams.get("url");
  // console.log(request.blob);
  // console.log(storage);

  try {
    // const { fields, files } = await parseForm(request);
    // const body = await request.json();

    // console.log({ fields, files });

    return NextResponse.json({
      success: 1,
      file: {
        url: "https://www.tesla.com/tesla_theme/assets/img/_vehicle_redesign/roadster_and_semi/roadster/hero.jpg",
        // ... and any additional fields you want to store, such as width, height, color, extension, etc
      },
    });
  } catch (e) {
    // if (e instanceof FormidableError) {
    //   res.status(e.httpCode || 400).json({ error: e.message });
    // } else {
    //   console.error(e);
    //   res.status(500).json({ error: "Internal Server Error" });
    // }
  }

  // return NextResponse.json({
  //   success: 1,
  //   file: {
  //     url: "https://www.tesla.com/tesla_theme/assets/img/_vehicle_redesign/roadster_and_semi/roadster/hero.jpg",
  //     // ... and any additional fields you want to store, such as width, height, color, extension, etc
  //   },
  // });
}
