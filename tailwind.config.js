module.exports = {
	purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
	darkMode: false,
	theme: {
		extend: {},
	},
	variants: {
		extend: {
			cursor: ['disabled'],
			backgroundColor: ['disabled'],
			textColor: ['disabled'],
		},
	},
	plugins: [],
};
