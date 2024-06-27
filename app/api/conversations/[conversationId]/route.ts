import prisma from '@/app/libs/prismadb';
import getCurrentUser from '@/app/actions/getCurrentUser';

import { NextResponse } from 'next/server';
import { pusherServer } from '@/app/libs/pusher';

export async function DELETE(request: Request, { params }: { params: any }) {
	console.log('WORK');

	try {
		const { conversationId } = params;

		const currentUser = await getCurrentUser();

		if (!currentUser?.id || !currentUser?.email) {
			return new NextResponse('Unauthorized', { status: 401 });
		}

		const existingConversation = await prisma.conversation.findUnique({
			where: {
				id: conversationId,
			},
			include: {
				users: {
					include: {
						user: true,
					},
				},
			},
		});

		if (!existingConversation) {
			return new NextResponse('Invalid ID', { status: 400 });
		}

		const deletedConversation = await prisma.conversation.deleteMany({
			where: {
				id: conversationId,
			},
		});

		existingConversation.users.forEach((user) => {
			if (user.user.email) {
				pusherServer.trigger(
					user.user.email,
					'conversation:remove',
					existingConversation
				);
			}
		});

		return NextResponse.json(deletedConversation);
	} catch (error) {
		return new NextResponse('Internal Error', { status: 500 });
	}
}
