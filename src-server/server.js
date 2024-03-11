import express from 'express';
// import bodyParser from 'body-parser';
import sequelize from './config/database.js';
import studentRoutes from './routes/studentRoute.js';
// import courseRoutes from './routes/courseRoute';
// import gradeRoutes from './routes/gradeRoute';
// import StudentsRepository from "./services/students-repository.js";
// import ApiV1Controller from "./controllers/api-v1-controller.js";

const app = express();
const PORT = process.env.PORT || 80;

app.use((req, res, next) => {

	// Website you wish to allow to connect
	res.setHeader('Access-Control-Allow-Origin', '*');

	// Request methods you wish to allow
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');

	// Request headers you wish to allow
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

	// Set to true if you need the website to include cookies in the requests sent
	// to the API (e.g. in case you use sessions)
	res.setHeader('Access-Control-Allow-Credentials', true);

	// Pass to next layer of middleware
	next();
});

app.use(express.json());
app.use(studentRoutes);
// app.use('/api', courseRoutes);x
// app.use('/api', gradeRoutes);



sequelize.sync().then(() => {
	console.log('Database synced');
	app.listen(PORT, () => {
		console.log(`Server is running on port ${PORT}`);
	});
}).catch(error => {
	console.error('Unable to sync database:', error);
});


/*const services = {
	studentsRepository: new StudentsRepository(),

	/!*studentsRepository: new StudentsRepository({
		host: 'localhost',
		user: 'root',
		password: '',
		charset: 'utf8_general_ci',
		database: 'test'
	}),*!/
	//usersRepository: new UsersRepository
};

const apiController = new ApiV1Controller(app, services);
apiController.registerRoutes();*/


// app.listen(80, () => {
// 	console.log('Main Server started ');
// });

