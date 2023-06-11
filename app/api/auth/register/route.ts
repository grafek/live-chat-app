import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const userData = await req.json();

  const userExists = await prisma.user.findUnique({
    where: {
      email: userData.email,
    },
  });

  if (userExists) {
    return new NextResponse(null, {
      status: 400,
      statusText: "This user is already registered!",
    });
  }

  const user = await prisma.user.create({
    data: userData,
  });

  return NextResponse.json(user);
}