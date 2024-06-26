import express, { NextFunction, Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";

import "dotenv/config";
import { asyncErrorHandler } from "../../utils/asyncErrorHandler";
import { Authors } from "../../models/Authors";

export const authorsRouter = express.Router();

authorsRouter.get(
  "/",
  asyncErrorHandler(async (req: Request, res: Response) => {
    const authors = await Authors.findAll();
    return res.json({ authors: authors.map((data) => data.details) });
  })
);

authorsRouter.post(
  "/",
  asyncErrorHandler(async (req: Request, res: Response) => {
    const author = new Authors({
      id: uuidv4(),
      name: req.body.name,
    });

    await author.save();

    return res.json(author.details);
  })
);

authorsRouter.put(
  "/:id",
  asyncErrorHandler(async (req: Request, res: Response) => {
    await Authors.update(
      {
        name: req.body.name,
      },
      { where: { id: req.params.id } }
    );
    const author = await Authors.findOne({
      where: { id: req.params.id },
    });

    return res.json({ author: author?.details });
  })
);

authorsRouter.delete(
  "/:id",
  asyncErrorHandler(async (req: Request, res: Response) => {
    await Authors.destroy({ where: { id: req.params.id } });

    return res.json({ result: "ok" });
  })
);
