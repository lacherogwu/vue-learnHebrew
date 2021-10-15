import { createStore } from 'vuex';

const store = createStore({
	state: () => ({
		toast: {
			show: false,
			message: null,
			error: false,
		},
	}),
	mutations: {
		clearToast(state, data) {
			state.toast.show = false;

			setTimeout(() => {
				state.toast.message = null;
				state.toast.error = false;
			}, 200);
		},
		toggleToast(state, data) {
			if (state.toast.message) return;

			state.toast.message = data.message;
			state.toast.error = data.error;
			state.toast.show = true;

			setTimeout(() => this.commit('clearToast'), 2000);
		},
	},
});

export default store;
