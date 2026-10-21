import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import towRoutes from "./routes/towRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import connectDB from "./config/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: "BiG23 backend is running",
    });
});

app.use("/api/admin", adminRoutes);
app.use("/api/tow", towRoutes);

connectDB();

app.listen(PORT, () => {
    console.log(`BiG23 server running on port ${PORT}`);
});