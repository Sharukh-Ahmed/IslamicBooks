import jwt from "jsonwebtoken";
//middleware will be executed before execution of the controllers

const authUser = async (req, res, next) => {//next will execute the controller function
    const { token } = req.cookies;

    if (!token) {
        return res.json({ success: false, message: "Not Authorized" });
    }

    try {
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET)
        if (tokenDecode.id) {

            req.body = req.body || {};
            req.body.userId = tokenDecode.id;
            return next();

        } else {

            return res.json({ success: false, message: "Not Authorized" });

        }

    } catch (error) {

        res.json({ success: false, message: error.message })
    }
}

export default authUser;