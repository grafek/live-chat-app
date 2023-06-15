import getServerAuthSession from "@/lib/getServerAuthSession";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerAuthSession();

    console.log(session);

    if (!session)
      return new NextResponse("Unauthorized", {
        status: 401,
      });

    const body = await req.json();
    const { id: userId, name, image } = body;

    const existingChat = await prisma.chat.findFirst({
      where: {
        userIds: {
          equals: [session.user.id, userId],
        },
        OR: {
          userIds: {
            equals: [userId, session.user.id],
          },
        },
      },
    });

    if (existingChat) {
      return NextResponse.json(existingChat);
    }

    const newChat = await prisma.chat.create({
      data: {
        name,
        image,
        users: {
          connect: [
            {
              id: session.user.id,
            },
            {
              id: userId,
            },
          ],
        },
      },
      include: {
        users: true,
      },
    });
    return NextResponse.json(newChat);
  } catch (error) {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
