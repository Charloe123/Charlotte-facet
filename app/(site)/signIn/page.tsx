"use client";

import { useState } from "react";
import { signIn, getSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid credentials");
        setLoading(false);
        return;
      }

      // Get the session to check user role
      const session = await getSession();
      if ((session?.user as { role: string })?.role === "admin") {
        router.push("/admin/dashboard");
      } else {
        const intendedPath = sessionStorage.getItem("intendedPath");
        if (intendedPath) {
          sessionStorage.removeItem("intendedPath");
          router.push(intendedPath);
        } else {
          router.push("/");
        }
      }
    } catch (err) {
      setError("Something went wrong. Try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Sign In</h2>

        {error && (
          <p className="text-red-600 mb-4 text-center">{error}</p>
        )}

        <label className="block mb-2">
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mt-1 p-2 border rounded"
            required
          />
        </label>

        <label className="block mb-4">
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mt-1 p-2 border rounded"
            required
          />
        </label>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#D4AF37] text-white py-2 rounded hover:bg-[#B8860B] transition"
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>

        <p className="text-center mt-4 text-sm text-gray-600">
          Dont have an account?{" "}
          <a href="/signUp" className="text-[#D4AF37] hover:text-[#B8860B]">
            Sign Up
          </a>
        </p>
      </form>
    </div>
  );
}
