// give me a config that removes the fill attribute, but only if it sits on the `svg` attribute, not on path, rect, etc..

module.exports = {
	exclude: ["src/assets/icons/services/*.svg"],
	plugins: [
		{
			name: "removeAttrs",
			params: {
				attrs: ["fill"]
			}
		}
	]
};

// module.exports = {
// 	plugins: [
// 		{
// 			name: "removeAttrs",
// 			params: {
// 				attrs: ["fill"]
// 			}
// 		}
// 	]
// };
