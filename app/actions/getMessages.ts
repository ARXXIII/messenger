import prisma from '@/app/libs/prismadb';
import { FullMessageType } from '../types';

const getMessages = async (conversationId: string) => {
	try {
		const messages = await prisma.message.findMany({
			where: {
				conversationId: conversationId,
			},
			include: {
				sender: true,
				seenBy: {
					include: {
						user: true,
					},
				},
			},
			orderBy: {
				createdAt: 'asc',
			},
		});

		const transformedMessages = messages.map((message) => ({
			...message,
			seenBy: message.seenBy.map((seen) => seen.user),
		}));

		return transformedMessages as FullMessageType[];
	} catch (error) {
		return [];
	}
};

export default getMessages;
