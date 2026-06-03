import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black py-20">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-center py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left w-full">
          <h1 className="text-5xl font-bold leading-tight tracking-tight text-black dark:text-zinc-50">
            HK-Space
          </h1>
          <p className="text-xl leading-8 text-zinc-600 dark:text-zinc-400">
            A private family storage platform where your files stay on your device.
          </p>

          <div className="mt-8 space-y-4">
            <h2 className="text-2xl font-semibold text-black dark:text-white">Features</h2>
            <ul className="text-zinc-600 dark:text-zinc-400 space-y-2">
              <li>✅ Secure user authentication</li>
              <li>✅ Admin and user roles</li>
              <li>✅ Files stored on your device</li>
              <li>✅ Family-friendly sharing</li>
            </ul>
          </div>

          <div className="mt-12 flex flex-col gap-4 text-base font-medium sm:flex-row">
            <Link
              href="/auth/register"
              className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-blue-500 px-5 text-white hover:bg-blue-600 transition-colors md:w-[158px]"
            >
              Get Started
            </Link>
            <Link
              href="/auth/login"
              className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]"
            >
              Login
            </Link>
          </div>

          <div className="mt-12 p-6 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800 w-full">
            <h3 className="font-semibold text-yellow-900 dark:text-yellow-200 mb-2">
              Phase 1 Complete
            </h3>
            <p className="text-yellow-800 dark:text-yellow-300 text-sm">
              Basic authentication system is ready. Coming next: File browser, upload/download, and file management.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
