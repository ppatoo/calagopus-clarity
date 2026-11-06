import type React from "react";
import type { HookableComponentBase } from "shared";
import AccountContentContainer from "@/elements/containers/AccountContentContainer.tsx";
import AdminContentContainer from "@/elements/containers/AdminContentContainer.tsx";
import ServerContentContainer from "@/elements/containers/ServerContentContainer.tsx";
import Sidebar from "@/elements/Sidebar.tsx";
import { useLayoutConfig } from "./useLayoutConfig.ts";

type Hookable = HookableComponentBase<object>;

function SidebarLayoutWrapper({ children }: { children: React.ReactNode }) {
	const [layout] = useLayoutConfig();
	return (
		<div data-clarity-nav={layout.navMode} className="contents">
			{children}
		</div>
	);
}

function ContainerLayoutWrapper({ children }: { children: React.ReactNode }) {
	const [layout] = useLayoutConfig();
	return (
		<div data-clarity-container={layout.containerMode} className="w-full">
			{children}
		</div>
	);
}

let hooksRegistered = false;

export function applyLayoutHooks(): void {
	if (hooksRegistered) return;
	hooksRegistered = true;

	// Layer D - Hookable components registered once at initialize()
	(Sidebar as unknown as Hookable).addRenderInterceptor(
		(element: React.ReactElement) => (
			<SidebarLayoutWrapper>{element}</SidebarLayoutWrapper>
		),
	);

	(ServerContentContainer as unknown as Hookable).addRenderInterceptor(
		(element: React.ReactElement) => (
			<ContainerLayoutWrapper>{element}</ContainerLayoutWrapper>
		),
	);

	(AccountContentContainer as unknown as Hookable).addRenderInterceptor(
		(element: React.ReactElement) => (
			<ContainerLayoutWrapper>{element}</ContainerLayoutWrapper>
		),
	);

	(AdminContentContainer as unknown as Hookable).addRenderInterceptor(
		(element: React.ReactElement) => (
			<ContainerLayoutWrapper>{element}</ContainerLayoutWrapper>
		),
	);
}
