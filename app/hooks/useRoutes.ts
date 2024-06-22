import useConversation from './useConversation';

import { useMemo } from 'react';
import { signOut } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import {
	HiUsers,
	HiArrowLeftOnRectangle,
	HiChatBubbleLeftRight,
} from 'react-icons/hi2';

const useRoutes = () => {
	const pathname = usePathname();

	const { conversationId } = useConversation();

	const routes = useMemo(
		() => [
			{
				href: '/conversation',
				label: 'All chats',
				icon: HiChatBubbleLeftRight,
				active: pathname === '/conversation' || !!conversationId,
			},
			{
				href: '/users',
				label: 'Users',
				icon: HiUsers,
				active: pathname === '/users',
			},
			{
				href: '#',
				label: 'Log out',
				icon: HiArrowLeftOnRectangle,
				onClick: () => signOut(),
			},
		],
		[pathname, conversationId]
	);

	return routes;
};

export default useRoutes;
