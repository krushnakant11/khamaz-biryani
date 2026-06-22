import { NextRequest, NextResponse } from 'next/server';

const reservations: any[] = [];

export async function GET() {
  return NextResponse.json(reservations);
}

export async function PUT(request: NextRequest) {
  try {
    const { id, status } = await request.json();

    const reservation = reservations.find(r => r.id === id);
    if (reservation) {
      reservation.status = status;
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update reservation' }, { status: 500 });
  }
}
