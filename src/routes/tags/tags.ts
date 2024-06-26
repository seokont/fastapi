import express, { NextFunction, Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";

import "dotenv/config";
import { asyncErrorHandler } from "../../utils/asyncErrorHandler";
import { Posts } from "../../models/Posts";
import { Authors } from "../../models/Authors";
import { Tags } from "../../models/Tags";

export const tagsRouter = express.Router();

tagsRouter.get(
  "/",
  asyncErrorHandler(async (req: Request, res: Response) => {
    const tags = await Tags.findAll({});
    return res.json({ tags: tags.map((data) => data.details) });
  })
);

tagsRouter.post(
  "/",
  asyncErrorHandler(async (req: Request, res: Response) => {
    const tag = new Tags({
      id: uuidv4(),
      tag: req.body.tag,
      post_id: req.body.postId || "",
    });

    await tag.save();

    return res.json(tag.details);
  })
);

tagsRouter.put(
  "/:id",
  asyncErrorHandler(async (req: Request, res: Response) => {
    await Tags.update(
      {
        tag: req.body.tag,
        post_id: req.body.postId || "",
      },
      { where: { id: req.params.id } }
    );
    const tag = await Tags.findOne({
      where: { id: req.params.id },
    });

    return res.json({ tag: tag?.details });
  })
);

tagsRouter.delete(
  "/:id",
  asyncErrorHandler(async (req: Request, res: Response) => {
    await Tags.destroy({ where: { id: req.params.id } });

    return res.json({ result: "ok" });
  })
);
