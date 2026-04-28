import 'dotenv/config';
import express, { type Request, type Response } from "express"
import { clerkMiddleware } from '@clerk/express';
import cors from 'cors'
import getProjectRouter from "./routes/getProject.js";
import addprojectRouter from "./routes/addProject.js";
import connectCloudinary from './configs/cloudinary.js';
import getTranslatedtext from './routes/translate.js';
import getExpert from './routes/searchExperts.js';

const app = express()
const port = 3000

app.use(cors())
app.use(express.json());
app.use(clerkMiddleware());

app.use((req, res, next) => {
  console.log("📨 REQUEST:", req.method, req.path);
  next();
});

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})

app.use("/getApi", getProjectRouter);
app.use("/addApi", addprojectRouter);
app.use('/api', getTranslatedtext);
app.use("/api", getExpert);

// ✅ Move everything inside an async function
const start = async () => {
  try {
    await connectCloudinary();

    app.listen(port, () => {
      console.log(`🚀 Example app listening on port ${port}`);
    });

  } catch (err) {
    console.error("❌ Failed to start server:", err);
    process.exit(1); // force crash so you SEE the error
  }
};

start();