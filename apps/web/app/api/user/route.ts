import { NextResponse } from "next/server";
import { checkUserByPublicKey } from "@/actions/user";

export async function POST(req: Request) {
  try {
    const { publicKey } = await req.json();

    if (!publicKey) {
      return NextResponse.json(
        { error: "Missing public key" },
        { status: 400 },
      );
    }

    const user = await checkUserByPublicKey(publicKey);

    return NextResponse.json({ user });
  } catch (error) {
    console.error("Error verifying user:", error);
    return NextResponse.json(
      { error: "Error verifying user" },
      { status: 500 },
    );
  }
}
