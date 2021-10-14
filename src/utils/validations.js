export const rules = {
	hebrewLettersValidation: val => /^[\u0590-\u05fe\s]+$/.test(val) || 'Only Hebrew letters are allowed',
	russianLettersValidation: val => /^[аАбБвВгГдДеЕёЁжЖзЗиИйЙкКлЛмМнНоОпПрРсСтТуУфФхХцЦчЧшШщЩъЪыЫьЬэЭюЮяЯ]+$/.test(val) || 'Only Russian letters are allowed',
};
