import { getAuth } from "@clerk/express";
import type { Request, Response } from "express";
import prisma from "../lib/prisma.js";



export async function getProjectHistory(req: Request, res: Response){
   const { userId } = getAuth(req);

   if(!userId) {
     return res.json({ success: false, message: "User unauthorised login first." });
   }

   const project = await prisma.project.findMany()
}