// routes/questionRoutes.ts

import { Router } from "express";
import {
  createQuestionController,
  getAllQuestionsController,
  updateQuestionController,
} from "../../controllers/question";

const questionRouter = Router();
/**
 * @swagger
 * /questions:
 *   post:
 *     tags: [Preguntas]
 *     summary: Crea una nueva pregunta
 *     description: Crea una nueva pregunta para una evaluación específica.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Question'
 *     responses:
 *       201:
 *         description: Pregunta creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Question'
 *
 *   get:
 *     tags: [Preguntas]
 *     summary: Obtiene todas las preguntas
 *     description: Recupera una lista de todas las preguntas.
 *     responses:
 *       200:
 *         description: Lista de preguntas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Question'
 *
 * /questions/{id}:
 *   put:
 *     tags: [Preguntas]
 *     summary: Actualiza una pregunta
 *     description: Actualiza los detalles de una pregunta existente.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la pregunta
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Question'
 *     responses:
 *       200:
 *         description: Pregunta actualizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Question'
 *       404:
 *         description: Pregunta no encontrada
 */

questionRouter.post("/", createQuestionController);

questionRouter.get("/", getAllQuestionsController);

questionRouter.put("/:id", updateQuestionController);

/**
 * @swagger
 * components:
 *   schemas:
 *     Question:
 *       type: object
 *       required:
 *         - text
 *         - evaluation
 *       properties:
 *         id:
 *           type: string
 *           description: ID de la pregunta
 *         text:
 *           type: string
 *           description: Texto de la pregunta
 *         evaluation:
 *           type: string
 *           description: ID de la evaluación asociada
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Fecha de creación de la pregunta
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Fecha de la última actualización de la pregunta
 */

export default questionRouter;
