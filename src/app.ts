import express, { NextFunction, Request, Response } from "express";
import helmet from "helmet";
import http from "http";
import createHttpError from "http-errors";

import { initModelsRelations } from "./models";
import { authorsRouter } from "./routes/authors/authors";
import { categoriesRouter } from "./routes/categories/categories";
import { tagsRouter } from "./routes/tags/tags";
import { postsRouter } from "./routes/posts/posts";

import swaggerUi from 'swagger-ui-express'
import swaggerDocument  from './path/swagger.json'

initModelsRelations()

const app = express();

const server = http.createServer(app);
app.use(helmet());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.options("*", (req, res) => {
  return res.sendStatus(200);
});

app.get("/", (req, res) => res.sendStatus(200));

app.use("/authors", authorsRouter);
app.use("/categories", categoriesRouter);
app.use("/tags", tagsRouter);
app.use("/post", postsRouter);

app.use((req: Request, res: Response, next: NextFunction) => {
  return res.status(404).send("Not found");
  //   next(createHttpError(404, "Not found"));
});

app.use(
  (
    err: createHttpError.HttpError,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
      message: err.message,
    });
  }
);

app.listen(3000);
