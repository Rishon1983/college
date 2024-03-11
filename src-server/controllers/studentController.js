import * as studentService from '../services/studentService.js';
import StudentModel from "../models/students-model.js";

export const createStudent = async (req, res) => {
	try {
		const studentData = req.body;
		const model = new StudentModel(req);
		const student = await studentService.createStudent(model.toData(studentData));
		res.json(student);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

export const editStudent = async (req, res) => {
	try {
		const studentData = req.body;
		const model = new StudentModel(req);
		const student = await studentService.editStudent(model.toData(studentData));
		res.json(student);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};



export const getAllStudents = async (req, res) => {
	try {
		const students = await studentService.getAllStudents();
		res.json(students);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

export const deleteStudent = async (req, res) => {
	try {
		const { id } = req.params;
		await studentService.deleteStudentById(id);
		res.json({ message: 'Student deleted successfully' });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};
