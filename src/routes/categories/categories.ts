import express, { NextFunction, Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import "dotenv/config";
import { asyncErrorHandler } from "../../utils/asyncErrorHandler";
import { Authors } from "../../models/Authors";
import { Categories } from "../../models/Categories";

export const categoriesRouter = express.Router();

categoriesRouter.get(
  "/",
  asyncErrorHandler(async (req: Request, res: Response) => {
    const categories = await Categories.findAll({
      include: [{ model: Authors, as: "created_by_author" }],
    });
    return res.json({ categories: categories.map((data) => data.details) });
  })
);

categoriesRouter.post(
  "/",
  asyncErrorHandler(async (req: Request, res: Response) => {
    const categories = new Categories({
      id: uuidv4(),
      title: req.body.title,
    });

    await categories.save();

    return res.json(categories.details);
  })
);

categoriesRouter.put(
  "/:id",
  asyncErrorHandler(async (req: Request, res: Response) => {
    await Categories.update(
      {
        title: req.body.title,
      },
      { where: { id: req.params.id } }
    );
    const categories = await Categories.findOne({
      where: { id: req.params.id },
    });

    return res.json({ categories: categories?.details });
  })
);

categoriesRouter.delete(
  "/:id",
  asyncErrorHandler(async (req: Request, res: Response) => {
    await Categories.destroy({ where: { id: req.params.id } });

    return res.json({ result: "ok" });
  })
);
