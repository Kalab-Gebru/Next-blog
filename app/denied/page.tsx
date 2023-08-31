import Link from "next/link";

export default function Denied() {
  return (
    <section className="flex flex-col items-center gap-12 mt-12">
      <h1 className="text-4xl md:text-5xl">Access Denied</h1>
      <p className="max-w-2xl text-2xl text-center md:text-3xl">
        You are logged in, but you do not have the required access level to view
        this page.
      </p>
      <Link href="/" className="text-3xl underline">
        Return to Home Page
      </Link>
    </section>
  );
}
