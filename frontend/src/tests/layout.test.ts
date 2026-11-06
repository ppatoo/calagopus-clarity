import assert from "node:assert";
import test from "node:test";
import {
	DEFAULT_LAYOUT_CONFIG,
	LAYOUT_SETTING_KEY,
	LayoutConfigSchema,
} from "../layout/types.ts";
import {
	clarityDarkPalette,
	clarityNavyPalette,
	clarityObsidianPalette,
	clarityPalette,
	clarityTheme,
} from "../theme.ts";

test("LayoutConfigSchema accepts valid default configuration", () => {
	const parsed = LayoutConfigSchema.parse(DEFAULT_LAYOUT_CONFIG);
	assert.strictEqual(parsed.navMode, "left-sidebar");
	assert.strictEqual(parsed.containerMode, "inset");
	assert.strictEqual(parsed.powerPlacement, "header");
	assert.strictEqual(parsed.accentPreset, "navy");
	assert.strictEqual(parsed.borderRadius, "modern");
	assert.strictEqual(parsed.tactileButtons, true);
	assert.strictEqual(parsed.statusGlow, true);
	assert.strictEqual(parsed.customCss, "");
});

test("LayoutConfigSchema accepts valid alternative configurations", () => {
	const custom = {
		navMode: "collapsed-drawer",
		containerMode: "flush",
		powerPlacement: "floating",
		accentPreset: "violet",
		borderRadius: "rounded",
		tactileButtons: false,
		statusGlow: false,
		customCss: "body { background: #000; }",
	};
	const parsed = LayoutConfigSchema.parse(custom);
	assert.strictEqual(parsed.navMode, "collapsed-drawer");
	assert.strictEqual(parsed.containerMode, "flush");
	assert.strictEqual(parsed.powerPlacement, "floating");
	assert.strictEqual(parsed.accentPreset, "violet");
	assert.strictEqual(parsed.borderRadius, "rounded");
	assert.strictEqual(parsed.tactileButtons, false);
	assert.strictEqual(parsed.statusGlow, false);
	assert.strictEqual(parsed.customCss, "body { background: #000; }");
});

test("LayoutConfigSchema falls back gracefully on empty object", () => {
	const parsed = LayoutConfigSchema.parse({});
	assert.strictEqual(parsed.navMode, "left-sidebar");
	assert.strictEqual(parsed.containerMode, "inset");
	assert.strictEqual(parsed.powerPlacement, "header");
	assert.strictEqual(parsed.accentPreset, "navy");
	assert.strictEqual(parsed.borderRadius, "modern");
	assert.strictEqual(parsed.tactileButtons, true);
	assert.strictEqual(parsed.statusGlow, true);
});

test("Layout setting namespace is properly qualified", () => {
	assert.strictEqual(LAYOUT_SETTING_KEY, "dev.antigravity.clarity::layout");
	assert.ok(!LAYOUT_SETTING_KEY.startsWith("app::"));
	assert.ok(!LAYOUT_SETTING_KEY.startsWith("server::"));
	assert.ok(!LAYOUT_SETTING_KEY.startsWith("console::"));
});

test("Theme palette definitions satisfy Mantine 10-shade requirements", () => {
	assert.strictEqual(clarityNavyPalette.length, 10);
	assert.strictEqual(clarityNavyPalette[6], "#2f4b7c");
	assert.strictEqual(clarityPalette.length, 10);
	assert.strictEqual(clarityDarkPalette.length, 10);
	assert.strictEqual(clarityObsidianPalette.length, 10);
	assert.strictEqual(clarityTheme.primaryColor, "navy");
	assert.strictEqual(clarityTheme.defaultRadius, "md");
});
