import { getAuth } from "@clerk/express";
import type { Request, Response } from "express";



export function getProjectHistory(req: Request, res: Response){
   const { userId } = getAuth(req);

   if(!userId) {
     return res.json({ success: false, message: "User unauthorised login first." });
   }

   
}