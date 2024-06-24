import prisma from '@/app/libs/prismadb';
import getCurrentUser from '@/app/actions/getCurrentUser';

import { NextResponse } from 'next/server';

export async function POST(request: Request, { params }: { params: any }) {
	try {
		const currentUser = await getCurrentUser();

		const { conversationId } = params;

		if (!currentUser?.id || !currentUser?.email) {
			return new NextResponse('Unauthorized', { status: 401 });
		}

		const conversation = await prisma.conversation.findUnique({
			where: {
				id: conversationId,
			},
			include: {
				messages: {
					include: {
						seenBy: true,
					},
				},
				users: true,
			},
		});

		if (!conversation) {
			return new NextResponse('Invalid ID', { status: 400 });
		}

		const lastMessage = conversation.messages[conversation.messages.length - 1];

		if (!lastMessage) {
			return NextResponse.json(conversation);
		}

		const updatedMessage = await prisma.message.update({
			where: {
				id: lastMessage.id,
			},
			include: {
				sender: true,
				seenBy: true,
			},
			data: {
				seenBy: {
					connect: {
						id: currentUser.id,
					},
				},
			},
		});

		return NextResponse.json(updatedMessage);
	} catch (error) {
		console.log(error);
		return new NextResponse('Internal Error', { status: 500 });
	}
}
