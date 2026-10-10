import Link from "next/link";

export default function NotFound() {
  return (
    <main
      id="main"
      tabIndex={-1}
      className="mx-auto flex min-h-svh w-full max-w-(--page-max) flex-col justify-center gap-8 px-(--gutter) pt-(--nav-height) focus:outline-none"
    >
      <h1 className="type-editorial">That page doesn&apos;t exist.</h1>
      <Link href="/" className="text-link type-meta inline-flex min-h-11 w-fit items-center">
        Back to the homepage
      </Link>
    </main>
  );
}
