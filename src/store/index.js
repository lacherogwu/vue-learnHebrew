import { createStore } from 'vuex';

const store = createStore({
	state: () => ({
		toast: {
			show: false,
			message: null,
		},
	}),
	mutations: {
		toggleToast(state, data) {
			state.toast.message = data.message;
			state.toast.show = true;

			console.log('received');
			setTimeout(() => {
				state.toast.show = false;
			}, 2000);
		},
	},
});

export default store;
