import StudentSchema from '../models/student.js';

export const getAllStudents = async () => {
	try {
		const students = await StudentSchema.findAll();
		return students;
	} catch (error) {
		throw new Error('Unable to fetch students');
	}
};

export const createStudent = async (studentData) => {
	try {
		delete studentData.id;
		const student = await StudentSchema.create(studentData);
		return student;
	} catch (error) {
		throw new Error('Unable to create student');
	}
};

export const editStudent = async (studentData) => {
	try {
		const student = await StudentSchema.findByPk(studentData.id);
		if (!student) {
			throw new Error('Student not found');
		}
		delete studentData.id;

		for (const studentDataKey in studentData) {
			if(!Object.hasOwn(studentData, studentDataKey)) continue;
			student[studentDataKey] = studentData[studentDataKey];
		}

		await student.save();
		return student;
	} catch (error) {
		console.log(error)
		throw new Error('Unable to edit student');
	}
};

export const deleteStudentById = async (id) => {
	try {
		const student = await StudentSchema.findByPk(id);
		if (!student) {
			throw new Error('Student not found');
		}
		await student.destroy();
		return true;
	} catch (error) {
		throw new Error('Unable to delete student');
	}
};
