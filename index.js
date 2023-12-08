import "dotenv/config";
import cors from "cors";
import "./database/connectdb.js";
import express from "express";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.route.js";
import videogameRouter from "./routes/videogame.route.js";

const app = express();

app.use(cors());

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/videogames", videogameRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("http://localhost:" + PORT));
