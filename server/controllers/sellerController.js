import jwt from "jsonwebtoken";

//login Seller : /api/seller/login

export const sellerLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (password === process.env.SELLER_PASSWORD && email === process.env.SELLER_EMAIL) {
            const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '7d' });

            res.cookie('sellerToken', token, {
                httpOnly: true, //Prevent Javascript to access cookie
                secure: true, //Always use secure cookie for HTTPS
                sameSite: 'none', //Allow cross-site cookies
                maxAge: 7 * 24 * 60 * 60 * 1000, //Cookie expiration time
                domain: undefined //Let the browser set the domain automatically
            });

            return res.json({ success: true, message: "Logged In" });

        } else {
            return res.json({ success: false, message: "Invalid Credentials" });

        }
    } catch (error) {

        console.log(error.message);
        res.json({ success: false, message: error.message })
    }
}

//Seller isAuth: /api/seller/is-auth

export const isSellerAuth = async (req, res) => {
    try {

        return res.json({ success: true})

    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

// Seller logout : /api/seller/logout

export const sellerLogout = async (req, res) => {
    try {
        res.clearCookie('sellerToken', {
            httpOnly: true, //Prevent Javascript to access cookie
            secure: true, //Always use secure cookie for HTTPS
            sameSite: 'none', //Allow cross-site cookies
            domain: undefined //Let the browser set the domain automatically
        });
        return res.json({ success: true, message: "Logged Out" })
    } catch (error) {
        res.json({ success: false, message: error.message })

    }
}
