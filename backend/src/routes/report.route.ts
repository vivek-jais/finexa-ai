import {Router} from "express";
import { generateReportController, getAllReportController, updateReportSettingController } from "../controllers/report.controller";

const reportRoutes = Router();

reportRoutes.get("/all",getAllReportController);
reportRoutes.put("/update-setting",updateReportSettingController);
reportRoutes.get("/generate",generateReportController);

export default reportRoutes;



