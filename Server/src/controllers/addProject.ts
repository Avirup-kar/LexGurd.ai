import { getAuth } from "@clerk/express";
import type { Request, Response } from "express";
import { v2 as cloudinary } from 'cloudinary'
import prisma from "../lib/prisma.js";



export async function addproject(req: Request, res: Response) {
    try {
      const { userId } = getAuth(req);
      const image = req.file;

      if(!userId) {
           return res.json({ success: false, message: "User unauthorised login first." });
      }

      if(!image) {
        return res.status(400).json({
          success: false,
          message: "Image is required"
        });
      }

        // Process the image and save it to your database or storage
        // For example, you can convert the image buffer to a base64 string
        const base64Image = `data:${image.mimetype};base64,${image.buffer.toString("base64")}`;

        const imageUrl = await cloudinary.uploader.upload(base64Image);

        const createProject = await prisma.project.create({
          data: {
            userId: userId as string,
            imageUrl: imageUrl.secure_url as string,
          }
        })

        

    }catch (error: any) {
      return res.status(500).json({
        success: false,
        message: error.message || "Internal server error"
      });
    }  
}