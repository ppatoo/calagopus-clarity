import { faBolt, faPalette } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { CSSVariablesResolver, MantineThemeOverride } from "@mantine/core";
import type React from "react";
import { Extension, type ExtensionContext } from "shared";
import ServerMetricsHud from "./hud/ServerMetricsHud.tsx";
import { applyLayoutHooks } from "./layout/applyLayoutHooks.tsx";
import LayoutTogglePill from "./layout/LayoutTogglePill.tsx";
import {
	ClarityCardDetails,
	ClarityCardSummary,
} from "./pages/ClarityCard.tsx";
import ClarityConfigurationPage from "./pages/ClarityConfigurationPage.tsx";
import { clarityCssResolver } from "./resolver.ts";
import { clarityTheme } from "./theme.ts";

class DevAntigravityClarityExtension extends Extension {
	public override cardConfigurationPage: React.FC | null =
		ClarityConfigurationPage;
	public override cardComponent: React.FC | null = ClarityCardSummary;
	public override cardPreviewComponent: React.FC | null = ClarityCardDetails;
	public override cardIcon: React.ReactNode = (
		<FontAwesomeIcon icon={faPalette} className="text-cyan-400" />
	);

	public override initialize(ctx: ExtensionContext): void {
		const accentColor = this.getIndexVariable<string>("accent_color");
		const brandName = this.getIndexVariable<string>("brand_name");
		console.log(
			`Clarity Theme & UI loaded (brand: ${brandName}, accent: ${accentColor})`,
		);

		// Layer D - Hook into Sidebar, containers
		applyLayoutHooks();

		// Mount floating Layout Studio trigger
		ctx.extensionRegistry.global.appendComponent(LayoutTogglePill);

		// Mount Server Metrics Telemetry HUD on Server pages
		ctx.extensionRegistry.pages.server.prependedComponents.push(
			ServerMetricsHud,
		);

		// Register Permission Icons for Admin and Server permission trees
		ctx.extensionRegistry.permissionIcons
			.addAdminPermissionIcon(
				"clarity",
				<FontAwesomeIcon icon={faPalette} className="text-cyan-400" />,
			)
			.addServerPermissionIcon(
				"clarity",
				<FontAwesomeIcon icon={faBolt} className="text-amber-400" />,
			);
	}

	public override initializeMantineTheme(
		_ctx: ExtensionContext,
	): MantineThemeOverride {
		return clarityTheme;
	}

	public override initializeMantineCssResolver(
		_ctx: ExtensionContext,
	): CSSVariablesResolver | null {
		return clarityCssResolver;
	}

	public override processCall(
		ctx: ExtensionContext,
		name: string,
		_args: object,
	): unknown {
		if (name === "dev_antigravity_clarity_get_version") {
			return "1.0.0";
		}
		if (name === "dev_antigravity_clarity_get_theme_name") {
			return "Clarity";
		}
		return ctx.skip();
	}
}

export default new DevAntigravityClarityExtension();
