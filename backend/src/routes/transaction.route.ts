import { Router } from "express";
import { bulkDeleteTransactionController, bulkTransactionController, createTransactionController, deleteTransactionController, duplicatedTransactionController, getAllTransactionController, getTransactionByIdController, scanReceiptController, updateTransactionController } from "../controllers/transaction.controller";
import { upload } from "../config/cloudinary.config";

const transactionRoutes = Router();
transactionRoutes.post(
    "/scan-receipt",
    upload.single("receipt"),
    scanReceiptController
)
transactionRoutes.post("/create",createTransactionController);
transactionRoutes.get("/all",getAllTransactionController);
transactionRoutes.get("/:id",getTransactionByIdController);

transactionRoutes.put("/duplicate/:id",duplicatedTransactionController);
transactionRoutes.put("/update/:id",updateTransactionController);
transactionRoutes.delete("/delete/:id",deleteTransactionController);
transactionRoutes.delete("/bulk-delete",bulkDeleteTransactionController);
transactionRoutes.post("/bulk-transaction",bulkTransactionController)

export default transactionRoutes;