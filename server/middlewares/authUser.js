import jwt from "jsonwebtoken";
//middleware will be executed before execution of the controllers

const authUser = async (req, res, next) => {//next will execute the controller function
    const { token } = req.cookies;

    console.log('Auth middleware - token present:', !!token);

    if (!token) {
        return res.json({ success: false, message: "Not Authorized" });
    }

    try {
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET)
        console.log('Auth middleware - token decoded:', tokenDecode);
        
        if (tokenDecode.id) {

            // Set user object in req for consistency
            req.user = { _id: tokenDecode.id };
            
            // Also set userId in body for backward compatibility
            req.body = req.body || {};
            req.body.userId = tokenDecode.id;
            
            console.log('Auth middleware - user set:', req.user);
            
            return next();

        } else {

            return res.json({ success: false, message: "Not Authorized" });

        }

    } catch (error) {
        console.error('Auth middleware - error:', error.message);
        res.json({ success: false, message: error.message })
    }
}

export default authUser;