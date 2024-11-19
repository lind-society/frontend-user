import { NextResponse } from 'next/server';

import { deleteSession } from '@/modules/auth/session';

export async function POST(): Promise<NextResponse> {
  try {
    await deleteSession();
    return NextResponse.json(
      { message: 'Logged out successfully' },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: 'Logout failed' }, { status: 500 });
  }
}
