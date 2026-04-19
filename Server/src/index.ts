import express, { type Request, type Response } from "express"
import { clerkMiddleware, requireAuth } from '@clerk/express';
import cors from 'cors'
import addprojectRouter from "./routes/getProject.js";

const app = express()
const port = 3000

app.use(cors())
app.use(express.json());
app.use(clerkMiddleware());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})
app.use(requireAuth());

//Routes
app.use("/getApi", addprojectRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
