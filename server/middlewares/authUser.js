import jwt from "jsonwebtoken";
//middleware will be executed before execution of the controllers

const authUser = async (req, res, next) => {//next will execute the controller function
    console.log('Auth middleware - All cookies:', req.cookies);
    console.log('Auth middleware - Token cookie:', req.cookies.token);
    
    const { token } = req.cookies;

    if (!token) {
        console.log('Auth middleware - No token found');
        return res.json({ success: false, message: "Not Authorized" });
    }

    try {
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET)
        console.log('Auth middleware - Token decoded:', tokenDecode);
        
        if (tokenDecode.id) {
            req.body = req.body || {};
            req.body.userId = tokenDecode.id;
            console.log('Auth middleware - User ID set:', tokenDecode.id);
            return next();
        } else {
            console.log('Auth middleware - No user ID in token');
            return res.json({ success: false, message: "Not Authorized" });
        }

    } catch (error) {
        console.log('Auth middleware - Token verification error:', error.message);
        res.json({ success: false, message: error.message })
    }
}

export default authUser;