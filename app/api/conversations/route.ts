import prisma from '@/app/libs/prismadb';
import getCurrentUser from '@/app/actions/getCurrentUser';

import { NextResponse } from 'next/server';

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
						connect: [
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

			return NextResponse.json(newConversation);
		}

		const existingConversations = await prisma.conversation.findMany({
			where: {
				users: {
					some: {
						userId: currentUser.id,
					},
				},
				AND: {
					users: {
						some: {
							userId,
						},
					},
				},
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

		return NextResponse.json(newConversation);
	} catch (error) {
		return new NextResponse('Internal Error', { status: 500 });
	}
}
