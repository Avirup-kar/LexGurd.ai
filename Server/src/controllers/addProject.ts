import { getAuth } from "@clerk/express";
import type { Request, Response } from "express";
import { v2 as cloudinary } from 'cloudinary'
import prisma from "../lib/prisma.js";
import { analyzeContractImage } from "../lib/analyzeContract.js";
import { Prisma } from "../generated/prisma/client.js";



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
            contractData: Prisma.JsonNull,    
            email: Prisma.JsonNull
          }
        })

        res.json({ message: "success", projectId: createProject.id });

        //conver image to base64 for gemini access
        const base64ForGemini = image.buffer.toString("base64");
        const mimeType = image.mimetype;
        
        //get data from the gemini
        const contractData = await analyzeContractImage(base64ForGemini, mimeType);

        const project = await prisma.project.update({
          where: {id: createProject.id},
          data : {
            contractData: JSON.parse(JSON.stringify(contractData)),
          }
        })

    }catch (error: any) {
      return res.status(500).json({
        success: false,
        message: error.message || "Internal server error"
      });
    }  
}