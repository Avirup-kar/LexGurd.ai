import { getAuth } from "@clerk/express";
import type { Request, Response } from "express";
import { v2 as cloudinary } from 'cloudinary'
import prisma from "../lib/prisma.js";
import { analyzeContractImage } from "../lib/analyzeContract.js";



export async function addproject(req: Request, res: Response) {
  try {
    const { userId } = getAuth(req);
    const image = req.file;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User unauthorised login first.",
      });
    }

    if (!image) {
      return res.status(400).json({
        success: false,
        message: "Image is required",
      });
    }

    const base64Image = `data:${image.mimetype};base64,${image.buffer.toString("base64")}`;
    const imageUrl = await cloudinary.uploader.upload(base64Image);

    const createProject = await prisma.project.create({
      data: {
        userId,
        imageUrl: imageUrl.secure_url,
      },
    });

    // 🔥 Gemini processing
    const base64ForGemini = image.buffer.toString("base64");
    const mimeType = image.mimetype;

    const contractData = await analyzeContractImage(base64ForGemini, mimeType);

    await prisma.project.update({
      where: { id: createProject.id },
      data: {
        contractData: JSON.parse(JSON.stringify(contractData)),
      },
    });

    // ✅ ONLY ONE RESPONSE
    return res.json({
      success: true,
      projectId: createProject.id,
    });

  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
}