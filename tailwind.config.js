/* eslint-disable no-undef */

// eslint-disable-next-line @typescript-eslint/no-var-requires
const colors = require("tailwindcss/colors");

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
		},
		colors: {
			// Build your palette here
			transparent: "transparent",
			current: "currentColor",
			black: colors.black,
			white: colors.white,
			gray: colors.trueGray,
			green: colors.green,
			red: colors.red,
			blue: colors.blue,
			yellow: colors.amber,
		}
	},
	variants: {
		extend: {},
	},
	plugins: [],
};
