import express from "express";
import { generateQuestion, getModels } from "../controllers/ollamacontrollers.js";
const routerOllama = express.Router();

routerOllama.post("/generate", generateQuestion);
routerOllama.get("/models", getModels);

export default routerOllama;
