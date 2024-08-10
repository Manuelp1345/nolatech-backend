import { Router } from "express";
import AuthRouter from "./auth";
import employerRouter from "./employer";

const router = Router();

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:            # arbitrary name for the security scheme
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT    # optional, arbitrary value for documentation purposes
 * ...
 */

/**
 * @swagger
 * tags:
 *   - name: Auth
 *     description: Authentication
 */

router.use("/auth", AuthRouter);
router.use("/employer", employerRouter);

export default router;
