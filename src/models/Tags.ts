import { DataTypes, Model, Sequelize } from "sequelize";
import { sequelize } from "../conect/database.js";


export interface ITags {
  id: string;
  tag: string;
  post_id: string;
}

export interface TagsDetails {
  id: string;
  tag: string;
  postId: string;
}

export class Tags extends Model implements ITags {
  public id!: string;
  public tag!: string;
  public post_id!: string;

  public get details(): TagsDetails {
    return {
      id: this.id,
      tag: this.tag,
      postId: this.post_id,
    };
  }
}

Tags.init(
  {
    id: {
      type: DataTypes.CHAR(36),
      primaryKey: true,
      allowNull: false,
    },
    post_id: {
      type: DataTypes.CHAR(36),
      allowNull: false,
    },
    tag: {
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
    modelName: "Tags",
    tableName: "tags",
    charset: "utf8",
    collate: "utf8_unicode_ci",
    timestamps: true,
    underscored: true,
    paranoid: true,
  }
);
