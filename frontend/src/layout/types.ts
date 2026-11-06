import { z } from "zod";

export const NavModeSchema = z.enum([
	"left-sidebar",
	"top-bar",
	"collapsed-drawer",
]);
export type NavMode = z.infer<typeof NavModeSchema>;

export const ContainerModeSchema = z.enum(["inset", "flush"]);
export type ContainerMode = z.infer<typeof ContainerModeSchema>;

export const PowerPlacementSchema = z.enum(["header", "sidebar", "floating"]);
export type PowerPlacement = z.infer<typeof PowerPlacementSchema>;

export const AccentPresetSchema = z.enum([
	"cyan",
	"monochrome",
	"violet",
	"emerald",
	"sunset",
	"rose",
]);
export type AccentPreset = z.infer<typeof AccentPresetSchema>;

export const BorderRadiusSchema = z.enum(["compact", "modern", "rounded"]);
export type BorderRadius = z.infer<typeof BorderRadiusSchema>;

export const LayoutConfigSchema = z.object({
	navMode: NavModeSchema.default("left-sidebar"),
	containerMode: ContainerModeSchema.default("inset"),
	powerPlacement: PowerPlacementSchema.default("header"),
	accentPreset: AccentPresetSchema.default("cyan"),
	borderRadius: BorderRadiusSchema.default("modern"),
	tactileButtons: z.boolean().default(true),
	statusGlow: z.boolean().default(true),
	customCss: z.string().default(""),
});

export type LayoutConfig = z.infer<typeof LayoutConfigSchema>;

export const DEFAULT_LAYOUT_CONFIG: LayoutConfig = {
	navMode: "left-sidebar",
	containerMode: "inset",
	powerPlacement: "header",
	accentPreset: "cyan",
	borderRadius: "modern",
	tactileButtons: true,
	statusGlow: true,
	customCss: "",
};

export const LAYOUT_SETTING_KEY = "dev.antigravity.clarity::layout";
