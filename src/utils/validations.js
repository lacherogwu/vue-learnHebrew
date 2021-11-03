export const rules = {
	hebrewLettersValidation: val => /^[\u0590-\u05fe\s]+$/.test(val) || 'Only Hebrew letters are allowed',
	russianLettersValidation: val => /^[аАбБвВгГдДеЕёЁжЖзЗиИйЙкКлЛмМнНоОпПрРсСтТуУфФхХцЦчЧшШщЩъЪыЫьЬэЭюЮяЯ]+$/.test(val) || 'Only Russian letters are allowed',
	usernameMinimum: val => /^.{2,}$/.test(val) || 'Minimum 2 characters',
	passwordMinimum: val => /^.{6,}$/.test(val) || 'Minimum 6 characters',
	passwordConfirm: (val, context) => val === context.form.password || 'Password not match',
};
