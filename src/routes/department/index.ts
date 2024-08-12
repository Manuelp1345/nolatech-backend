// routes/departmentRoutes.js
import express from "express";
import {
  createDepartmentController,
  deleteDepartmentController,
  getAllDepartmentsController,
  getDepartmentByIdController,
  updateDepartmentController,
} from "../../controllers/department";
import { auth, authorize } from "../../middlewares/auth";

const departmentRouter = express.Router();

const roleAuthorized = ["admin", "manager"];

/**
 * @swagger
 * /departments:
 *   post:
 *     tags: [Departments]
 *     summary: Crea un nuevo departamento
 *     description: Crea un nuevo departamento en el sistema.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Department'
 *     responses:
 *       201:
 *         description: Departamento creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Department'
 *
 *   get:
 *     tags: [Departments]
 *     summary: Obtiene todos los departamentos
 *     description: Recupera una lista de todos los departamentos.
 *     responses:
 *       200:
 *         description: Lista de departamentos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Department'
 *
 * /departments/{id}:
 *   get:
 *     tags: [Departments]
 *     summary: Obtiene un departamento por ID
 *     description: Recupera los detalles de un departamento específico por su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del departamento
 *     responses:
 *       200:
 *         description: Detalles del departamento
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Department'
 *       404:
 *         description: Departamento no encontrado
 *
 *   put:
 *     tags: [Departments]
 *     summary: Actualiza un departamento
 *     description: Actualiza los detalles de un departamento existente.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del departamento
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Department'
 *     responses:
 *       200:
 *         description: Departamento actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Department'
 *       404:
 *         description: Departamento no encontrado
 *
 *   delete:
 *     tags: [Departments]
 *     summary: Elimina un departamento
 *     description: Elimina un departamento por su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del departamento
 *     responses:
 *       204:
 *         description: Departamento eliminado exitosamente
 *       404:
 *         description: Departamento no encontrado
 */

departmentRouter.post(
  "/",
  auth,

  authorize(roleAuthorized),
  createDepartmentController
);
departmentRouter.get(
  "/",
  auth,

  authorize(roleAuthorized),
  getAllDepartmentsController
);
departmentRouter.get(
  "/:id",
  auth,

  authorize(roleAuthorized),
  getDepartmentByIdController
);
departmentRouter.put(
  "/:id",
  auth,

  authorize(roleAuthorized),
  updateDepartmentController
);
departmentRouter.delete(
  "/:id",
  auth,

  authorize(roleAuthorized),
  deleteDepartmentController
);

/**
 * @swagger
 * components:
 *   schemas:
 *     Department:
 *       type: object
 *       required:
 *         - name
 *         - description
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
 *           description: Fecha de creación del departamento
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Fecha de la última actualización del departamento
 */

export default departmentRouter;
