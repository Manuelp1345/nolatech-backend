import express, { Request, Response } from "express";
import swaggerUi from "swagger-ui-express";
import { logRequestDetails } from "./middlewares/logger";
import { PORT } from "./utils/constants";
import swaggerSpec from "./utils/swagger";
import { connectionDB } from "./config/db";
import router from "./routes";
import { errorHandler, notFoundHandler } from "./middlewares/errorHandlers";
import { rateLimiter } from "./middlewares/rateLimit";

const app = express();
const port = PORT;

app.get("/", (req: Request, res: Response) => {
  res.send("hello world!");
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(logRequestDetails);
app.use(rateLimiter);
app.use(router);
app.use(notFoundHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
  connectionDB().then(() => {
    console.log("Conexión a la base de datos exitosa");
  });
});
