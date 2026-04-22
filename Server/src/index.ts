import 'dotenv/config';
import express, { type Request, type Response } from "express"
import { clerkMiddleware } from '@clerk/express';
import cors from 'cors'
import getProjectRouter from "./routes/getProject.js";
import addprojectRouter from "./routes/addProject.js";
import connectCloudinary from './configs/cloudinary.js';

await connectCloudinary();
const app = express()
const port = 3000

app.use(cors())
app.use(express.json());
app.use(clerkMiddleware());


app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})

//Routes
app.use("/getApi", getProjectRouter);
app.use("/addApi", addprojectRouter)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
