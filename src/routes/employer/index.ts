import { Router } from "express";

import { auth, authorize } from "../../middlewares/auth";
import {
  employerByIdController,
  employerController,
  employerCreateController,
  employerUpdateController,
} from "../../controllers/employer";

const employerRouter = Router();

const roleAuthorized = ["admin", "manager"];

/**
 * @swagger
 * /employee:
 *   get:
 *     tags: [Empleado]
 *     summary: Obtiene todos los empleado
 *     description: Recupera una lista de todos los empleado.
 *     responses:
 *       200:
 *         description: Lista de empleado
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Employer'
 */
employerRouter.get("/", auth, authorize(roleAuthorized), employerController);

/**
 * @swagger
 * /employee/{id}:
 *   get:
 *     tags: [Empleado]
 *     summary: Obtiene un empleador por ID
 *     description: Recupera los detalles de un empleador específico por su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del empleador
 *     responses:
 *       200:
 *         description: Datos del empleador
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Employer'
 *       404:
 *         description: Empleador no encontrado
 */
employerRouter.get(
  "/:id",
  auth,
  authorize(roleAuthorized),
  employerByIdController
);

/**
 * @swagger
 * /employee:
 *   post:
 *     tags: [Empleado]
 *     summary: Crea un nuevo empleador
 *     description: Agrega un nuevo empleador a la base de datos.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Employer'
 *     responses:
 *       201:
 *         description: Empleador creado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Employer'
 *       400:
 *         description: Error en la solicitud
 */
employerRouter.post(
  "/",
  auth,
  authorize(roleAuthorized),
  employerCreateController
);

/**
 * @swagger
 * /employee/{id}:
 *   put:
 *     tags: [Empleado]
 *     summary: Actualiza un empleador existente
 *     description: Modifica los detalles de un empleador existente.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del empleador
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Employer'
 *     responses:
 *       200:
 *         description: Empleador actualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Employer'
 *       400:
 *         description: Error en la solicitud
 *       404:
 *         description: Empleador no encontrado
 */
employerRouter.put(
  "/:id",
  auth,
  authorize(roleAuthorized),
  employerUpdateController
);

/**
 * @swagger
 * components:
 *   schemas:
 *     Employer:
 *       type: object
 *       required:
 *         - firstName
 *         - lastName
 *         - email
 *         - phone
 *         - position
 *         - department
 *         - hireDate
 *         - supervisor
 *         - user
 *       properties:
 *         id:
 *           type: string
 *           description: ID del empleado
 *         firstName:
 *           type: string
 *           description: Nombre del empleado
 *         lastName:
 *           type: string
 *           description: Apellido del empleado
 *         email:
 *           type: string
 *           description: Email del empleado
 *         phone:
 *           type: string
 *           description: Teléfono del empleado
 *         position:
 *           type: string
 *           description: Posición del empleado
 *         department:
 *           type: string
 *           description: Departamento del empleado
 *         hireDate:
 *           type: string
 *           format: date
 *           description: Fecha de contratación del empleado
 *         supervisor:
 *           type: string
 *           description: Supervisor del empleado
 *         user:
 *           type: string
 *           description: Usuario asociado al empleado
 *       example:
 *         id: '66b2d25673407c51d0b853ba'
 *         firstName: 'John'
 *         lastName: 'Doe'
 *         email: 'john.doe@example.com'
 *         phone: '555-1234'
 *         position: 'Software Engineer'
 *         department: 'Engineering'
 *         hireDate: '2023-01-01'
 *         supervisor: '66b2d25673407c51d0b853ba'
 *         user: '66b2d25673407c51d0b853ba'
 */

export default employerRouter;
