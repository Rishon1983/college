<template>
	<div class="students-list-component">
		<h1>List of students</h1>
		<div class="add-students-container">
			<div @click="isNewStudentFormShow = !isNewStudentFormShow" class="add-new-student-button">
				<font-awesome-icon class="icon" :icon="['fas','fa-plus']"></font-awesome-icon>
				<h5>Add new student</h5>
			</div>
			<Transition name="bounce">
				<div v-if="isNewStudentFormShow" class="add-new-student-form-container">
					<div class="student-info-component">
						<input class="first-name" v-model="newStudent.firstName">
						<input class="last-name" v-model="newStudent.lastName">
						<input class="phone" v-model="newStudent.phone">
						<input class="mail" v-model="newStudent.mail">
						<font-awesome-icon @click="addStudentData" class="icon" :icon="['fas','fa-check']"
										   title="Apply new student"></font-awesome-icon>
						<font-awesome-icon @click="clearInputs" class="icon" :icon="['fas','fa-times']"
										   title="Clear inputs"></font-awesome-icon>
					</div>
				</div>
			</Transition>
		</div>
		<div v-if="StudentsList.length>0" class="students-container">
			<div class="student-headers">
				<div class="first-name">firstName</div>
				<div class="last-name">lastName</div>
				<div class="phone">phone</div>
				<div class="mail">mail</div>
				<div class="buttons-container"></div>
			</div>
			<div class="students-list">
				<div v-for="(student, index) in StudentsList" :key="student.id" class="one-student">
					<StudentInfo :data="{student, index}"/>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import {mapState, mapActions} from 'vuex';
import StudentInfo from "./StudentInfo.vue";

export default {
	name: "StudentsList",
	components: {StudentInfo},
	data() {
		return {
			editStudentId: null,
			newStudent: {
				firstName: '',
				lastName: '',
				phone: '',
				mail: ''
			},
			isNewStudentFormShow: false
		}
	},
	computed: {
		...mapState({
			StudentsList: state => state.students.StudentsList
		})
	},
	created() {
		this.$store.dispatch("students/createStudentsList");
	},
	methods: {
		...mapActions('students', [
			'addStudent'
		]),
		clearInputs() {
			this.newStudent = {
				firstName: '',
				lastName: '',
				phone: '',
				mail: ''
			}
		},
		isValid() {
			return this.newStudent.firstName !== '' && this.newStudent.lastName !== '' && this.newStudent.phone !== '' && this.newStudent.mail !== '';

		},
		addStudentData() {
			/*
			* need add validations
			* */
			if (!this.isValid()) {
				alert(`Please, check student's info`);
				return;
			}
			this.addStudent(this.newStudent);
			this.clearInputs();
		}
	}
}
</script>

<style lang="scss" scoped>
.students-list-component {
	.add-students-container {
		margin: 5px 0;

		.add-new-student-button {
			display: flex;
			align-items: center;

			h5 {
				margin: 0;
				padding: 0;
			}

			&:hover {
				cursor: pointer;

				.icon {
					color: green;
				}
			}
		}

		.add-new-student-form-container {
			.student-info-component {
				width: 100%;
				height: 50px;
				display: flex;
				align-items: center;
				box-sizing: border-box;

				input {
					height: 34px;
					font-size: 17px;
					margin: 0 10px;

					&.first-name, &.last-name {
						width: calc(20% - 20px);
					}

					&.phone {
						width: 110px;
					}

					&.mail {
						width: calc(60% - 230px);
					}
				}

				.icon {
					height: 20px;
					width: 20px;
					padding: 10px;
					color: #a4a4a4;

					&:hover {
						color: black;
						cursor: pointer;
					}

					&.fa-check {
						&:hover {
							color: green;
						}
					}

					&.fa-xmark {
						&:hover {
							color: red;
						}
					}
				}
			}
		}

		.bounce-enter-active {
			animation: bounce-in 0.5s;
		}

		.bounce-leave-active {
			animation: bounce-in 0.5s reverse;
		}

		@keyframes bounce-in {
			0% {
				transform: scale(0);
			}
			50% {
				transform: scale(1.25);
			}
			100% {
				transform: scale(1);
			}
		}
	}

	.students-container {
		.student-headers {
			width: 100%;
			height: 30px;
			display: flex;
			align-items: center;
			box-sizing: border-box;
			border-bottom: 1px solid;
			font-weight: bold;

			div {
				margin: 0 10px;
			}

			.first-name, .last-name {
				width: 20%;
			}

			.phone {
				width: 130px;
			}

			.mail {
				width: calc(60% - 210px);
			}

			.buttons-container {
				width: 80px;
			}
		}

		.students-list {
			max-height: calc(100vh - 300px);
			overflow: auto;
		}

		.one-student {
			&:nth-child(odd) {
				background-color: #f8f9fa;
			}
		}
	}

}
</style>