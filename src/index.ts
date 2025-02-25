import "dotenv/config";
import express from "express";
import http from "http";
import routes from "./routes";

// import bot from './bot';

// // Launch bot
// bot.launch();
// console.log('Bot is running...');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", routes());

const port = parseInt(process.env.PORT ?? "8000");

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

process.on("unhandledRejection", (err) => {
  console.log(err, "Unhandled rejection, server terminatting...");
  server.close(() => process.exit(1));
});
