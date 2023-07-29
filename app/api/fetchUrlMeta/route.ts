import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("url");

  // if (secret !== process.env.MY_SECRET_TOKEN) {
  //     return new NextResponse(JSON.stringify({ message: 'Invalid Token' }), {
  //         status: 401,
  //         statusText: 'Unauthorized',
  //         headers: {
  //             'Content-Type': 'application/json'
  //         }
  //     })
  // }

  // const path = request.nextUrl.searchParams.get('path') || '/'

  return NextResponse.json({
    success: 1,
    link: "https://codex.so", // Optionally return a link to set the hyperlink URL
    meta: {
      title: "CodeX Team",
      site_name: "CodeX",
      description:
        "Club of web-development, design and marketing. We build team learning how to build full-valued projects on the world market.",
      image: {
        url: "https://codex.so/public/app/img/meta_img.png",
      },
    },
  });
}
