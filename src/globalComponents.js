import AppButton from './components/base/AppButton.vue';
import InputField from './components/base/InputField.vue';
import Form from './components/base/Form.vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

library.add(fas);

const components = [AppButton, InputField, Form, FontAwesomeIcon];

export default components;
