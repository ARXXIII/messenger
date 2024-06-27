import bcrypt from 'bcrypt';
import prisma from '@/app/libs/prismadb';

import { NextResponse } from 'next/server';

export async function POST(request: Request) {
	try {
		const body = await request.json();
		const { name, email, password } = body;

		if (!email || !name || !password) {
			return new NextResponse('Missing info', { status: 400 });
		}

		const existingUser = await prisma.user.findUnique({
			where: {
				email: email,
			},
		});

		if (existingUser) {
			return new NextResponse('Email already taken', { status: 422 });
		}

		const hashedPassword = await bcrypt.hash(password, 12);

		const user = await prisma.user.create({
			data: {
				name,
				email,
				hashedPassword,
			},
		});

		return NextResponse.json(user);
	} catch (error) {
		return new NextResponse('Internal Error', { status: 500 });
	}
}
