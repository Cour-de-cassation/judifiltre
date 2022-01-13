import 'dotenv/config';
import express from "express";
import cors from "cors";
import { buildApi } from "./api";

const app = express();

app.use(cors());

app.use(express.json());

buildApi(app);

app.listen(process.env.API_PORT ? Number(process.env.API_PORT) : 8080);
