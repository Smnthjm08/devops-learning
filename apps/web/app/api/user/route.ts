import { NextResponse } from "next/server";
import prisma from "@workspace/db";

export async function POST(req: Request) {
  try {
    const { publicKey } = await req.json();

    if (!publicKey) {
      return NextResponse.json(
        { error: "Missing public key" },
        { status: 400 },
      );
    }

    let user = await prisma.user.findUnique({
      where: { publicKey },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          publicKey,
          isOnboarded: false,
        },
      });
    }

    return NextResponse.json({
      user: {
        publicKey: user.publicKey,
        isOnboarded: user.isOnboarded,
      },
    });
  } catch (error) {
    console.error("Error verifying user:", error);
    return NextResponse.json(
      { error: "Error verifying user" },
      { status: 500 },
    );
  }
}
