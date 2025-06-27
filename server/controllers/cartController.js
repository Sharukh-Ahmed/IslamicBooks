import User from "../models/User.js"

//Update User cart Data : /api/cart/update

export const updateCart = async (req, res) => {
    try {
        // Get userId from either req.user._id or req.body.userId for compatibility
        const userId = req.user?._id || req.body?.userId;
        const { cartItems } = req.body;
        
        if (!userId) {
            return res.json({ success: false, message: "User ID not found" });
        }
        
        await User.findByIdAndUpdate(userId, { cartItems })
        res.json({ success: true, message: "Cart Updated" })

    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })
    }
}