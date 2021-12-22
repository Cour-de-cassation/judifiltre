import "./config.ts";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { buildApi } from "./api";

const app = express();

app.use(cors());

app.use(bodyParser.json());

buildApi(app);

app.listen(8080);
