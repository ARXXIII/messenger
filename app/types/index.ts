import { User } from '@prisma/client';
import { IconType } from 'react-icons';
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
