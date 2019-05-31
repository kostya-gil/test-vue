<template>
	<div class="add-item">
		<h3 class="add-item__title">Введите имя элемента</h3>
		<form @submit.prevent="createItem" class="add-form">
			<input
				:class="{ error: errors.length }"
				class="add-form__input"
				type="text"
				placeholder="Название элемента"
				v-model="title"
			/>
			<input
				class="add-form__input add-form__input_submit base-btn"
				type="submit"
				value="Добавить элемент"
			/>
		</form>
	</div>
</template>

<script>
import { eventBus } from "../main";
import uuid from "uuid";

export default {
	name: "AddItem",
	data() {
		return {
			title: "",
			parentId: "",
			errors: []
		};
	},
	created() {
		eventBus.$on("clid", data => {
			this.parentId = data.parentId;
		});
	},
	methods: {
		createItem() {
			this.checkForm();
			const newItem = {
				id: uuid.v4(),
				title: this.title,
				parent: this.parentId,
				children: []
			};
			this.$store.commit("addItem", {
				item: newItem,
				id: this.parentId
			});
			this.title = "";
		},
		checkForm() {
			if (this.title) {
				this.errors = [];
				eventBus.$emit("close", {
					showModal: false
				});
				return true;
			}

			this.errors = [];

			if (!this.title) {
				this.errors.push("Требуется ввести название.");
				return false;
			}
		}
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">

.add-item__title
	margin-bottom 15px
	font-size 18px
	font-weight bold

.add-form
	margin 0 auto

	&__input
		display block
		width 100%
		height 30px
		margin 10px 0
		border 1px solid black
		font-size 14px
		text-align center

	&__input.error
		border-color red

	&__input_submit
		border none
		height auto
</style>
