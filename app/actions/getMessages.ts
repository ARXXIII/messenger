import prisma from '@/app/libs/prismadb';

const getMessages = async (conversationId: string) => {
	try {
		const messages = await prisma.message.findMany({
			where: {
				conversationId: conversationId,
			},
			include: {
				sender: true,
			},
			orderBy: {
				sentAt: 'asc',
			},
		});

		return messages;
	} catch (error) {
		return [];
	}
};

export default getMessages;
