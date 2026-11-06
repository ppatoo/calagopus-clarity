import type { CSSVariablesResolver, MantineTheme } from "@mantine/core";

export const clarityCssResolver: CSSVariablesResolver = (
	theme: MantineTheme,
) => {
	const primaryShades = theme.colors[theme.primaryColor] || theme.colors.blue;
	const primaryMain = primaryShades[6] || "#0891b2";
	const primaryLight = primaryShades[4] || "#22d3ee";
	const primaryDark = primaryShades[8] || "#155e75";

	return {
		variables: {
			"--clarity-primary-main": primaryMain,
			"--clarity-primary-light": primaryLight,
			"--clarity-primary-dark": primaryDark,
		},
		light: {
			"--clarity-accent-glow": "rgba(8, 145, 178, 0.12)",
			"--clarity-card-highlight": "rgba(8, 145, 178, 0.05)",
		},
		dark: {
			"--clarity-accent-glow": "rgba(34, 211, 238, 0.15)",
			"--clarity-card-highlight": "rgba(34, 211, 238, 0.05)",
		},
	};
};
