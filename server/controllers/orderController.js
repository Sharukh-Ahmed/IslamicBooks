import Order from "../models/Order.js"
import Product from "../models/Product.js"
import stripe from "stripe"
import User from "../models/User.js"


//Place Order COD : /api/order/cod
export const placeOrderCOD = async (req, res) => {
    try {
        const { userId, items, address } = req.body
        if (!address || items.length === 0) {
            return res.json({ success: false, message: "Invalid Data" })
        }
        
        // Calculate Amount Using Items
        let amount = 0;
        for (const item of items) {
            const product = await Product.findById(item.product);
            if (product) {
                amount += product.offerPrice * item.quantity;
            }
        }

        //Add tax 2%
        amount += Math.floor(amount * 0.02)

        await Order.create({
            userId,
            items,
            amount,
            address,
            paymentType: "COD"

        });

        return res.json({ success: true, message: "Order Placed Successfully" })


    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: error.message })
    }
}
//Place Order Stripe : /api/order/stripe
export const placeOrderStripe = async (req, res) => {
    try {
        const { userId, items, address } = req.body
        const { origin } = req.headers;

        if (!address || items.length === 0) {
            return res.json({ success: false, message: "Invalid Data" })
        }

        let productData = [];
        let amount = 0;

        // Calculate Amount Using Items
        for (const item of items) {
            const product = await Product.findById(item.product);
            if (product) {
                productData.push({
                    name: product.name,
                    price: product.offerPrice,
                    quantity: item.quantity,
                });
                amount += product.offerPrice * item.quantity;
            }
        }

        //Add tax 2%
        amount += Math.floor(amount * 0.02)

        const order = await Order.create({
            userId,
            items,
            amount,
            address,
            paymentType: "Online"

        });

        console.log('Order created successfully:', order._id.toString());

        //Stripe Gateway Initialize
        const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);

        // create line items for stripe
        const line_items = productData.map((item) => {
            return {
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: item.name,
                    },
                    unit_amount: Math.floor(item.price + item.price * 0.02) * 100
                },
                quantity: item.quantity,

            }
        })

        //Create session
        const session = await stripeInstance.checkout.sessions.create({
            line_items,
            mode: "payment",
            success_url: `${origin}/loader?next=order-success`,
            cancel_url: `${origin}/cart`,
            metadata: {
                orderId: order._id.toString(),
                userId,
            }

        })

        console.log('Stripe session created:', session.id);
        console.log('Session metadata:', session.metadata);

        return res.json({ success: true, url: session.url })


    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: error.message })
    }
}

// Test webhook endpoint for debugging
export const testWebhook = async (req, res) => {
    console.log('Test webhook endpoint hit');
    console.log('Headers:', req.headers);
    console.log('Body:', req.body);
    res.json({ success: true, message: 'Test webhook received' });
}

//Stripe Webhooks to Verify Payments Action : /stripe

export const stripeWebhooks = async (req, res) => {
    console.log('Webhook received:', req.headers['stripe-signature'] ? 'Signature present' : 'No signature');
    
    const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);

    const sig = req.headers["stripe-signature"]
    let event;

    try {
        event = stripeInstance.webhooks.constructEvent(
            req.body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
        )
        console.log('Webhook event verified successfully:', event.type);
    } catch (error) {
        console.error('Webhook signature verification failed:', error.message);
        return res.status(400).send(`webhook error : ${error.message}`)
    }

    //handle the event
    switch (event.type) {
        case "checkout.session.completed": {
            const session = event.data.object;
            console.log('Checkout session completed:', session.id);
            console.log('Session metadata:', session.metadata);
            
            const { orderId, userId } = session.metadata;
            
            if (!orderId) {
                console.error('No orderId found in session metadata');
                return res.status(400).json({ error: 'No orderId in metadata' });
            }

            try {
                console.log('Attempting to update order:', orderId);
                
                // Mark Payment as Paid
                const updatedOrder = await Order.findByIdAndUpdate(
                    orderId, 
                    { isPaid: true },
                    { new: true }
                );
                
                if (!updatedOrder) {
                    console.error('Order not found:', orderId);
                    return res.status(404).json({ error: 'Order not found' });
                }
                
                console.log('Order marked as paid successfully:', orderId);
                console.log('Updated order:', updatedOrder);

                //Clear Cart
                if (userId) {
                    const updatedUser = await User.findByIdAndUpdate(userId, { cartItems: {} }, { new: true });
                    console.log('Cart cleared for user:', userId);
                    console.log('Updated user cart:', updatedUser.cartItems);
                }
            } catch (error) {
                console.error('Error updating order:', error);
                return res.status(500).json({ error: 'Failed to update order' });
            }
            break;
        }
        case "checkout.session.expired": {
            const session = event.data.object;
            console.log('Checkout session expired:', session.id);
            const { orderId } = session.metadata;
            
            if (orderId) {
                try {
                    await Order.findByIdAndDelete(orderId);
                    console.log('Order deleted due to expired session:', orderId);
                } catch (error) {
                    console.error('Error deleting expired order:', error);
                }
            }
            break;
        }
        case "payment_intent.payment_failed": {
            const paymentIntent = event.data.object;
            console.log('Payment failed:', paymentIntent.id);

            try {
                //getting session metadata
                const sessions = await stripeInstance.checkout.sessions.list({
                    payment_intent: paymentIntent.id,
                });

                if (sessions.data.length > 0) {
                    const { orderId } = sessions.data[0].metadata;
                    if (orderId) {
                        await Order.findByIdAndDelete(orderId);
                        console.log('Order deleted due to failed payment:', orderId);
                    }
                }
            } catch (error) {
                console.error('Error handling failed payment:', error);
            }
            break;
        }

        default:
            console.log(`Unhandled event type ${event.type}`)
            break;
    }
    res.json({received: true})
}

// Get Orders by UserID : /api/order/user

export const getUserOrders = async (req, res) => {
    try {
        // Get userId from either req.user._id or req.body.userId for compatibility
        const userId = req.user?._id || req.body?.userId;
        
        if (!userId) {
            return res.json({ success: false, message: "User ID not found" });
        }
        
        console.log('Fetching orders for user:', userId);
        
        const orders = await Order.find({
            userId,
            // $or: [{ paymentType: "COD" }, { isPaid: true }]
        }).populate("items.product address").sort({ createdAt: -1 });
        
        console.log('Found orders:', orders.length);
        console.log('Orders:', orders.map(order => ({ id: order._id, isPaid: order.isPaid, paymentType: order.paymentType })));
        
        res.json({ success: true, orders })
    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: error.message })

    }
}

// get all Seller Orders/Admin : /api/order/seller

export const getAllOrders = async (req, res) => {
    try {
        // For seller/admin, get all orders without userId filter
        const orders = await Order.find({
            $or: [{ paymentType: "COD" }, { isPaid: true }]
        }).populate("items.product address").sort({ createdAt: -1 });
        
        console.log('Seller found orders:', orders.length);
        
        res.json({ success: true, orders })
    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: error.message })

    }
}