import express from "express";
import userRouter from "./user.router.js"

const mainRouter = express.Router();
mainRouter.use(userRouter);

mainRouter.get("/", (req, res) => {
    res.send("welcome!");
});

export default mainRouter;