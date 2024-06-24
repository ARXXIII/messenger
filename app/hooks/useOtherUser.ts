import { useMemo } from 'react';
import { User } from '@prisma/client';
import { useSession } from 'next-auth/react';
import { FullConversationType } from '../types';

const useOtherUser = (
	conversation: FullConversationType | { users: User[] }
) => {
	const session = useSession();

	const otherUser = useMemo(() => {
		const currentUserEmail = session?.data?.user?.email;

		if (!currentUserEmail) {
			return [];
		}

		return conversation.users
			.map((user) => ('user' in user ? user.user : user))
			.filter((user) => user.email !== currentUserEmail);
	}, [session?.data?.user?.email, conversation.users]);

	return otherUser;
};

export default useOtherUser;
