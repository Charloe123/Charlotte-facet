import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-8">Page Not Found</h2>
        <p className="text-gray-600 mb-8">
          The page youre looking for doesnt exist or has been moved.
        </p>
        <Link
          href="/"
          className="bg-[#D4AF37] text-white px-6 py-3 rounded-lg hover:bg-[#B8860B] transition"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}