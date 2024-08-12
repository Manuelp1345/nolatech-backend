import { Router } from "express";
import AuthRouter from "./auth";
import employerRouter from "./employer";
import evaluationRouter from "./evaluation";
import questionRouter from "./question";
import answerRouter from "./answer";
import departmentRouter from "./department";
import reportRouter from "./report";

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
router.use("/employee", employerRouter);
router.use("/evaluations", evaluationRouter);
router.use("/questions", questionRouter);
router.use("/answers", answerRouter);
router.use("/departments", departmentRouter);
router.use("/reports", reportRouter);

export default router;
