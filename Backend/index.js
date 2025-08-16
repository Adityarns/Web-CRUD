import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();

// koneksi database
mongoose.connect("mongodb://localhost:27017/WEB-CRUD_db");

const db = mongoose.connection;
db.on("error", (error) => console.log(error));
db.once("open", () => console.log("Database connected.."));

// middleware
app.use(cors());
app.use(express.json());

// jalankan server
app.listen(5000, () => console.log("Server up and running"));
