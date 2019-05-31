<template>
	<div class="tree-item" ref="treeItem">
		<div>
			<label
				class="tree-item__label"
				v-if="item.title"
				:class="{ bold: isFolder }"
				@contextmenu.prevent="makeFolder"
			>
				<input
					class="tree-item__check"
					@click="addId"
					ref="checkElem"
					type="checkbox"
					:value="item.id"
				/>
				<span class="tree-item__title">
					{{ item.index }}
					{{ item.title }}
				</span>
			</label>
			<button
				v-if="item.title"
				:class="{ invisible: index }"
				class="base-btn add-btn"
				@click="openModal"
			>
				Добавить соседа
			</button>
			<div
				v-if="isFolder"
				:class="{ invisible: !item.title }"
				@click="toggle"
				class="toggle-item"
			>
				{{ isOpen ? "-" : "+" }}
			</div>
			<div
				class="tree-item__folder"
				:class="{ border: item.title }"
				v-show="isOpen"
				v-if="isFolder"
			>
				<TreeItem
					v-for="(child, index) in item.children"
					:key="index"
					:index="index"
					:item="child"
				/>
			</div>
		</div>
	</div>
</template>

<script>
import { eventBus } from "../main";

export default {
	name: "TreeItem",
	props: {
		item: Object,
		index: Number
	},
	data() {
		return {
			isOpen: true
		};
	},
	computed: {
		isFolder() {
			return this.item.children && this.item.children.length;
		}
	},
	methods: {
		addId() {
			const input = this.$refs.checkElem;
			const treeItem = this.$refs.treeItem;
			if (input.checked) {
				this.$store.commit("addId", input.value);
				[].slice.call(treeItem.querySelectorAll('.tree-item__check')).forEach(function(item, i) {
					if (i == 0) {
						return false;
					} else {
						this.$store.commit("removeId", item.value);
						item.checked = false;
						item.disabled = true;
					}
				});
			} else {
				this.$store.commit("removeId", input.value);
				[].slice.call(treeItem.querySelectorAll('.tree-item__check')).forEach(function(item, i) {
					item.disabled = false;
				});
			}
		},
		openModal() {
			eventBus.$emit("open", {
				showModal: true
			});
			eventBus.$emit("clid", {
				parentId: this.item.parent
			});
		},
		toggle() {
			if (this.isFolder) {
				this.isOpen = !this.isOpen;
			}
		},
		makeFolder() {
			if (!this.isFolder) {
				eventBus.$emit("open", {
					showModal: true
				});
				eventBus.$emit("clid", {
					parentId: this.item.id
				});
				this.isOpen = true;
			}
		}
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">

.invisible
	display none !important

.bold
	font-weight bold

.toggle-item
	display inline-block
	vertical-align middle
	font-size 30px
	position relative
	left 5px

.tree-item
	cursor pointer
	-webkit-user-select none
	-moz-user-select none
	-ms-user-select none
	font-size 20px

	&__check
	&__title
		display inline-block
		vertical-align middle
		margin-bottom 15px

	&__check
		width 23px
		height 23px
		margin-right 10px

	&__label
		display inline-block
		vertical-align middle
		margin-top 15px

.tree-item__folder
	padding-left 30px
	padding-bottom 30px

.tree-item__folder.border
	border-left 2px solid black
	border-bottom 2px solid black

.add-btn
	margin-left 15px
</style>
