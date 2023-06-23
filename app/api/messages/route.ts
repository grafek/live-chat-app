import getServerAuthSession from "@/lib/getServerAuthSession";
import { prisma } from "@/lib/prisma";
import { pusherServer } from "@/lib/pusher";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerAuthSession();

    if (!session) {
      return new NextResponse("Unauthorized!", {
        status: 401,
      });
    }

    const body = await req.json();

    const { messageContent, chatId } = body;

    const newMessage = await prisma.message.create({
      data: {
        content: messageContent,
        sender: {
          connect: {
            id: session.user.id,
          },
        },
        chat: {
          connect: {
            id: chatId,
          },
        },
      },
      include: {
        sender: true,
      },
    });

    await pusherServer.trigger(chatId, "messages-new", newMessage);

    return NextResponse.json(newMessage);
  } catch (e) {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
