import { DataTypes, Model, Sequelize } from "sequelize";
import { sequelize } from "../conect/database.js";


export interface ICategories {
  id: string;
  title: string;
}

export interface CategoriesDetails {
  id: string;
  title: string;
}

export class Categories extends Model implements ICategories {
  public id!: string;
  public title!: string;

  public get details(): CategoriesDetails {
    return {
      id: this.id,
      title: this.title,
    };
  }
}

Categories.init(
  {
    id: {
      type: DataTypes.CHAR(36),
      primaryKey: true,
      allowNull: false,
    },
    title: {
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
    modelName: "Categories",
    tableName: "categories",
    charset: "utf8",
    collate: "utf8_unicode_ci",
    timestamps: true,
    underscored: true,
    paranoid: true,
  }
);
