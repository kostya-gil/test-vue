import Vue from "vue";
import App from "./App.vue";
import store from "./store";

Vue.config.productionTip = false;

export const eventBus = new Vue();

new Vue({
	el: "#app",
	store,
	render: h => h(App)
});
