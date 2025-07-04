import express from "express";
import startDB from "./config/db.js";
import userRoutes from "./routes/user.route.js";
import registerRoutes from "./routes/register.route.js";
import loginRoutes from "./routes/login.route.js";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

const app = express();

const PORT = process.env.PORT;

app.use(cors());

app.use(express.json());

app.use((req, res, next) => {
  console.log(`Request to ${req.path}`);
  console.log("Body:", req.body);
  next();
});


app.use("/", userRoutes);
app.use("/register", registerRoutes);
app.use("/account/login", loginRoutes);

startDB().then(()=>{
    app.listen(PORT,()=>{
        console.log("Servidor activo.");
    });
});