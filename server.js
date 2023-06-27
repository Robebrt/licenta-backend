import express from "express";
import cors from "cors";
import fs from "fs";
import forge from "node-forge";

import filmeRouter from "./controllers/filmeController.js";
import serialeRouter from "./controllers/serialeController.js";
import utilizatoriRouter from "./controllers/utilizatoriController.js";
import vizionariRouter from "./controllers/vizionariController.js";
import episoadeRouter from "./controllers/episoadeController.js";
import comentariiRouter from "./controllers/comentariiControler.js";
import apriecieriRouter from "./controllers/aprecieriControler.js";

const app = express();
const PORT = process.env.PORT | 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use("/api", filmeRouter);

app.use("/api", serialeRouter);

app.use("/api", utilizatoriRouter);

app.use("/api", vizionariRouter);

app.use("/api", episoadeRouter);

app.use("/api", comentariiRouter);

app.use("/api", apriecieriRouter);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
