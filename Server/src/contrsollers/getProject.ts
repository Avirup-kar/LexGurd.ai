import { getAuth } from "@clerk/express";
import type { Request, Response } from "express";
import prisma from "../lib/prisma.js";



export async function getProjectHistory(req: Request, res: Response){
    try {
        const { userId } = getAuth(req);

         if(!userId) {
           return res.json({ success: false, message: "User unauthorised login first." });
         }

         const project = await prisma.project.findMany({
            where: { userId },
            orderBy: {
              createdAt: "desc" // 🔥 latest first
            },
            select: {
              id: true,
              contractData: true
            }
         });

         res.status(200).json({ success: true,  project });
    } catch (error: any) {
         return res.status(500).json({
           success: false,
           message: error.message || "Internal server error"
         });
    }   
}

export async function getProject(req: Request, res: Response) {
  try {
      
  } catch (error: any) {
      return res.status(500).json({
         success: false,
         message: error.message || "Internal server error"
      });
  }
}