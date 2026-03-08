import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';
import { cookies } from 'next/headers';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_key_change_me_in_production';

export async function GET() {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('admin_session')?.value;

        if (!token) {
            return NextResponse.json({ authenticated: false }, { status: 401 });
        }

        // Verify token
        await jwtVerify(token, new TextEncoder().encode(JWT_SECRET));

        return NextResponse.json({ authenticated: true }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ authenticated: false }, { status: 401 });
    }
}
