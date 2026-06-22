import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { items, totalPrice, customerName, customerPhone, customerEmail } = body;

    if (!items || !customerName || !customerPhone) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    console.log('Order received:', {
      items,
      totalPrice,
      customerName,
      customerPhone,
      customerEmail,
      timestamp: new Date(),
    });

    return NextResponse.json(
      {
        success: true,
        orderId: `ORD-${Date.now()}`,
        message: 'Order placed successfully',
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Order error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
