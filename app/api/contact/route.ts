import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, message } = body;

    if (!name || !email || !phone || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const contact = {
      id: `CONTACT-${Date.now()}`,
      name,
      email,
      phone,
      message,
      createdAt: new Date().toISOString(),
    };

    // TODO: Send email notification
    console.log('Contact message received:', contact);

    return NextResponse.json(
      {
        success: true,
        message: 'Message sent successfully. We will contact you soon!',
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Contact error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
