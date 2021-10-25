const { Model, DataTypes } = require("sequelize");
import sequelize from "./index";

class Link extends Model {}
Link.init(
  {
    url: {
      type: DataTypes.STRING,
      unique: true,
    },
    shortUrl: {
      type: DataTypes.STRING,
      unique: true,
    },
  },
  { sequelize, modelName: "link" }
);

module.exports = Link;
