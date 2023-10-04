import express from "express";
import { startChat, sendMessage } from "../models/controllers/chat.js";

const router = express.Router();

router.post("/start", startChat);
router.post("/chatId/send", sendMessage);

export default router;
