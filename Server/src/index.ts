import express, { type Request, type Response } from "express"
import { clerkMiddleware, requireAuth } from '@clerk/express';
import cors from 'cors'
import getProjectRouter from "./routes/getProject.js";
import addprojectRouter from "./routes/addProject.js";

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
app.use("/getApi", getProjectRouter);
app.use("/addApi", addprojectRouter)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
