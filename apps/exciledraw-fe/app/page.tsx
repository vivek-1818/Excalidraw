"use client";

import { HTTP_BACKEND } from "@/config";
import axios from "axios";
import {
  ArrowRight,
  LockKeyhole,
  LogIn,
  Pencil,
  Plus,
  ShieldCheck,
  Sparkles,
  Users2,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { FormEvent, useEffect, useState } from "react";

type RoomMode = "create" | "join";

export default function HomePage() {
  const router = useRouter();
  const [isAuthed, setIsAuthed] = useState(false);
  const [mode, setMode] = useState<RoomMode>("create");
  const [roomName, setRoomName] = useState("");
  const [roomPassword, setRoomPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setIsAuthed(Boolean(localStorage.getItem("token")));
  }, []);

  async function handleRoomSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/signin");
      return;
    }

    setLoading(true);

    try {
      const endpoint = mode === "create" ? "/room" : "/room/join";
      const res = await axios.post(
        `${HTTP_BACKEND}${endpoint}`,
        {
          name: roomName,
          password: roomPassword,
        },
        {
          headers: {
            Authorization: token,
          },
        },
      );

      router.push(`/canvas/${res.data.roomId}`);
    } catch (err) {
      const message = axios.isAxiosError(err)
        ? err.response?.data?.message
        : undefined;
      setError(message ?? "Could not open that room. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function handleLogout() {
    localStorage.removeItem("token");
    setIsAuthed(false);
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <Link href="/" className="flex items-center gap-3 font-semibold">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-400 text-zinc-950">
            <Pencil className="h-5 w-5" />
          </span>
          Excilidraw
        </Link>

        <div className="flex items-center gap-3">
          {isAuthed ? (
            <>
              <Link
                className="rounded-lg px-4 py-2 text-sm text-zinc-200 transition hover:bg-white/10"
                href="/dashboard"
              >
                Dashboard
              </Link>
              <button
                className="rounded-lg border border-white/10 px-4 py-2 text-sm text-zinc-200 transition hover:bg-white/10"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                className="rounded-lg px-4 py-2 text-sm text-zinc-200 transition hover:bg-white/10"
                href="/signin"
              >
                Sign in
              </Link>
              <Link
                className="rounded-lg bg-sky-400 px-4 py-2 text-sm font-semibold text-zinc-950 transition hover:bg-sky-300"
                href="/signup"
              >
                Sign up
              </Link>
            </>
          )}
        </div>
      </nav>

      <section className="mx-auto grid max-w-7xl gap-10 px-6 py-12 lg:grid-cols-[1.05fr_0.95fr] lg:py-20">
        <div className="flex flex-col justify-center">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-sky-300/20 bg-sky-300/10 px-4 py-2 text-sm text-sky-200">
            <ShieldCheck className="h-4 w-4" />
            Authenticated private rooms
          </div>

          <h1 className="mt-8 max-w-3xl text-5xl font-bold leading-tight sm:text-6xl">
            A fast collaborative canvas for ideas that need a room.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-400">
            Create password-protected whiteboards, invite teammates, sketch with
            live sync, and keep every room available for your next session.
          </p>

          <div className="mt-10 grid max-w-2xl gap-4 sm:grid-cols-3">
            <Feature icon={<Users2 />} title="Realtime" text="Everyone draws together." />
            <Feature icon={<LockKeyhole />} title="Private" text="Rooms require login." />
            <Feature icon={<Sparkles />} title="Polished" text="Shapes, text, colors." />
          </div>
        </div>

        <section className="rounded-2xl border border-white/10 bg-zinc-900 p-6 shadow-2xl">
          <div className="flex rounded-xl bg-zinc-950 p-1">
            <ModeButton
              active={mode === "create"}
              icon={<Plus className="h-4 w-4" />}
              label="Create room"
              onClick={() => setMode("create")}
            />
            <ModeButton
              active={mode === "join"}
              icon={<LogIn className="h-4 w-4" />}
              label="Join room"
              onClick={() => setMode("join")}
            />
          </div>

          <div className="mt-8">
            <h2 className="text-2xl font-semibold">
              {mode === "create" ? "Create a new room" : "Join an existing room"}
            </h2>
            <p className="mt-2 text-sm text-zinc-400">
              {mode === "create"
                ? "Choose a room name and password. Only signed-in users can create it."
                : "Enter the exact room name and password shared by the room owner."}
            </p>
          </div>

          <form className="mt-6 space-y-4" onSubmit={handleRoomSubmit}>
            <label className="block">
              <span className="text-sm text-zinc-300">Room name</span>
              <input
                className="mt-2 w-full rounded-lg border border-white/10 bg-zinc-950 px-4 py-3 text-white outline-none ring-sky-400 transition focus:ring-2"
                value={roomName}
                onChange={(event) => setRoomName(event.target.value)}
                placeholder="design-review"
                required
              />
            </label>

            <label className="block">
              <span className="text-sm text-zinc-300">Room password</span>
              <input
                className="mt-2 w-full rounded-lg border border-white/10 bg-zinc-950 px-4 py-3 text-white outline-none ring-sky-400 transition focus:ring-2"
                value={roomPassword}
                onChange={(event) => setRoomPassword(event.target.value)}
                placeholder="Room password"
                type="password"
                required
              />
            </label>

            {error && (
              <p className="rounded-lg border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                {error}
              </p>
            )}

            {!isAuthed && (
              <p className="rounded-lg border border-amber-300/20 bg-amber-300/10 px-4 py-3 text-sm text-amber-100">
                Please sign in before creating or joining a room.
              </p>
            )}

            <button
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-sky-400 px-4 py-3 font-semibold text-zinc-950 transition hover:bg-sky-300 disabled:cursor-not-allowed disabled:opacity-60"
              disabled={loading}
              type="submit"
            >
              {loading ? "Opening room..." : mode === "create" ? "Create room" : "Join room"}
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>
        </section>
      </section>
    </main>
  );
}

function Feature({
  icon,
  title,
  text,
}: {
  icon: ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
      <div className="text-sky-300">{icon}</div>
      <h3 className="mt-3 font-semibold">{title}</h3>
      <p className="mt-1 text-sm text-zinc-400">{text}</p>
    </div>
  );
}

function ModeButton({
  active,
  icon,
  label,
  onClick,
}: {
  active: boolean;
  icon: ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-medium transition ${
        active ? "bg-sky-400 text-zinc-950" : "text-zinc-300 hover:bg-white/10"
      }`}
      onClick={onClick}
      type="button"
    >
      {icon}
      {label}
    </button>
  );
}
