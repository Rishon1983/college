import {DataTypes, Model, Sequelize} from 'sequelize';
import sequelize from '../config/database.js';

const StudentSchema = sequelize.define('Student', {
	// student_id: {
	// 	type: DataTypes.INTEGER,
	// 	allowNull: false,
	// 	primaryKey: true,
	// 	autoIncrement: true,
	// },
	id: {
		type: DataTypes.INTEGER,
		allowNull: false,
		primaryKey: true,
		autoIncrement: true,
	},
	firstName: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	lastName: {
		type: DataTypes.STRING,
		allowNull: false
	},
	phone: {
		type: DataTypes.STRING,
		allowNull: false
	},
	mail: {
		type: DataTypes.STRING,
		allowNull: false
	},
}, {
	timestamps: false
});

export default StudentSchema;