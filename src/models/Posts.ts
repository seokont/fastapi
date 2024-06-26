import { DataTypes, Model, Sequelize } from "sequelize";
import { sequelize } from "../conect/database.js";
import { Authors, AuthorsDetails } from "./Authors.js";
import { Categories, CategoriesDetails } from "./Categories.js";
import { Tags, TagsDetails } from "./Tags.js";

export interface IPosts {
  id: string;
  title: string;
  text: string;
  categories_id: string;
  author_id: string;
}

export interface PostsDetails {
  id: string;
  title: string;
  text: string;
  categoriesId: string;
  authorId: string;

  readonly createdByAuthor: AuthorsDetails | undefined;
  readonly createdCategory: CategoriesDetails | undefined;
  readonly tags: TagsDetails[] | undefined;
}

export class Posts extends Model implements IPosts {
  public id!: string;
  public title!: string;
  public text!: string;
  public categories_id!: string;
  public author_id!: string;

  public readonly created_by_author!: Authors | null;
  public readonly created_category!: Categories | null;
  public readonly post_tags_id!: Tags[] | undefined;

  public get details(): PostsDetails {
    return {
      id: this.id,
      title: this.title,
      text: this.text,
      categoriesId: this.categories_id,
      authorId: this.author_id,

       createdByAuthor:this.created_by_author?.details,
       createdCategory: this.created_category?.details,
       tags: this.post_tags_id?.map(data=>data.details),
    };
  }
}

Posts.init(
  {
    id: {
      type: DataTypes.CHAR(36),
      primaryKey: true,
      allowNull: false,
    },
    categories_id: {
      type: DataTypes.CHAR(36),
      primaryKey: true,
      allowNull: false,
    },
    author_id: {
      type: DataTypes.CHAR(36),
      primaryKey: true,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      defaultValue: "",
      allowNull: false,
    },
    text: {
      type: DataTypes.STRING,
      defaultValue: "",
      allowNull: false,
    },

    created_at: {
      type: "TIMESTAMP",
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      allowNull: false,
    },
    updated_at: {
      type: "TIMESTAMP",
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      allowNull: false,
    },
    deleted_at: {
      type: "TIMESTAMP",
      defaultValue: null,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Posts",
    tableName: "posts",
    charset: "utf8",
    collate: "utf8_unicode_ci",
    timestamps: true,
    underscored: true,
    paranoid: true,
  }
);
