<template>
	<div>
		<div class="modal-mask" @click="closeModal"></div>
		<div class="modal-wrapper">
			<div class="modal-container">
				<AddItem />
			</div>
		</div>
	</div>
</template>

<script>
import { eventBus } from "../main";
import AddItem from "./AddItem.vue";

export default {
	name: "Modal",
	components: {
		AddItem
	},
	methods: {
		closeModal() {
			eventBus.$emit("close", {
				showModal: false
			});
		}
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
.modal-mask
	position fixed
	z-index 1000
	top 0
	left 0
	right 0
	bottom 0
	background-color rgba(0, 0, 0, .5)

.modal-wrapper
	position fixed
	z-index 1000
	top 50%
	left 50%
	transform translate(-50%, -50%)

.modal-container
	max-width 400px
	width 100%
	margin 0 auto
	padding 40px
	background-color #fff
	text-align center
</style>
