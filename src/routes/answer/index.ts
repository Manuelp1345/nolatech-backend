import { Router } from "express";
import {
  createAnswerController,
  getAllAnswersController,
  getAnswerByIdController,
  updateAnswerController,
} from "../../controllers/answer";

const answerRouter = Router();

answerRouter.post("/", createAnswerController);
answerRouter.get("/", getAllAnswersController);
answerRouter.get("/:id", getAnswerByIdController);
answerRouter.put("/:id", updateAnswerController);

/**
 * @swagger
 * /answers:
 *   post:
 *     tags: [Respuestas]
 *     summary: Crea una nueva respuesta
 *     description: Crea una nueva respuesta a una pregunta de evaluación.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Answer'
 *     responses:
 *       201:
 *         description: Respuesta creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Answer'
 *
 *   get:
 *     tags: [Respuestas]
 *     summary: Obtiene todas las respuestas
 *     description: Recupera una lista de todas las respuestas.
 *     responses:
 *       200:
 *         description: Lista de respuestas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Answer'
 *
 * /answers/{id}:
 *   get:
 *     tags: [Respuestas]
 *     summary: Obtiene una respuesta específica
 *     description: Recupera una respuesta específica por su ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Respuesta encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Answer'
 *
 *   put:
 *     tags: [Respuestas]
 *     summary: Actualiza una respuesta
 *     description: Actualiza los detalles de una respuesta específica.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Answer'
 *     responses:
 *       200:
 *         description: Respuesta actualizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Answer'
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Answer:
 *       type: object
 *       required:
 *         - text
 *         - question
 *         - evaluator
 *         - employee
 *       properties:
 *         id:
 *           type: string
 *           description: ID de la respuesta
 *         text:
 *           type: string
 *           description: Texto de la respuesta
 *         rating:
 *           type: number
 *           description: Calificación dada en la respuesta
 *         question:
 *           type: string
 *           description: ID de la pregunta a la que se responde
 *         evaluator:
 *           type: string
 *           description: ID del evaluador
 *         employee:
 *           type: string
 *           description: ID del empleado evaluado
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Fecha y hora en que se creó la respuesta
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Fecha y hora en que se actualizó la respuesta
 *       example:
 *         id: '605c72ef8e4b7e30f8e5b7e0'
 *         text: 'El rendimiento del empleado ha sido excelente.'
 *         rating: 5
 *         question: '605c72ef8e4b7e30f8e5b7e1'
 *         evaluator: '605c72ef8e4b7e30f8e5b7e2'
 *         employee: '605c72ef8e4b7e30f8e5b7e3'
 *         createdAt: '2024-08-11T12:34:56Z'
 *         updatedAt: '2024-08-11T12:34:56Z'
 */

export default answerRouter;
