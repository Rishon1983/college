<template>
	<div v-if="!isEditMode" class="student-info-component">
		<div class="first-name" :title="data.student.firstName">{{ data.student.firstName }}</div>
		<div class="last-name" :title="data.student.lastName">{{ data.student.lastName }}</div>
		<div class="phone" :title="data.student.phone">{{ data.student.phone }}</div>
		<div class="mail" :title="data.student.mail">{{ data.student.mail }}</div>
		<div class="buttons-container">
			<font-awesome-icon @click="edit" class="icon" :icon="['fas','fa-edit']"
							   title="edit student info"></font-awesome-icon>
			<font-awesome-icon @click="deleteStudent(data.student.id)" class="icon" :icon="['fas','fa-trash']"
							   title="delete student"></font-awesome-icon>
		</div>
	</div>
	<div v-else class="student-info-component edit">
		<input class="first-name" v-model="editStudentData.firstName">
		<input class="last-name" v-model="editStudentData.lastName">
		<input class="phone" v-model="editStudentData.phone">
		<input class="mail" v-model="editStudentData.mail">
		<div class="buttons-container">
			<font-awesome-icon @click="editStudentLocal" class="icon" :icon="['fas','fa-check']"
							   title="Apply"></font-awesome-icon>
			<font-awesome-icon @click="cancelEdit" class="icon" :icon="['fas','fa-times']"
							   title="Cancel"></font-awesome-icon>
		</div>
	</div>
</template>

<script>
// import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";

import {mapState, mapActions} from "vuex";

export default {
	name: "StudentInfo",
	// components: {FontAwesomeIcon},
	props: ['data'],
	data() {
		return {
			isEditMode: false,
			editStudentData: {
				id: this.data.student.id,
				firstName: this.data.student.firstName,
				lastName: this.data.student.lastName,
				phone: this.data.student.phone,
				mail: this.data.student.mail,
			}
		}
	},
	created() {
		this.initEditModeData();
	},
	computed: {
		...mapState({
			editStudentId: state => state.students.editStudentId
		})
	},
	methods: {
		...mapActions('students', [
			'editMode',
			'deleteStudent',
			'editStudent'
		]),
		initEditModeData() {
			this.editStudentData = {
				id: this.data.student.id,
				firstName: this.data.student.firstName,
				lastName: this.data.student.lastName,
				phone: this.data.student.phone,
				mail: this.data.student.mail
			}
		},
		edit() {
			this.editMode(this.data.student.id);
		},
		editStudentLocal() {
			if (!this.isValidStudentData()) {
				alert('Please, check student information');
				return;
			}
			this.editStudent({
				student: this.editStudentData,
				index: this.data.index
			});
		},
		cancelEdit() {
			this.editMode(null);
		},
		isValidStudentData() {
			return this.firstName !== '' &&
				this.lastName !== '' &&
				this.phone !== '' &&
				this.mail !== '';
		}
	},
	watch: {
		editStudentId() {
			this.isEditMode = this.editStudentId === this.data.student.id;
			this.initEditModeData();
		}
	}
}
</script>

<style lang="scss" scoped>
.student-info-component {
	width: 100%;
	height: 50px;
	display: flex;
	align-items: center;
	box-sizing: border-box;

	div {
		margin: 0 10px;
	}

	input {
		height: 28px;
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

	.first-name, .last-name, .phone, .mail {
		white-space: nowrap;
		max-width: 100%;
		overflow: hidden;
		text-overflow: ellipsis;
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
		display: flex;
		margin: 0;
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

	&.edit {
		background-color: #e0e0e0;

		.icon {
			color: #7d7d7d;
		}
	}
}
</style>