import { inngest } from "@/config/inngest";
import Product from "@/models/Product";
import User from "@/models/User";
import { getAuth } from "@clerk/nextjs/server";
import { err } from "inngest/types";
import { NextResponse } from "next/server";




export async function POST(request) {
    try {

        const { userId } = getAuth(request)
        const { items, address } = await request.json()

        if (!address || items.length === 0) {
            return NextResponse.json({ success: false, message: 'Invalid data' })
        }

        // Calculate amount using items
        const amount =  await items.reduce(async (acc, item) => {
            const product = await Product.findById(item.product);
            return acc + product.offerprice * item.quantity
        }, 0)

        
        await inngest.send({
            name: 'order/created',
            date: {
                userId,
                address,
                items,
                amount: amount + Math.floor(amount * 0.02),
                date: Date.now()

            }
        })

        //  clear user cart
        const user = await User.findById(userId)
        user.cartItems = []
        await user.save()

        return NextResponse.json({ success: true, message: 'Order placed ' })

    } catch (error) {
        console.log(error);
        return NextResponse.json({ success: false, message: error.message })

        
    }
}