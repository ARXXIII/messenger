import { IconType } from 'react-icons';
import { Conversation, Message, User } from '@prisma/client';
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';

export interface InputProps {
	id: string;
	type?: string;
	label: string;
	required?: boolean;
	register: UseFormRegister<FieldValues>;
	errors: FieldErrors;
	disabled?: boolean;
}

export interface ButtonProps {
	type?: 'button' | 'submit' | 'reset' | undefined;
	fullWidth?: boolean;
	children?: React.ReactNode;
	onClick?: () => void;
	secondary?: boolean;
	danger?: boolean;
	disabled?: boolean;
}

export interface AuthSocialButtonProps {
	icon: IconType;
	onClick?: () => void;
}

export interface AuthContextProps {
	children: React.ReactNode;
}

export interface DesktopItemProps {
	href: string;
	label: string;
	icon: any;
	active?: boolean;
	onClick?: () => void;
}

export interface MobileItemProps {
	href: string;
	icon: any;
	active?: boolean;
	onClick?: () => void;
}

export interface DesktopSidebarProps {
	currentUser: User;
}

export interface AvatarProps {
	user?: User;
}

export interface UserListProps {
	users: User[];
}

export interface UserBoxProps {
	data: User;
}

export type FullMessageType = Message & {
	sender: User;
	seenBy: User[];
};

export type FullConversationType = Conversation & {
	users: {
		user: User;
	}[];
	messages: FullMessageType[];
};

export interface ConversationListProps {
	initialsItems: FullConversationType[];
}

export interface ConversationBoxProps {
	data: FullConversationType;
	selected?: boolean;
}

export interface ConversationIdProps {
	params: any;
}

export interface HeaderProps {
	conversation: Conversation & {
		users: {
			user: User;
		}[];
	};
}

export interface MessageInputProps {
	id: string;
	type?: string;
	register: UseFormRegister<FieldValues>;
	required?: boolean;
	placeholder?: string;
	errors: FieldErrors;
}

export interface BodyProps {
	initialMessages: FullMessageType[];
}

export interface MessageBoxProps {
	data: FullMessageType;
	isLast?: boolean;
}
