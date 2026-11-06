import { useEffect } from "react";
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
	const [config, setConfig] = useUserSetting(
		LAYOUT_SETTING_KEY,
		LayoutConfigSchema,
		DEFAULT_LAYOUT_CONFIG,
	);

	useEffect(() => {
		const root = document.documentElement;
		root.setAttribute("data-clarity-accent", config.accentPreset || "cyan");
		root.setAttribute("data-clarity-radius", config.borderRadius || "modern");
		root.setAttribute(
			"data-clarity-tactile",
			config.tactileButtons ? "true" : "false",
		);
		root.setAttribute(
			"data-clarity-glow",
			config.statusGlow ? "true" : "false",
		);

		// Dynamic Custom CSS injection
		let styleEl = document.getElementById("clarity-custom-css");
		if (config.customCss?.trim()) {
			if (!styleEl) {
				styleEl = document.createElement("style");
				styleEl.id = "clarity-custom-css";
				document.head.appendChild(styleEl);
			}
			styleEl.textContent = config.customCss;
		} else if (styleEl) {
			styleEl.remove();
		}
	}, [config]);

	return [config, setConfig];
}
