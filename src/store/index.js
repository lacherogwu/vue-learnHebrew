import { createStore } from 'vuex';

const store = createStore({
	state: () => ({
		toast: {
			show: false,
			message: null,
			error: false,
		},
		darkMode: JSON.parse(localStorage.getItem('darkMode')),
		loggedInUser: null,
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
		toggleDarkMode(state) {
			state.darkMode = !state.darkMode;
			localStorage.setItem('darkMode', state.darkMode);
		},
		logout(state) {
			localStorage.removeItem('credentials');
			state.loggedInUser = null;
		},
		login(state, payload) {
			localStorage.setItem('credentials', JSON.stringify(payload));
			state.loggedInUser = payload.username;
		},
	},
});

export default store;
