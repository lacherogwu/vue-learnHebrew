import _ from 'lodash';

const resetReactive = reactive => _.forEach(reactive, (value, key) => delete reactive[key]);

export { resetReactive };
