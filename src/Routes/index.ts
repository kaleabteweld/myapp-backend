import express from "express";
import { xlsxRouter } from "../Domains/xlsx";

const appRouter = express.Router();
appRouter.use("/xlsx", xlsxRouter);


export default appRouter;