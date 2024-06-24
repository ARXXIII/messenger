import prisma from '@/app/libs/prismadb';
import getCurrentUser from './getCurrentUser';
import { FullConversationType } from '../types';

const getConversationById = async (conversationId: string) => {
	try {
		const currentUser = await getCurrentUser();

		if (!currentUser) return null;

		const conversation = await prisma.conversation.findUnique({
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

		return conversation;
	} catch (error) {
		return null;
	}
};

export default getConversationById;
