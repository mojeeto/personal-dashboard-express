import { Router } from "express";
import authRouter from "./authRouter";
import authorizedRoutes from "./authorizedRoutes";

const router = Router();

router.use(authRouter);
router.use(authorizedRoutes);

export default router;
