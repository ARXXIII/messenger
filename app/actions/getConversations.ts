import prisma from '@/app/libs/prismadb';
import getCurrentUser from './getCurrentUser';

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
						userIds: currentUser.id,
					},
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

		return conversations;
	} catch (error) {
		return [];
	}
};

export default getConversations;
