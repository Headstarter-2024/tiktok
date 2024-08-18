import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold">
        Welcome to TikTok Shop Content Submission
      </h1>
      <Link
        href="/submit-content"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Submit Content
      </Link>
    </main>
  );
}
