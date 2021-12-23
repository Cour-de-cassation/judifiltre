import "./config.ts";
import express from "express";
import cors from "cors";
import { buildApi } from "./api";

const app = express();

app.use(cors());

app.use(express.json());

buildApi(app);

app.listen(8080);
