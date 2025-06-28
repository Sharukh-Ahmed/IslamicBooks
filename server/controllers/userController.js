import User from "../models/User.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'


//Register User
export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.json({ success: false, message: 'Missing Details' })
        }

        const existingUser = await User.findOne({ email })

        if (existingUser) {
            return res.json({ success: false, message: 'User Already Exists' })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await User.create({ name, email, password: hashedPassword })

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.cookie('token', token, {
            httpOnly: true, //Prevent Javascript to access cookie
            secure: true, //Always use secure cookie for HTTPS
            sameSite: 'none', //Allow cross-site cookies
            maxAge: 7 * 24 * 60 * 60 * 1000, //Cookie expiration time
            domain: undefined //Let the browser set the domain automatically
        })

        return res.json({ success: true, user: { email: user.email, name: user.name } })

    } catch (error) {
        console.log(error.message);

        res.json({ success: false, message: error.message })
    }
}
//Login User : /api/user/login

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.json({ success: false, message: 'Email and Password are required' })
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: 'Invalid Email or Password' })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res.json({ success: false, message: 'Invalid Email or Password' })
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.cookie('token', token, {
            httpOnly: true, //Prevent Javascript to access cookie
            secure: true, //Always use secure cookie for HTTPS
            sameSite: 'none', //Allow cross-site cookies
            maxAge: 7 * 24 * 60 * 60 * 1000, //Cookie expiration time
            domain: undefined //Let the browser set the domain automatically
        })

        return res.json({ success: true, user: { email: user.email, name: user.name }, message: `Hi ${user.name}` })


    } catch (error) {

        console.log(error.message);
        res.json({ success: false, message: error.message })
    }
}

// Check Auth : /api/user/is-auth

export const isAuth = async (req, res) => {
    try {
        const { userId } = req.body;
        const user = await User.findById(userId).select("-password")
        return res.json({ success: true, user })

    } catch (error) {
        res.json({ success: false, message: error.message })

    }
}

// Test authentication endpoint
export const testAuth = async (req, res) => {
    try {
        // Get userId from either req.user._id or req.body.userId for compatibility
        const userId = req.user?._id || req.body?.userId;
        
        console.log('Test auth - req.user:', req.user);
        console.log('Test auth - req.body.userId:', req.body?.userId);
        console.log('Test auth - final userId:', userId);
        
        if (!userId) {
            return res.json({ success: false, message: "User ID not found" });
        }
        
        const user = await User.findById(userId).select("-password")
        return res.json({ success: true, user, message: "Authentication working" })

    } catch (error) {
        console.error('Test auth error:', error);
        res.json({ success: false, message: error.message })
    }
}

// Debug endpoint to check cookies
export const debugCookies = async (req, res) => {
    try {
        console.log('All cookies:', req.cookies);
        console.log('Token cookie:', req.cookies.token);
        console.log('Headers:', req.headers);
        
        return res.json({ 
            success: true, 
            cookies: req.cookies,
            hasToken: !!req.cookies.token,
            headers: {
                origin: req.headers.origin,
                referer: req.headers.referer,
                'user-agent': req.headers['user-agent']
            }
        });
    } catch (error) {
        console.error('Debug error:', error);
        res.json({ success: false, message: error.message });
    }
}

//Logout User: /api/user/logout
export const logout = async (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true, //Prevent Javascript to access cookie
            secure: true, //Always use secure cookie for HTTPS
            sameSite: 'none', //Allow cross-site cookies
            domain: undefined //Let the browser set the domain automatically
        });
        return res.json({ success: true, message: "Logged Out" })
    } catch (error) {
        console.log(error.message);
        
        res.json({ success: false, message: error.message })

    }
}
