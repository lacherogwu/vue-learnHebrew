module.exports = {
	purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
	darkMode: 'class',
	theme: {
		extend: {
			height: {
				'10v': '10vh',
				'20v': '20vh',
				'30v': '30vh',
				'40v': '40vh',
				'50v': '50vh',
				'60v': '60vh',
				'70v': '70vh',
				'80v': '80vh',
				'90v': '90vh',
			},
			maxHeight: {
				'10v': '10vh',
				'20v': '20vh',
				'30v': '30vh',
				'40v': '40vh',
				'50v': '50vh',
				'60v': '60vh',
				'70v': '70vh',
				'80v': '80vh',
				'90v': '90vh',
			},
			colors: {
				red: {
					dark: '#a32828',
				},
			},
		},
	},
	variants: {
		extend: {
			cursor: ['disabled'],
			backgroundColor: ['disabled'],
			textColor: ['disabled'],
			translate: ['dark'],
		},
	},
	plugins: [],
};
