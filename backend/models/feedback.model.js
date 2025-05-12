import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import Profile from "./profile.model.js";

const Feedback = sequelize.define("Feedback", {
  feedbackId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  easeOfUse: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  helpfulFeature: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  recommend: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  comment: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  suggestion: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
});

// One-to-one association
Profile.hasOne(Feedback, {
  foreignKey: "profileId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
Feedback.belongsTo(Profile, {
  foreignKey: "profileId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

export default Feedback;
