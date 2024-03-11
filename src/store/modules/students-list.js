import axios from "axios";

// initial state
const state = {
	StudentsList: [],
	editStudentId: null
};

// getters are functions.
const getters = {};

// actions are functions that cause side effects and can involve
// asynchronous operations.
const actions = {
	createStudentsList({commit}) {

		axios.get('http://localhost:80/students').then(res => {
			commit('setStudentsList', res.data);
		})
	},
	editMode({commit}, studentId) {
		commit('setEditStudentId', studentId);
	},

	addStudent({commit}, student) {
		axios.post(`http://localhost:80/students`, student).then(res => {
			if (res.data.error) {
				alert(res.data.error);
				return;
			}
			commit('addStudent', res.data);
		})
	},

	editStudent({commit}, data) {
		axios.put(`http://localhost:80/students`, data.student).then(res => {
			if (res.data.error) {
				alert(res.data.error);
				return;
			}
			commit('editStudent', {
				student: res.data,
				index: data.index
			});
		})
	},
	deleteStudent({commit}, studentId) {
		axios.delete(`http://localhost:80/students/${studentId}`).then(res => {
			if (res.data.error) {
				alert(res.data.error);
				return;
			}
			commit('deleteStudent', studentId);
		})
	},
};
// mutations are operations that actually mutate the state.
// each mutation handler gets the entire state tree as the
// first argument, followed by additional payload arguments.
// mutations must be synchronous and can be recorded by plugins
// for debugging purposes.
const mutations = {
	setStudentsList(state, data) {
		state.StudentsList = data;
	},
	setEditStudentId(state, studentId) {
		state.editStudentId = studentId;
	},
	addStudent(state, student) {
		state.StudentsList.push(student);
		state.editStudentId = null;
	},
	editStudent(state, data) {
		if (state.StudentsList[data.index]?.id === data.student.id) {
			state.StudentsList[data.index] = data.student;
		} else {
			for (let i = 0; i <= state.StudentsList.length - 1; i++) {
				if (state.StudentsList[i].id === data.student.id) {
					state.StudentsList[i] = data.student;
					break;
				}
			}
		}
		state.editStudentId = null;
	},
	deleteStudent(state, studentId) {
		state.StudentsList = state.StudentsList.filter(student => student.id !== studentId);
		state.editStudentId = null;
	},
};

// A Vuex instance is created by combining the state, mutations, actions,
// and getters.
export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
}