import { NextResponse } from 'next/server';
import connectToDatabase from '@/app/lib/db';
import { Portfolio } from '@/app/models/Portfolio';
import { jwtVerify } from 'jose';
import { cookies } from 'next/headers';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_key_change_me_in_production';

// Helper to verify auth for PUT requests
async function isAuthenticated() {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('admin_session')?.value;
        if (!token) return false;
        await jwtVerify(token, new TextEncoder().encode(JWT_SECRET));
        return true;
    } catch (err) {
        return false;
    }
}

export async function GET() {
    try {
        await connectToDatabase();

        // There should theoretically only be one portfolio document in this DB.
        let data = await Portfolio.findOne().sort({ createdAt: -1 });

        // If no data exists, we can create a default empty one just in case
        if (!data) {
            data = await Portfolio.create({});
        }

        return NextResponse.json({ success: true, data }, { status: 200 });
    } catch (error) {
        console.error('API GET Portfolio Error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function PUT(req: Request) {
    try {
        const authorized = await isAuthenticated();
        if (!authorized) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        await connectToDatabase();

        const body = await req.json();

        // Always update the first document or create it if absent
        const data = await Portfolio.findOneAndUpdate(
            {}, // filter (empty means any)
            body,
            { new: true, upsert: true, setDefaultsOnInsert: true }
        );

        return NextResponse.json({ success: true, data }, { status: 200 });
    } catch (error) {
        console.error('API PUT Portfolio Error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
