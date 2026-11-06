import { useUserSetting } from "@/lib/userSettings.ts";
import {
	DEFAULT_LAYOUT_CONFIG,
	LAYOUT_SETTING_KEY,
	type LayoutConfig,
	LayoutConfigSchema,
} from "./types.ts";

export function useLayoutConfig(): [
	LayoutConfig,
	(value: LayoutConfig | ((prev: LayoutConfig) => LayoutConfig)) => void,
] {
	return useUserSetting(
		LAYOUT_SETTING_KEY,
		LayoutConfigSchema,
		DEFAULT_LAYOUT_CONFIG,
	);
}
