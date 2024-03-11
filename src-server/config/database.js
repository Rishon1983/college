import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('college', 'root', '', {
	host: 'localhost',
	dialect: 'mysql',
	port: 3306
});

export default sequelize;