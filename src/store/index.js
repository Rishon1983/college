import { createStore } from 'vuex'
import StudentsList from "./modules/students-list.js";
import CoursesList from "./modules/courses-list.js";

const store = createStore({ /* options */ })

store.registerModule('students', StudentsList)
store.registerModule('courses', CoursesList)

export default store