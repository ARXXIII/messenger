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
				users: true,
			},
		});

		if (!conversation) {
			return new NextResponse('Invalid ID', { status: 400 });
		}

		const lastMessage = await prisma.message.findFirst({
			where: {
				conversationId: conversationId,
				NOT: {
					senderId: currentUser.id,
				},
			},
			orderBy: {
				createdAt: 'desc',
			},
		});

		if (!lastMessage) {
			return NextResponse.json(conversation);
		}

		const updatedMessage = await prisma.message.update({
			where: {
				id: lastMessage.id,
			},
			include: {
				sender: true,
			},
			data: {
				seen: true,
			},
		});

		return NextResponse.json(updatedMessage);
	} catch (error) {
		console.log(error);
		return new NextResponse('Internal Error', { status: 500 });
	}
}
