import { NextRequest, NextResponse } from 'next/server';

const reservations: any[] = [];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, date, time, guests, message } = body;

    if (!name || !email || !phone || !date || !time) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const reservation = {
      id: `RES-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      name,
      email,
      phone,
      date,
      time,
      guests: parseInt(guests),
      message,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    reservations.push(reservation);

    // TODO: Send confirmation email
    console.log('Reservation created:', reservation);

    return NextResponse.json(
      {
        success: true,
        reservationId: reservation.id,
        message: 'Reservation submitted successfully',
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Reservation error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(reservations);
}
