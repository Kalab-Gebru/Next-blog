import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
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
    file: {
      url: "https://www.tesla.com/tesla_theme/assets/img/_vehicle_redesign/roadster_and_semi/roadster/hero.jpg",
      // ... and any additional fields you want to store, such as width, height, color, extension, etc
    },
  });
}
