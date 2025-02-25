import express from "express";

const router = express.Router();

export default (): express.Router => {
  router.get("/health", (_, res) => {
    res.sendStatus(200);
    return;
  });
  router.get("/");

  return router;
};
