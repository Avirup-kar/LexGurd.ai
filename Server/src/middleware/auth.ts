import { clerkClient, getAuth } from "@clerk/express";
import { type NextFunction, type Request, type Response } from "express"

export const auth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId } = getAuth(req);

        if(!userId) {
          return res.json({ success: false, message: "User unauthorised login first." });
        }

        const user = await clerkClient.users.getUser(userId);
    
        if (!user) {
          return res.json({ success: false, message: "User not found." });
        }

        req.userId = userId

        next();
    } catch (error: any) {
        return res.status(500).json({
          success: false,
          message: error.message || "Unknown error",
        });
    }
}