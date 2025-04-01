import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";


const JWT_PASSWORD = "123123"; // Hardcoded for now
interface authRequest extends Request{
    userId: string;
}
export const userMiddleware = (req: authRequest, res: Response, next: NextFunction) => {
    try {
        const header = req.headers["authorization"];
        console.log(header);
        
        // Check if the authorization header exists
        if (!header || !header.startsWith("Bearer ")) {
            return res.status(403).json({ message: "You are not logged in" });
        }

        // Extract the token part
        const token = header.split(" ")[1];

        // Verify the token
        const decoded = jwt.verify(token, JWT_PASSWORD) as JwtPayload;

        // Ensure the decoded payload has an 'id'
        if (!decoded.id) {
            return res.status(403).json({ message: "Invalid token" });
        }

        req.userId = decoded.id; // Attach userId to the request
        next(); // Proceed to the next middleware
    } catch (error) {
        console.error("JWT verification failed:", error);
        return res.status(403).json({ message: "Invalid or expired token" });
    }
};
