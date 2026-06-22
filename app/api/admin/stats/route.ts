import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Verify admin access (in production, use proper authentication)
    const authHeader = request.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.ADMIN_SECRET}`) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const stats = {
      totalOrders: 142,
      totalRevenue: 45600,
      averageRating: 4.8,
      totalCustomers: 89,
      pendingOrders: 5,
      completedOrders: 137,
      totalReservations: 23,
      confirmedReservations: 18,
    };

    return NextResponse.json(stats);
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
