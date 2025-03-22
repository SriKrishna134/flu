import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// place user order from frontend //
const placeOrder = async (req, res) => {
    const frontendurl = "http://localhost:5174";
    try {
        if (req.body.userId) {
            const newOrder = new orderModel({
                userId: req.body.userId,
                items: req.body.items,
                amount: req.body.amount,
                address: req.body.address,
                paymentMethod: req.body.paymentMethod, // Add payment method to the order
                payment: req.body.paymentMethod === "cod" ? true : false, // Mark as paid for COD
            });

            await newOrder.save();
            await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

            // Check payment method
            if (req.body.paymentMethod === "card") {
                const line_items = req.body.items.map((item) => ({
                    price_data: {
                        currency: "inr",
                        product_data: {
                            name: item.name,
                        },
                        unit_amount: item.price * 100,
                    },
                    quantity: item.quantity,
                }));

                line_items.push({
                    price_data: {
                        currency: "inr",
                        product_data: {
                            name: "Delivery Charges",
                        },
                        unit_amount: 2 * 100, // 2 is the delivery fee
                    },
                    quantity: 1,
                });

                const session = await stripe.checkout.sessions.create({
                    line_items: line_items,
                    mode: 'payment',
                    success_url: `${frontendurl}/verify?success=true&orderId=${newOrder._id}`,
                    cancel_url: `${frontendurl}/verify?success=false&orderId=${newOrder._id}`,
                });

                res.json({ success: true, session_url: session.url });
            } else {
                // If payment method is COD, skip Stripe and confirm order directly
                res.json({ success: true, message: "Order placed with Cash on Delivery" });
            }
        } else {
            res.json({ success: false, message: "User data is missing" });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error backend" });
    }
};

// verifyOrder remains the same

const verifyOrder = async (req, res) => {
    const { orderId, success } = req.body;
    try {
        if (success == "true") {
            await orderModel.findByIdAndUpdate(orderId, { payment: true });
            res.json({ success: true, menubar: "Paid" });
        } else {
            await orderModel.findByIdAndDelete(orderId, { payment: false });
            res.json({ success: false, message: "Unable to process payment" });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

// userOrders remains the same

const userOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({ userId: req.body.userId });
        res.json({ success: true, data: orders });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

// listOrders remains the same

const listOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({});
        res.json({ success: "true", data: orders });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

// updateStatus remains the same

const updateStatus = async (req, res) => {
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId, { status: req.body.status });
        res.json({ success: true, message: "status updated" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

export { placeOrder, verifyOrder, userOrders, listOrders, updateStatus };
