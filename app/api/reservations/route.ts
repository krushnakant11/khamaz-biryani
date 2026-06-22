import { NextRequest, NextResponse } from 'next/server';

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

    console.log('Reservation:', {
      name,
      email,
      phone,
      date,
      time,
      guests,
      message,
      createdAt: new Date(),
    });

    return NextResponse.json(
      { success: true, message: 'Reservation submitted successfully' },
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
