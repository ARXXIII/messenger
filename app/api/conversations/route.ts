import prisma from '@/app/libs/prismadb';
import getCurrentUser from '@/app/actions/getCurrentUser';

import { NextResponse } from 'next/server';
import { pusherServer } from '@/app/libs/pusher';

export async function POST(request: Request) {
	try {
		const currentUser = await getCurrentUser();

		const body = await request.json();
		const { userId, isGroup, members, name } = body;

		if (!currentUser?.id || !currentUser?.email) {
			return new NextResponse('Unauthorized', { status: 401 });
		}

		if (isGroup && (!members || members.length < 2 || !name)) {
			return new NextResponse('Invalid data', { status: 400 });
		}

		if (isGroup) {
			const newConversation = await prisma.conversation.create({
				data: {
					name,
					isGroup,
					users: {
						create: [
							...members.map((member: { value: string }) => ({
								user: { connect: { id: member.value } },
							})),
							{
								user: { connect: { id: currentUser.id } },
							},
						],
					},
				},
				include: {
					users: {
						include: {
							user: true,
						},
					},
				},
			});

			newConversation.users.forEach((user) => {
				if (user.user.email) {
					pusherServer.trigger(
						user.user.email,
						'conversation:new',
						newConversation
					);
				}
			});

			return NextResponse.json(newConversation);
		}

		const existingConversations = await prisma.conversation.findMany({
			where: {
				AND: [
					{
						users: {
							some: {
								userIds: currentUser.id,
							},
						},
					},
					{
						users: {
							some: {
								userIds: userId,
							},
						},
					},
				],
			},
			include: {
				users: true,
			},
		});

		const singleConversation = existingConversations[0];

		if (singleConversation) {
			return NextResponse.json(singleConversation);
		}

		const newConversation = await prisma.conversation.create({
			data: {
				users: {
					create: [
						{
							user: { connect: { id: currentUser.id } },
						},
						{
							user: { connect: { id: userId } },
						},
					],
				},
			},
			include: {
				users: {
					include: {
						user: true,
					},
				},
			},
		});

		newConversation.users.forEach((user) => {
			if (user.user.email) {
				pusherServer.trigger(
					user.user.email,
					'conversation:new',
					newConversation
				);
			}
		});

		return NextResponse.json(newConversation);
	} catch (error) {
		console.log(error, 'CONVERSATIONS_ERROR');

		return new NextResponse('Internal Error', { status: 500 });
	}
}
