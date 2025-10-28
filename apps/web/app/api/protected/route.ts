// app/api/protected/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function GET(request: NextRequest) {
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
  if (!token || !token.sub) {
    return NextResponse.json({ error: "User wallet not authenticated" });
  }
  return NextResponse.json({
    content: "This is protected content. You can access this content because you are signed in with your Solana Wallet."
  });
}
