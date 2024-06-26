import { DataTypes, Model, Sequelize } from "sequelize";
import { sequelize } from "../conect/database.js";


export interface IAuthors {
  id: string;
  name: string;
}

export interface AuthorsDetails {
  id: string;
  name: string;
}

export class Authors extends Model implements IAuthors {
  public id!: string;
  public name!: string;

  public get details(): AuthorsDetails {
    return {
      id: this.id,
      name: this.name,
    };
  }
}

Authors.init(
  {
    id: {
      type: DataTypes.CHAR(36),
      primaryKey: true,
      allowNull: false,
    },
    name: {
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
    modelName: "Authors",
    tableName: "authors",
    charset: "utf8",
    collate: "utf8_unicode_ci",
    timestamps: true,
    underscored: true,
    paranoid: true,
  }
);
