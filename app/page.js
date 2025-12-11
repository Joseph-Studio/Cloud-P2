"use client";

import { useState, useEffect } from "react";
import { redirect } from 'next/navigation';
import { useUserAuth } from './_utils/auth-context';

export default function Home() {
  const { user, emailSignIn, gitHubSignIn } = useUserAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Redirect AFTER user becomes available
  useEffect(() => {
    if (user) redirect("/Dashboard");
  }, [user]);

  // ---------- GitHub Login ----------
  async function handleGithubSignIn() {
    try {
      await gitHubSignIn();
    } catch (error) {
      console.log(error);
    }
  }

  // ---------- Email Login ----------
  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await emailSignIn(email, password);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex justify-center items-center h-screen">
      <main className="bg-gray-600 max-w-sm w-full justify-items-center rounded-2xl border text-center">
        <header>
          <h1 className="text-2xl font-serif underline my-4">Welcome to Cloud P3</h1>
        </header>

        {/* Email Login */}
        <div className="border-b-2 border-b-neutral-50 pb-4">
          <p>Sign-in With Your Email</p>

          <form onSubmit={handleEmailLogin} className="flex flex-col items-center">
            <input
              type="email"
              placeholder="Email"
              className="m-2 p-1 rounded text-black border-2 border-neutral-50"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Password"
              className="m-2 p-1 rounded text-black border-2 border-neutral-50"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button 
              type="submit"
              disabled={loading}
              className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700"
            >
              {loading ? "Loading…" : "Login"}
            </button>

            {error && <p className="text-red-300 mt-2">{error}</p>}
          </form>

          <p className="mt-4">
            Don't have an account?{" "}
            <a href="/CreateAccount" className="underline">Create one</a>
          </p>

        </div>

        {/* GitHub Login */}
        <div className="mb-4 mt-4">
          <p>Sign-in With A Third Party</p>
          <button
            onClick={handleGithubSignIn}
            className="text-lg bg-blue-600 text-white rounded px-2 mt-4 hover:bg-blue-800"
            type="button"
          >
            Sign In With Github
          </button>
        </div>
      </main>
    </section>
  );
}
