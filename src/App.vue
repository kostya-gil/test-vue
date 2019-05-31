<template>
	<div id="app">
		<div class="modal-wrapper">
			<Modal v-show="showModal" />
		</div>
		<div class="app-wrapper">
			<h1 class="app-title">
				Клик правой кнопкой по элементу - сделать его контейнером
			</h1>
			<div class="tree-wrapper">
				<TreeItem :item="getItems" />
			</div>
			<p class="list-ids" v-if="getIds.length">
				Выбранные элементы (id): {{ getIds.join(", ") }}
			</p>
		</div>
	</div>
</template>

<script>
import TreeItem from "./components/TreeItem.vue";
import Modal from "./components/Modal.vue";
import { eventBus } from "./main";

export default {
	name: "App",
	components: {
		TreeItem,
		Modal
	},
	data() {
		return {
			showModal: false
		};
	},
	created() {
		eventBus.$on("open", data => {
			this.showModal = data.showModal;
		});
		eventBus.$on("close", data => {
			this.showModal = data.showModal;
		});
	},
	computed: {
		getItems() {
			return this.$store.state.items;
		},
		getIds() {
			return this.$store.state.listId;
		}
	}
};
</script>

<style src="./main.css"></style>
<style lang="stylus">
#app
	font-family 'Avenir', Helvetica, Arial, sans-serif
	font-size 16px
	text-align center
	padding 20px

.app-wrapper
	margin-top 150px
	display inline-block

input
button
	padding 0

.base-btn
	color white
	border none
	outline none
	font-size 12px
	white-space nowrap
	border 1px solid transparent
	padding 7px
	transition color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out
	background-color #17a2b8
	border-color #17a2b8

.base-btn:hover
.base-btn:focus
	text-decoration none

.base-btn:focus
	outline 0
	box-shadow 0 0 0 0.2rem rgba(0, 123, 255, 0.25)

.tree-wrapper
	position relative
	right 22px
	text-align left

.list-ids
	padding .75rem 1.25rem
	border 1px solid transparent
	color #0c5460
	background-color #d1ecf1
	border-color #bee5eb

.app-title
	display inline-block
	font-size 22px
	font-weight bold
	text-align center
	border-bottom 1px solid black
	padding-bottom 2px
</style>
