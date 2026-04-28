import type { Request, Response } from "express";
import { searchExperts } from "../lib/searchExperts.js";
import { getAuth } from "@clerk/express";
import prisma from "../lib/prisma.js";

export async function searchExpertsController(req: Request, res: Response) {
  try {
    const { userId } = getAuth(req);
    const { projectId } = req.body;

    if (!userId) {
      return res.json({ success: false, message: "unauthorised login first." });
    }

    const contractData = await prisma.project.findFirst({
        where: {
          id: projectId as string,
          userId: userId as string
        },
        select: {
          contractData: true, 
        }
      })

    const experts = await searchExperts(contractData);
  } catch (err) {
    console.error("searchExperts controller error:", err);
    return Response.json({ experts: [] });
  }
}
