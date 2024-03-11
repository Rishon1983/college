import express from 'express';
import * as studentController from '../controllers/studentController.js';
const router = express.Router();

router.post('/students', studentController.createStudent);

router.put('/students', studentController.editStudent);

router.get('/students', studentController.getAllStudents);

router.delete('/students/:id', studentController.deleteStudent);
export default router;
