import { Authors } from "./Authors";
import { Categories } from "./Categories";
import { Posts } from "./Posts";
import { Tags } from "./Tags";

export const initModelsRelations = (): void => {
  Authors.hasMany(Posts, {
    foreignKey: "author_id",
    as: "author_post_id",
    sourceKey: "id",
  });
  Categories.hasMany(Posts, {
    foreignKey: "categories_id",
    as: "categories_post_id",
    sourceKey: "id",
  });
  Posts.hasMany(Tags, {
    foreignKey: "post_id",
    as: "post_tags_id",
    sourceKey: "id",
  });

  Posts.hasOne(Authors, { foreignKey: 'id', as: 'created_by_author', sourceKey: 'author_id' });
  Posts.hasOne(Categories, { foreignKey: 'id', as: 'created_category', sourceKey: 'categories_id' });
};
