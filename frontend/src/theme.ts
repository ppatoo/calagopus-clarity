import type { MantineColorsTuple, MantineThemeOverride } from "@mantine/core";

export const clarityPalette: MantineColorsTuple = [
	"#ecfeff",
	"#cffafe",
	"#a5f3fc",
	"#67e8f9",
	"#22d3ee",
	"#06b6d4",
	"#0891b2",
	"#0e7490",
	"#155e75",
	"#164e63",
];

export const clarityDarkPalette: MantineColorsTuple = [
	"#f8fafc",
	"#f1f5f9",
	"#e2e8f0",
	"#cbd5e1",
	"#94a3b8",
	"#64748b",
	"#334155",
	"#1e293b",
	"#0f172a",
	"#020617",
];

export const clarityTheme: MantineThemeOverride = {
	primaryColor: "clarity",
	defaultRadius: "md",
	fontFamily: "Inter, var(--font-sans), system-ui, sans-serif",
	colors: {
		clarity: clarityPalette,
		dark: clarityDarkPalette,
	},
	components: {
		Card: {
			defaultProps: {
				radius: "md",
			},
		},
		Paper: {
			defaultProps: {
				radius: "md",
			},
		},
		Button: {
			defaultProps: {
				radius: "md",
			},
		},
		ActionIcon: {
			defaultProps: {
				radius: "md",
			},
		},
	},
};
