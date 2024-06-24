import prisma from '@/app/libs/prismadb';
import getCurrentUser from './getCurrentUser';
import { FullConversationType } from '../types';

const getConversations = async () => {
	const currentUser = await getCurrentUser();

	if (!currentUser?.id) {
		return [];
	}

	try {
		const conversations = await prisma.conversation.findMany({
			orderBy: {
				lastMessageAt: 'desc',
			},
			where: {
				users: {
					some: {
						userId: currentUser.id,
					},
				},
			},
			include: {
				users: {
					include: {
						user: true,
					},
				},
				messages: {
					include: {
						sender: true,
						seenBy: {
							include: {
								user: true,
							},
						},
					},
				},
			},
		});

		return conversations as FullConversationType[];
	} catch (error) {
		return [];
	}
};

export default getConversations;
