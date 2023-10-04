import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Chat = sequelize.define("Chat", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
});

export default Chat;
