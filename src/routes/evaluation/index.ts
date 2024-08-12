import { Router } from "express";
import {
  createEvaluationController,
  getEvaluationByIdController,
  listEvaluationsController,
  submitEvaluationController,
  updateEvaluationController,
} from "../../controllers/evaluation";

const evaluationRouter = Router();
/**
 * @swagger
 * /evaluations:
 *   post:
 *     tags: [Evaluaciones]
 *     summary: Crea una nueva evaluación
 *     description: Crea una nueva evaluación para un empleado.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Evaluation'
 *     responses:
 *       201:
 *         description: Evaluación creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Evaluation'
 *
 *   get:
 *     tags: [Evaluaciones]
 *     summary: Obtiene todas las evaluaciones
 *     description: Recupera una lista de todas las evaluaciones.
 *     responses:
 *       200:
 *         description: Lista de evaluaciones
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Evaluation'
 *
 * /evaluations/{id}:
 *   get:
 *     tags: [Evaluaciones]
 *     summary: Obtiene una evaluación por ID
 *     description: Recupera los detalles de una evaluación específica.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la evaluación
 *     responses:
 *       200:
 *         description: Detalles de la evaluación
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Evaluation'
 *       404:
 *         description: Evaluación no encontrada
 *
 *   put:
 *     tags: [Evaluaciones]
 *     summary: Actualiza una evaluación
 *     description: Actualiza los detalles de una evaluación existente.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la evaluación
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Evaluation'
 *     responses:
 *       200:
 *         description: Evaluación actualizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Evaluation'
 *       404:
 *         description: Evaluación no encontrada
 *
 * /evaluations/{id}/submit:
 *   post:
 *     tags: [Evaluaciones]
 *     summary: Envía una evaluación completada
 *     description: Marca una evaluación como completada.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la evaluación
 *     responses:
 *       200:
 *         description: Evaluación enviada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Evaluation'
 *       404:
 *         description: Evaluación no encontrada
 */

evaluationRouter.post("/", createEvaluationController);
evaluationRouter.get("/", listEvaluationsController);
evaluationRouter.get("/:id", getEvaluationByIdController);
evaluationRouter.put("/:id", updateEvaluationController);
evaluationRouter.post("/:id/submit", submitEvaluationController);

/**
 * @swagger
 * components:
 *   schemas:
 *     Evaluation:
 *       type: object
 *       required:
 *         - period
 *         - status
 *         - type
 *         - employer
 *         - department
 *       properties:
 *         id:
 *           type: string
 *           description: ID de la evaluación
 *         period:
 *           type: string
 *           description: Periodo de la evaluación
 *         status:
 *           type: string
 *           enum:
 *             - pending
 *             - completed
 *             - in progress
 *           description: Estado de la evaluación
 *         department:
 *           type: string
 *           description: ID del departamento asociado a la evaluación
 *         type:
 *           type: string
 *           description: Tipo de evaluación
 *         employer:
 *           type: string
 *           description: ID del empleador asociado a la evaluación
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Fecha de creación de la evaluación
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Fecha de la última actualización de la evaluación
 */

export default evaluationRouter;
