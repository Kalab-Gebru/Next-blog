"use client";
import { signIn } from "next-auth/react";
export default function SignInButton() {
  const popupCenter = (url: string, title: string) => {
    const dualScreenLeft = window.screenLeft ?? window.screenX;
    const dualScreenTop = window.screenTop ?? window.screenY;

    const width =
      window.innerWidth ?? document.documentElement.clientWidth ?? screen.width;

    const height =
      window.innerHeight ??
      document.documentElement.clientHeight ??
      screen.height;

    const systemZoom = width / window.screen.availWidth;

    const left = (width - 500) / 2 / systemZoom + dualScreenLeft;
    const top = (height - 550) / 2 / systemZoom + dualScreenTop;

    const newWindow = window.open(
      url,
      title,
      `width=${500 / systemZoom},height=${
        550 / systemZoom
      },top=${top},left=${left}`
    );

    newWindow?.focus();
  };
  return (
    <button
      // onClick={() => popupCenter("/api/auth/signin", "Sample Sign In")}
      onClick={() => signIn("google")}
      className="px-4 py-1 text-lg text-white no-underline uppercase bg-blue-700 rounded"
    >
      Sign In
    </button>
  );
}
