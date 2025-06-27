import Address from "../models/Address.js"


//Add Address : /api/address/add
export const addAddress = async (req, res) => {
    try {
        // Get userId from either req.user._id or req.body.userId for compatibility
        const userId = req.user?._id || req.body?.userId;
        const { address } = req.body;
        
        if (!userId) {
            return res.json({ success: false, message: "User ID not found" });
        }
        
        await Address.create({ ...address, userId })
        res.json({ success: true, message: "Address Added Successfully" })

    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })

    }
}

//Get Address : /api/address/get
export const getAddress = async (req, res) => {
    try {
        // Get userId from either req.user._id or req.body.userId for compatibility
        const userId = req.user?._id || req.body?.userId;
        
        if (!userId) {
            return res.json({ success: false, message: "User ID not found" });
        }
        
        const addresses = await Address.find({ userId })
        res.json({ success: true, addresses })

    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })

    }
}