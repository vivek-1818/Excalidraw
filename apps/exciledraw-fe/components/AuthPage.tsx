"use client";

import { HTTP_BACKEND } from "@/config";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export function AuthPage({isSignin}: {
    isSignin: boolean
}) {
    const router = useRouter();
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setError("");
        setLoading(true);

        try {
            if (!isSignin) {
                await axios.post(`${HTTP_BACKEND}/signup`, {
                    name,
                    username,
                    password,
                });
            }

            const res = await axios.post(`${HTTP_BACKEND}/signin`, {
                username,
                password,
            });

            if (!res.data.token) {
                setError(res.data.message ?? "Incorrect credentials.");
                return;
            }

            localStorage.setItem("token", res.data.token);
            router.push("/");
        } catch (err) {
            const message = axios.isAxiosError(err)
                ? err.response?.data?.message
                : undefined;
            setError(message ?? "Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <main className="min-h-screen bg-zinc-950 text-white">
            <div className="mx-auto flex min-h-screen w-full max-w-6xl items-center justify-center px-6 py-10">
                <div className="grid w-full overflow-hidden rounded-2xl border border-white/10 bg-zinc-900 shadow-2xl md:grid-cols-[1fr_420px]">
                    <section className="hidden bg-zinc-950 p-10 md:block">
                        <Link href="/" className="text-sm font-semibold text-sky-300">
                            Excilidraw
                        </Link>
                        <div className="mt-20 max-w-md">
                            <h1 className="text-4xl font-bold leading-tight">
                                Draw, plan, and collaborate in private rooms.
                            </h1>
                            <p className="mt-5 text-sm leading-6 text-zinc-400">
                                Sign in to create password-protected canvases, invite teammates,
                                and keep every sketch synced in real time.
                            </p>
                        </div>
                    </section>

                    <section className="p-8 sm:p-10">
                        <div>
                            <p className="text-sm text-zinc-400">
                                {isSignin ? "Welcome back" : "Create your account"}
                            </p>
                            <h2 className="mt-2 text-3xl font-semibold">
                                {isSignin ? "Sign in" : "Sign up"}
                            </h2>
                        </div>

                        <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
                            {!isSignin && (
                                <label className="block">
                                    <span className="text-sm text-zinc-300">Name</span>
                                    <input
                                        className="mt-2 w-full rounded-lg border border-white/10 bg-zinc-950 px-4 py-3 text-white outline-none ring-sky-400 transition focus:ring-2"
                                        value={name}
                                        onChange={(event) => setName(event.target.value)}
                                        placeholder="Your name"
                                        required
                                    />
                                </label>
                            )}

                            <label className="block">
                                <span className="text-sm text-zinc-300">Email</span>
                                <input
                                    className="mt-2 w-full rounded-lg border border-white/10 bg-zinc-950 px-4 py-3 text-white outline-none ring-sky-400 transition focus:ring-2"
                                    value={username}
                                    onChange={(event) => setUsername(event.target.value)}
                                    placeholder="you@example.com"
                                    type="email"
                                    required
                                />
                            </label>

                            <label className="block">
                                <span className="text-sm text-zinc-300">Password</span>
                                <input
                                    className="mt-2 w-full rounded-lg border border-white/10 bg-zinc-950 px-4 py-3 text-white outline-none ring-sky-400 transition focus:ring-2"
                                    value={password}
                                    onChange={(event) => setPassword(event.target.value)}
                                    placeholder="At least 6 characters"
                                    type="password"
                                    required
                                />
                            </label>

                            {error && (
                                <p className="rounded-lg border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                                    {error}
                                </p>
                            )}

                            <button
                                className="w-full rounded-lg bg-sky-400 px-4 py-3 font-semibold text-zinc-950 transition hover:bg-sky-300 disabled:cursor-not-allowed disabled:opacity-60"
                                disabled={loading}
                                type="submit"
                            >
                                {loading ? "Please wait..." : isSignin ? "Sign in" : "Create account"}
                            </button>
                        </form>

                        <p className="mt-6 text-center text-sm text-zinc-400">
                            {isSignin ? "New here?" : "Already have an account?"}{" "}
                            <Link
                                className="font-medium text-sky-300 hover:text-sky-200"
                                href={isSignin ? "/signup" : "/signin"}
                            >
                                {isSignin ? "Create an account" : "Sign in"}
                            </Link>
                        </p>
                    </section>
                </div>
            </div>
        </main>
    );
}
