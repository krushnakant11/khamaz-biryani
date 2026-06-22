import { NextRequest, NextResponse } from 'next/server';

const orders: any[] = [];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { items, totalPrice, customerName, customerPhone, customerEmail, deliveryAddress } = body;

    if (!items || !customerName || !customerPhone || !customerEmail) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const orderId = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

    const order = {
      id: orderId,
      orderId,
      items,
      totalPrice,
      customerName,
      customerPhone,
      customerEmail,
      deliveryAddress,
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    orders.push(order);

    // TODO: Send confirmation email
    console.log('Order placed:', order);

    return NextResponse.json(
      {
        success: true,
        orderId,
        message: 'Order placed successfully',
        order,
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

export async function GET() {
  return NextResponse.json(orders);
}
