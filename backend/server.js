import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import urlRoutes from "./routes/urlRoutes.js";
dotenv.config({ path: "./.env" });

const app=express();
connectDB();
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/',urlRoutes);





const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));