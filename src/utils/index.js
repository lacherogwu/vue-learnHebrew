import _ from 'lodash';

const resetReactive = reactive => _.forEach(reactive, (value, key) => delete reactive[key]);

const idMaker = function* () {
	let id = 0;

	while (true) {
		yield id++;
	}
};

export { resetReactive, idMaker };
