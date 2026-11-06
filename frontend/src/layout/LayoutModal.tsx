import {
	faCode,
	faCompass,
	faPalette,
	faShapes,
	faSliders,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	Badge,
	Button,
	Group,
	Modal,
	SegmentedControl,
	Stack,
	Switch,
	Tabs,
	Text,
	Textarea,
	Title,
} from "@mantine/core";
import type {
	AccentPreset,
	BorderRadius,
	ContainerMode,
	NavMode,
	PowerPlacement,
} from "./types.ts";
import { useLayoutConfig } from "./useLayoutConfig.ts";

interface LayoutModalProps {
	opened: boolean;
	onClose: () => void;
}

export default function LayoutModal({ opened, onClose }: LayoutModalProps) {
	const [layout, setLayout] = useLayoutConfig();

	return (
		<Modal
			opened={opened}
			onClose={onClose}
			title={
				<Group gap="xs">
					<FontAwesomeIcon icon={faSliders} className="text-cyan-400" />
					<Title order={4}>Clarity Live Studio</Title>
					<Badge variant="light" color="cyan" size="xs">
						Live Customizer
					</Badge>
				</Group>
			}
			centered
			radius="lg"
			size="lg"
		>
			<Tabs defaultValue="palette">
				<Tabs.List mb="md">
					<Tabs.Tab
						value="palette"
						leftSection={<FontAwesomeIcon icon={faPalette} size="xs" />}
					>
						Palette
					</Tabs.Tab>
					<Tabs.Tab
						value="layout"
						leftSection={<FontAwesomeIcon icon={faCompass} size="xs" />}
					>
						Layout
					</Tabs.Tab>
					<Tabs.Tab
						value="surfaces"
						leftSection={<FontAwesomeIcon icon={faShapes} size="xs" />}
					>
						Surfaces
					</Tabs.Tab>
					<Tabs.Tab
						value="css"
						leftSection={<FontAwesomeIcon icon={faCode} size="xs" />}
					>
						Custom CSS
					</Tabs.Tab>
				</Tabs.List>

				<Tabs.Panel value="palette">
					<Stack gap="md">
						<div>
							<Text size="sm" fw={600} mb={4}>
								Theme Accent Preset
							</Text>
							<Text size="xs" c="dimmed" mb="xs">
								Choose a primary accent color for active items, buttons, and
								ambient glow.
							</Text>
							<SegmentedControl
								fullWidth
								value={layout.accentPreset}
								onChange={(val) =>
									setLayout((prev) => ({
										...prev,
										accentPreset: val as AccentPreset,
									}))
								}
								data={[
									{ label: "Navy", value: "navy" },
									{ label: "Cyan", value: "cyan" },
									{ label: "Monochrome", value: "monochrome" },
									{ label: "Violet", value: "violet" },
									{ label: "Emerald", value: "emerald" },
									{ label: "Sunset", value: "sunset" },
									{ label: "Rose", value: "rose" },
								]}
							/>
						</div>

						<Group justify="space-between" mt="sm">
							<div>
								<Text size="sm" fw={600}>
									Ambient Status Edge Glow
								</Text>
								<Text size="xs" c="dimmed">
									Subtle glowing edge on server cards indicating live state
									(lime, amber, rose).
								</Text>
							</div>
							<Switch
								checked={layout.statusGlow}
								onChange={(e) =>
									setLayout((prev) => ({
										...prev,
										statusGlow: e.currentTarget.checked,
									}))
								}
								color="cyan"
							/>
						</Group>
					</Stack>
				</Tabs.Panel>

				<Tabs.Panel value="layout">
					<Stack gap="md">
						<div>
							<Text size="sm" fw={600} mb={4}>
								Navigation Placement
							</Text>
							<Text size="xs" c="dimmed" mb="xs">
								Choose how primary panel navigation is positioned on desktop
								screens.
							</Text>
							<SegmentedControl
								fullWidth
								value={layout.navMode}
								onChange={(val) =>
									setLayout((prev) => ({
										...prev,
										navMode: val as NavMode,
									}))
								}
								data={[
									{ label: "Left Sidebar", value: "left-sidebar" },
									{ label: "Collapsed Rail", value: "collapsed-drawer" },
									{ label: "Top Bar", value: "top-bar" },
								]}
							/>
						</div>

						<div>
							<Text size="sm" fw={600} mb={4}>
								Content Container Mode
							</Text>
							<Text size="xs" c="dimmed" mb="xs">
								Inset preserves margins for balanced reading; Flush stretches
								edge-to-edge.
							</Text>
							<SegmentedControl
								fullWidth
								value={layout.containerMode}
								onChange={(val) =>
									setLayout((prev) => ({
										...prev,
										containerMode: val as ContainerMode,
									}))
								}
								data={[
									{ label: "Inset (Standard)", value: "inset" },
									{ label: "Flush (Edge-to-Edge)", value: "flush" },
								]}
							/>
						</div>

						<div>
							<Text size="sm" fw={600} mb={4}>
								Power Action Placement
							</Text>
							<Text size="xs" c="dimmed" mb="xs">
								Control where server power actions (Start, Stop, Restart)
								appear.
							</Text>
							<SegmentedControl
								fullWidth
								value={layout.powerPlacement}
								onChange={(val) =>
									setLayout((prev) => ({
										...prev,
										powerPlacement: val as PowerPlacement,
									}))
								}
								data={[
									{ label: "Header", value: "header" },
									{ label: "Sidebar", value: "sidebar" },
									{ label: "Floating", value: "floating" },
								]}
							/>
						</div>
					</Stack>
				</Tabs.Panel>

				<Tabs.Panel value="surfaces">
					<Stack gap="md">
						<div>
							<Text size="sm" fw={600} mb={4}>
								Corner Radius Geometry
							</Text>
							<Text size="xs" c="dimmed" mb="xs">
								Adjust curvature across cards, modals, and input fields.
							</Text>
							<SegmentedControl
								fullWidth
								value={layout.borderRadius}
								onChange={(val) =>
									setLayout((prev) => ({
										...prev,
										borderRadius: val as BorderRadius,
									}))
								}
								data={[
									{ label: "Compact (8px)", value: "compact" },
									{ label: "Modern (14px)", value: "modern" },
									{ label: "Rounded (18px)", value: "rounded" },
								]}
							/>
						</div>

						<Group justify="space-between" mt="sm">
							<div>
								<Text size="sm" fw={600}>
									Tactile Button Physics
								</Text>
								<Text size="xs" c="dimmed">
									Subtle physical depression (press down) effect when clicking
									buttons.
								</Text>
							</div>
							<Switch
								checked={layout.tactileButtons}
								onChange={(e) =>
									setLayout((prev) => ({
										...prev,
										tactileButtons: e.currentTarget.checked,
									}))
								}
								color="cyan"
							/>
						</Group>
					</Stack>
				</Tabs.Panel>

				<Tabs.Panel value="css">
					<Stack gap="xs">
						<Text size="sm" fw={600}>
							Live CSS Injections
						</Text>
						<Text size="xs" c="dimmed">
							Inject custom CSS rules instantly into your active session.
						</Text>
						<Textarea
							placeholder="/* Add custom CSS rules here */"
							rows={6}
							value={layout.customCss}
							onChange={(e) =>
								setLayout((prev) => ({
									...prev,
									customCss: e.currentTarget.value,
								}))
							}
						/>
					</Stack>
				</Tabs.Panel>
			</Tabs>

			<Group justify="flex-end" mt="xl">
				<Button variant="default" onClick={onClose}>
					Done
				</Button>
			</Group>
		</Modal>
	);
}
