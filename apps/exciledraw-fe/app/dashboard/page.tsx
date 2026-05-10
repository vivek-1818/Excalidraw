"use client";

import { HTTP_BACKEND } from "@/config";
import axios from "axios";
import { ArrowLeft, ExternalLink, LayoutDashboard, Trash2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type DashboardRoom = {
  id: number;
  slug: string;
  createdAt: string;
  _count: {
    chats: number;
  };
};

export default function DashboardPage() {
  const router = useRouter();
  const [rooms, setRooms] = useState<DashboardRoom[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingRoomId, setDeletingRoomId] = useState<number | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/signin");
      return;
    }

    async function loadRooms() {
      try {
        const res = await axios.get(`${HTTP_BACKEND}/rooms/me`, {
          headers: {
            Authorization: token,
          },
        });

        setRooms(res.data.rooms ?? []);
      } catch (err) {
        const message = axios.isAxiosError(err)
          ? err.response?.data?.message
          : undefined;
        setError(message ?? "Could not load your rooms.");
      } finally {
        setLoading(false);
      }
    }

    loadRooms();
  }, [router]);

  async function deleteRoom(roomId: number) {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/signin");
      return;
    }

    const confirmed = window.confirm(
      "Delete this room and all drawings inside it?",
    );
    if (!confirmed) return;

    setDeletingRoomId(roomId);
    setError("");

    try {
      await axios.delete(`${HTTP_BACKEND}/room/${roomId}`, {
        headers: {
          Authorization: token,
        },
      });

      setRooms((currentRooms) =>
        currentRooms.filter((room) => room.id !== roomId),
      );
    } catch (err) {
      const message = axios.isAxiosError(err)
        ? err.response?.data?.message
        : undefined;
      setError(message ?? "Could not delete this room.");
    } finally {
      setDeletingRoomId(null);
    }
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Link
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-zinc-300 transition hover:bg-white/10"
          href="/"
        >
          <ArrowLeft className="h-4 w-4" />
          Home
        </Link>
        <div className="flex items-center gap-2 text-sm text-zinc-400">
          <LayoutDashboard className="h-4 w-4 text-sky-300" />
          Your dashboard
        </div>
      </nav>

      <section className="mx-auto max-w-6xl px-6 py-10">
        <div className="rounded-2xl border border-white/10 bg-zinc-900 p-6 shadow-2xl">
          <div className="flex flex-col gap-4 border-b border-white/10 pb-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm text-sky-300">Rooms created by you</p>
              <h1 className="mt-2 text-3xl font-semibold">Dashboard</h1>
              <p className="mt-2 text-sm text-zinc-400">
                
              </p>
            </div>
            <Link
              className="rounded-lg bg-sky-400 px-4 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-sky-300"
              href="/"
            >
              Create or join room
            </Link>
          </div>

          {error && (
            <p className="mt-6 rounded-lg border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
              {error}
            </p>
          )}

          {loading ? (
            <p className="py-12 text-center text-zinc-400">Loading rooms...</p>
          ) : rooms.length === 0 ? (
            <div className="py-16 text-center">
              <h2 className="text-xl font-semibold">No rooms yet</h2>
              <p className="mt-2 text-sm text-zinc-400">
                Create a room from the home page and it will appear here.
              </p>
            </div>
          ) : (
            <div className="mt-6 overflow-hidden rounded-xl border border-white/10">
              <div className="grid grid-cols-[1fr_120px_170px] bg-zinc-950 px-4 py-3 text-sm font-medium text-zinc-400">
                <span>Room</span>
                <span>Drawings</span>
                <span className="text-right">Actions</span>
              </div>

              {rooms.map((room) => (
                <div
                  className="grid grid-cols-[1fr_120px_170px] items-center border-t border-white/10 px-4 py-4"
                  key={room.id}
                >
                  <div>
                    <p className="font-medium">{room.slug}</p>
                    <p className="mt-1 text-sm text-zinc-500">
                      Created {new Date(room.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <p className="text-sm text-zinc-300">{room._count.chats}</p>
                  <div className="flex justify-end gap-2">
                    <Link
                      className="rounded-lg border border-white/10 p-2 text-zinc-200 transition hover:bg-white/10"
                      href={`/canvas/${room.id}`}
                      title="Open room"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Link>
                    <button
                      className="rounded-lg border border-red-400/30 p-2 text-red-200 transition hover:bg-red-500/10 disabled:cursor-not-allowed disabled:opacity-60"
                      disabled={deletingRoomId === room.id}
                      onClick={() => deleteRoom(room.id)}
                      title="Delete room"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
