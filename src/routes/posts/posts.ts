import express, { NextFunction, Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";

import "dotenv/config";
import { asyncErrorHandler } from "../../utils/asyncErrorHandler";
import { Posts } from "../../models/Posts";
import { Authors } from "../../models/Authors";
import { Tags } from "../../models/Tags";
import { Categories } from "../../models/Categories";

export const postsRouter = express.Router();

postsRouter.get(
  "/",
  asyncErrorHandler(async (req: Request, res: Response) => {
    const posts = await Posts.findAll({
      include: [
        { model: Authors, as: "created_by_author" },
        { model: Tags, as: "post_tags_id" },
        { model: Categories, as: "created_category" },
      ],
    });
    return res.json({ posts: posts.map((data) => data.details) });
  })
);

postsRouter.post(
  "/",
  asyncErrorHandler(async (req: Request, res: Response) => {
    const post = new Posts({
      id: uuidv4(),
      title: req.body.title,
      text: req.body.text,
      categories_id: req.body.categoriesId || "",
      author_id: req.body.authorId || "",
    });

    await post.save();

    return res.json(post.details);
  })
);

postsRouter.put(
  "/:id",
  asyncErrorHandler(async (req: Request, res: Response) => {
    await Posts.update(
      {
        title: req.body.title,
        text: req.body.text,
        categories_id: req.body.categoriesId || "",
        author_id: req.body.authorId || "",
      },
      { where: { id: req.params.id } }
    );
    const post = await Posts.findOne({
      where: { id: req.params.id },
    });

    return res.json({ post: post?.details });
  })
);

postsRouter.delete(
  "/:id",
  asyncErrorHandler(async (req: Request, res: Response) => {
    await Posts.destroy({ where: { id: req.params.id } });

    return res.json({ result: "ok" });
  })
);
