import { NextRequest, NextResponse } from 'next/server';

const orders: any[] = [];

export async function GET() {
  return NextResponse.json(orders);
}

export async function PUT(request: NextRequest) {
  try {
    const { orderId, status } = await request.json();

    const order = orders.find(o => o.orderId === orderId);
    if (order) {
      order.status = status;
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update order' }, { status: 500 });
  }
}
