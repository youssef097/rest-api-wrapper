import express from "express";
import dotenv from "dotenv";
import { getCustomerSummary } from "./controllers/customerController";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3221;

app.get("/api/customers/:customer_id/summary", getCustomerSummary as any);

app.listen(PORT, () => {
  console.log(`API Wrapper running on port ${PORT}`);
});
