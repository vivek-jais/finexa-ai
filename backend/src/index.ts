import "dotenv/config";
import "./config/passport.config"
import passport, { initialize } from "passport";
import express, { NextFunction, Request, Response } from "express";
import { Env } from "./config/env.config";
import cors from "cors";
import { HTTPSTATUS } from "./config/http.config";
import { errorHandler } from "./middlewares/errorHandler";
import { BadRequestException } from "./utils/app-error";
import { asyncHandler } from "./middlewares/asyncHandler.middleware";
import connectDatabase from "./config/database.config";
import authRoutes from "./routes/auth.route";
import userRoutes from "./routes/user.route";
import { passportAuthenticateJwt } from "./config/passport.config";
import transactionRoutes from "./routes/transaction.route";
import { initializeCorns } from "./cron";
import reportRoutes from "./routes/report.route";
import { calculateNextReportDate } from "./utils/helper";


const app = express();

const BASE_PATH = Env.BASE_PATH;

app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize())

app.use(
  cors({
    origin: Env.FRONTEND_ORIGIN,
    credentials: true,
  })
);
app.get(
  "/",
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    throw new BadRequestException("This is a test error");
    res.status(HTTPSTATUS.OK).json({
      message: "Hello I am vivek",
    });
  })
);

calculateNextReportDate();


app.use(`/auth`, authRoutes);
app.use('/user' ,passportAuthenticateJwt, userRoutes);
app.use('/transaction',passportAuthenticateJwt,transactionRoutes);
app.use('/report',passportAuthenticateJwt,reportRoutes);

app.use(errorHandler);

app.listen(Env.PORT, async () => {
  await connectDatabase();
  if(Env.NODE_ENV === "development"){
    await initializeCorns();
  }
  console.log(`Server is running on port ${Env.PORT}`);
});
