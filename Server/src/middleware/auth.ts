import { clerkClient, getAuth } from "@clerk/express";
import { type NextFunction, type Request, type Response } from "express"

export const auth = async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log("auth header:", req.headers.authorization);
        const { userId } = getAuth(req);
        console.log("userId:", userId);

        if(!userId) {
          return res.json({ success: false, message: "User unauthorised login first." });
        }

        const user = await clerkClient.users.getUser(userId);
    
        if (!user) {
          return res.json({ success: false, message: "User not found." });
        }

        next();
    } catch (error: any) {
        return res.status(500).json({
          success: false,
          message: error.message || "Unknown error",
        });
    }
}