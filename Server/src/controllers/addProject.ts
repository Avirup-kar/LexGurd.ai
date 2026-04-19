import { getAuth } from "@clerk/express";
import type { Request, Response } from "express";



export async function addproject(req: Request, res: Response) {
    try {
      const { userId } = getAuth(req);
      


    }catch (error: any) {
      return res.status(500).json({
        success: false,
        message: error.message || "Internal server error"
      });
    }  
}