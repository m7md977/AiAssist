import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import openaiRoutes from "./routes/openaiRoutes.js";
import ChatGPTRountes from "./routes/ChatGPTRoutes.js";
import ChatHistoryRoutes from "./routes/ChatHistoryRoutes.js";
import Chat from "./routes/Chat.js";

dotenv.config();

const app = express();
const port = 3080;

app.use(bodyParser.json());
app.use(cors());

app.use("/api", openaiRoutes);
app.use("/chat", ChatGPTRountes);
app.use("/chat-history", ChatHistoryRoutes);
app.use("/api/chat", Chat);

app.listen(port, () => console.log(`Listening on port ${port}`));
