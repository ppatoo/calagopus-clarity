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

export const clarityObsidianPalette: MantineColorsTuple = [
	"#f8fafc",
	"#e2e8f0",
	"#94a3b8",
	"#64748b",
	"#334155",
	"#1e232e",
	"#161a23",
	"#0f1219",
	"#0b0d12",
	"#05070a",
];

export const clarityVioletPalette: MantineColorsTuple = [
	"#f5f3ff",
	"#ede9fe",
	"#ddd6fe",
	"#c4b5fd",
	"#a78bfa",
	"#8b5cf6",
	"#7c3aed",
	"#6d28d9",
	"#5b21b6",
	"#4c1d95",
];

export const clarityEmeraldPalette: MantineColorsTuple = [
	"#ecfdf5",
	"#d1fae5",
	"#a7f3d0",
	"#6ee7b7",
	"#34d399",
	"#10b981",
	"#059669",
	"#047857",
	"#065f46",
	"#064e3b",
];

export const claritySunsetPalette: MantineColorsTuple = [
	"#fff7ed",
	"#ffedd5",
	"#fed7aa",
	"#fdba74",
	"#fb923c",
	"#f97316",
	"#ea580c",
	"#c2410c",
	"#9a3412",
	"#7c2d12",
];

export const clarityRosePalette: MantineColorsTuple = [
	"#fff1f2",
	"#ffe4e6",
	"#fecdd3",
	"#fda4af",
	"#fb7185",
	"#f43f5e",
	"#e11d48",
	"#be123c",
	"#9f1239",
	"#881337",
];

export const clarityTheme: MantineThemeOverride = {
	primaryColor: "clarity",
	defaultRadius: "md",
	fontFamily:
		'"Montserrat Variable", Montserrat, "IBM Plex Sans", Inter, var(--font-sans), system-ui, sans-serif',
	colors: {
		clarity: clarityPalette,
		dark: clarityObsidianPalette,
		violet: clarityVioletPalette,
		emerald: clarityEmeraldPalette,
		sunset: claritySunsetPalette,
		rose: clarityRosePalette,
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
		Modal: {
			defaultProps: {
				radius: "lg",
			},
		},
		TextInput: {
			defaultProps: {
				radius: "md",
			},
		},
		PasswordInput: {
			defaultProps: {
				radius: "md",
			},
		},
	},
};
