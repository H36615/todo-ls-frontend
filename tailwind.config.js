/* eslint-disable no-undef */
module.exports = {
	purge: [
		"./src/**/*.html",
		"./src/**/*.js",
	],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {},
		boxShadow: {
			inline_bottom: "inset 0px -2px 4px 0 rgba(0, 0, 0, 0.06)"
		}
	},
	variants: {
		extend: {},
	},
	plugins: [],
};
