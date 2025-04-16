import jwt from 'jsonwebtoken';
import userModel from '../model/userSchema.js';

const auth = async (req, res, next) => {
    try {
       
        const token = req.cookies['authtoken']; 
        
        if (!token) {
            return res.status(401).send('Access denied. No token provided.');
        }
        const decoded = jwt.verify(token, process.env.secret); 
        console.log(decoded.id) 
        const user = await userModel.findById(decoded.id); 
        
        console.log("user",user);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).send("Invalid Token");
    }
}


export default auth;