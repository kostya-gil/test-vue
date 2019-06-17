import Vue from "vue";
import Vuex from "vuex";

const data = [
	{ id: 2, title: "level 1 [0]", parent: 1 },
	{ id: 3, title: "level 1 [1]", parent: 1 },
	{ id: 5, title: "level 3 [0.0.0]", parent: 4 },
	{ id: 4, title: "level 2 [0.0]", parent: 2 },
	{ id: 1, title: "root", parent: null }
];

function treeify(list, idAttr, parentAttr, childrenAttr) {
	if (!idAttr) idAttr = "id";
	if (!parentAttr) parentAttr = "parent";
	if (!childrenAttr) childrenAttr = "children";

	var lookup = {};
	var result = {};
	result[childrenAttr] = [];

	list.forEach(function(obj) {
		lookup[obj[idAttr]] = obj;
		obj[childrenAttr] = [];
	});

	list.forEach(function(obj) {
		if (obj[parentAttr] != null) {
			lookup[obj[parentAttr]][childrenAttr].push(obj);
		} else {
			result[childrenAttr].push(obj);
		}
	});

	return result;
}

Vue.use(Vuex);

function searchTree(element, matchingId) {
	if (element.id == matchingId) {
		return element;
	} else if (element.children != null) {
		var i;
		var result = null;
		for (i = 0; result == null && i < element.children.length; i++) {
			result = searchTree(element.children[i], matchingId);
		}
		return result;
	}
	return null;
}

export default new Vuex.Store({
	state: {
		items: treeify(data),
		listId: []
	},
	mutations: {
		addItem(state, payload) {
			let mass = searchTree(state.items, payload.id);
			mass.children.push(payload.item);
		},
		addId(state, id) {
			if (state.listId.indexOf(id) != id) {
				state.listId.push(id);
			}
		},
		removeId(state, id) {
			state.listId.splice(state.listId.indexOf(id), 1);
		}
	}
});
