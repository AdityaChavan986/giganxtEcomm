import connectDB from "@/config/db";
import authSeller from "@/lib/authSeller";
import Order from "@/models/Order";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PUT(request) {
    try {
        const { userId } = getAuth(request);
        const isSeller = await authSeller(userId);
        
        if (!isSeller) {
            return NextResponse.json({ success: false, message: 'Unauthorized User' });
        }

        const { orderId, status } = await request.json();

        if (!orderId || !status) {
            return NextResponse.json({ success: false, message: 'Missing required fields' });
        }

        await connectDB();
        
        const order = await Order.findById(orderId);
        if (!order) {
            return NextResponse.json({ success: false, message: 'Order not found' });
        }

        order.status = status;
        await order.save();

        return NextResponse.json({ success: true, message: 'Order status updated successfully' });

    } catch (error) {
        return NextResponse.json({ success: false, message: error.message });
    }
} 