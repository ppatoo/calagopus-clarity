import { z } from "zod";

export const clarityOperatorSettingsSchema = z.object({
	defaultNavMode: z.enum(["left-sidebar", "top-bar", "collapsed-drawer"]),
	defaultContainerMode: z.enum(["inset", "flush"]),
	allowUserCustomization: z.boolean(),
	customAccentColor: z.string().nullable().optional(),
	customBrandTitle: z.string().nullable().optional(),
});

export type ClarityOperatorSettings = z.infer<
	typeof clarityOperatorSettingsSchema
>;
