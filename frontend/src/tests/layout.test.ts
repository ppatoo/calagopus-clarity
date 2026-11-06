import assert from "node:assert";
import test from "node:test";
import {
	DEFAULT_LAYOUT_CONFIG,
	LAYOUT_SETTING_KEY,
	LayoutConfigSchema,
} from "../layout/types.ts";
import { clarityDarkPalette, clarityPalette, clarityTheme } from "../theme.ts";

test("LayoutConfigSchema accepts valid default configuration", () => {
	const parsed = LayoutConfigSchema.parse(DEFAULT_LAYOUT_CONFIG);
	assert.strictEqual(parsed.navMode, "left-sidebar");
	assert.strictEqual(parsed.containerMode, "inset");
	assert.strictEqual(parsed.powerPlacement, "header");
});

test("LayoutConfigSchema accepts valid alternative configurations", () => {
	const custom = {
		navMode: "collapsed-drawer",
		containerMode: "flush",
		powerPlacement: "floating",
	};
	const parsed = LayoutConfigSchema.parse(custom);
	assert.strictEqual(parsed.navMode, "collapsed-drawer");
	assert.strictEqual(parsed.containerMode, "flush");
	assert.strictEqual(parsed.powerPlacement, "floating");
});

test("LayoutConfigSchema falls back gracefully on empty object", () => {
	const parsed = LayoutConfigSchema.parse({});
	assert.strictEqual(parsed.navMode, "left-sidebar");
	assert.strictEqual(parsed.containerMode, "inset");
	assert.strictEqual(parsed.powerPlacement, "header");
});

test("Layout setting namespace is properly qualified", () => {
	assert.strictEqual(LAYOUT_SETTING_KEY, "dev.antigravity.clarity::layout");
	assert.ok(!LAYOUT_SETTING_KEY.startsWith("app::"));
	assert.ok(!LAYOUT_SETTING_KEY.startsWith("server::"));
	assert.ok(!LAYOUT_SETTING_KEY.startsWith("console::"));
});

test("Theme palette definitions satisfy Mantine 10-shade requirements", () => {
	assert.strictEqual(clarityPalette.length, 10);
	assert.strictEqual(clarityDarkPalette.length, 10);
	assert.strictEqual(clarityTheme.primaryColor, "clarity");
	assert.strictEqual(clarityTheme.defaultRadius, "md");
});
