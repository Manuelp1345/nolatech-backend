import { Router } from "express";
import {
  getDepartmentReportController,
  getEmployeeReportController,
} from "../../controllers/report";

const reportRouter = Router();

/**
 * @swagger
 * tags:
 *   name: Reportes
 *   description: Endpoints para la generación de reportes
 */

/**
 * @swagger
 * /report/employee/{id}:
 *   get:
 *     tags: [Reportes]
 *     summary: Generar reporte de evaluación para un empleado
 *     description: Genera un reporte detallado de evaluaciones y respuestas para un empleado específico.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del empleado
 *     responses:
 *       200:
 *         description: Reporte de evaluación generado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 employee:
 *                   $ref: '#/components/schemas/Employer'
 *                 evaluations:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Evaluation'
 *                 answers:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Answer'
 *       404:
 *         description: Empleado no encontrado
 *       500:
 *         description: Error al generar el reporte
 */

/**
 * @swagger
 * /report/department/{id}:
 *   get:
 *     tags: [Reportes]
 *     summary: Generar reporte de evaluación por departamento
 *     description: Genera un reporte detallado de evaluaciones para un departamento específico.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del departamento
 *     responses:
 *       200:
 *         description: Reporte de departamento generado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 department:
 *                   $ref: '#/components/schemas/Department'
 *                 evaluations:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Evaluation'
 *       404:
 *         description: Departamento no encontrado
 *       500:
 *         description: Error al generar el reporte
 */

reportRouter.get("/employee/:id", getEmployeeReportController);
reportRouter.get("/department/:id", getDepartmentReportController);

/**
 * @swagger
 * components:
 *   schemas:
 *     Employer:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: ID del empleador
 *         firstName:
 *           type: string
 *           description: Nombre del empleador
 *         lastName:
 *           type: string
 *           description: Apellido del empleador
 *         email:
 *           type: string
 *           description: Email del empleador
 *         phone:
 *           type: string
 *           description: Teléfono del empleador
 *         position:
 *           type: string
 *           description: Posición del empleador
 *         department:
 *           $ref: '#/components/schemas/Department'
 *         hireDate:
 *           type: string
 *           format: date
 *           description: Fecha de contratación
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *
 *     Evaluation:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: ID de la evaluación
 *         period:
 *           type: string
 *           description: Periodo de la evaluación
 *         status:
 *           type: string
 *           enum: [pending, completed, in progress]
 *           description: Estado de la evaluación
 *         department:
 *           $ref: '#/components/schemas/Department'
 *         type:
 *           type: string
 *           description: Tipo de evaluación
 *         employer:
 *           $ref: '#/components/schemas/Employer'
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *
 *     Answer:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: ID de la respuesta
 *         answerText:
 *           type: string
 *           description: Texto de la respuesta
 *         rating:
 *           type: number
 *           description: Puntuación de la respuesta
 *         question:
 *           type: string
 *           description: ID de la pregunta asociada
 *         evaluator:
 *           $ref: '#/components/schemas/Employer'
 *         evaluatedEmployee:
 *           $ref: '#/components/schemas/Employer'
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *
 *     Department:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: ID del departamento
 *         name:
 *           type: string
 *           description: Nombre del departamento
 *         description:
 *           type: string
 *           description: Descripción del departamento
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

export default reportRouter;
