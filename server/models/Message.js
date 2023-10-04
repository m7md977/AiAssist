import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Chat from "./Chat.js";

const Message = sequelize.define("Message", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM("user", "ai"),
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

Message.belongsTo(Chat);
Chat.hasMany(Message);

export default Message;
