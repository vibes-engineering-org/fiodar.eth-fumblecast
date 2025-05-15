"use client";

import React, { useState, useRef } from "react";
import { useFrameSDK } from "~/hooks/useFrameSDK";

export default function Fumbler() {
  const { context } = useFrameSDK();
  const [users, setUsers] = useState<any[]>([]);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();
  const [isStarted, setIsStarted] = useState(false);
  const startXRef = useRef(0);

  const startFumbling = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/fumbler/users");
      if (!res.ok) throw new Error("Failed to fetch users");
      const data = await res.json();
      setUsers(data);
      setIndex(0);
      setIsStarted(true);
    } catch (err: any) {
      setError(err.message ?? "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  const handleSwipeLeft = () => setIndex((i) => i + 1);

  const onPointerDown = (e: React.PointerEvent) => {
    startXRef.current = e.clientX;
  };
  const onPointerUp = (e: React.PointerEvent) => {
    if (e.clientX - startXRef.current < -50) {
      handleSwipeLeft();
    }
  };

  if (!isStarted) {
    return (
      <button
        onClick={startFumbling}
        className="w-full py-2 px-4 bg-blue-600 text-white rounded-md"
      >
        Let's fumble
      </button>
    );
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{`Error: ${error}`}</div>;
  if (index >= users.length)
    return (
      <div className="text-center p-4 text-gray-500">
        Have fun staying lonely
      </div>
    );

  const user = users[index];

  return (
    <div className="flex flex-col items-center space-y-4">
      <div
        className="w-32 h-32 rounded-full overflow-hidden"
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
      >
        <img
          src={user.avatarUrl}
          alt={user.username}
          className="object-cover w-full h-full"
        />
      </div>
      <div className="text-center px-4">
        <h2 className="font-semibold">{user.username}</h2>
        <p className="text-sm text-gray-500">{user.bio}</p>
        <blockquote className="mt-2 italic text-sm text-gray-700">
          "{user.topCast}"
        </blockquote>
      </div>
      <p className="text-xs text-gray-400">Swipe left to fumble</p>
    </div>
  );
}
