import { NextResponse } from "next/server";

export async function GET() {
  const users = Array.from({ length: 100 }, (_, i) => ({
    fid: `0x${Math.floor(1e16 + Math.random() * 1e16).toString(16)}`,
    username: `user${i + 1}`,
    bio: `I am user${i + 1} on Farcaster`,
    avatarUrl: `https://api.dicebear.com/5.x/identicon/svg?seed=${i}`,
    topCast: `This is my top cast #${i + 1}`,
  }));
  return NextResponse.json(users);
}
