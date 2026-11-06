import { faSliders } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	Badge,
	Button,
	Group,
	Modal,
	SegmentedControl,
	Stack,
	Text,
	Title,
} from "@mantine/core";
import type { ContainerMode, NavMode, PowerPlacement } from "./types.ts";
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
					<FontAwesomeIcon icon={faSliders} className="text-cyan-500" />
					<Title order={4}>Clarity Layout Studio</Title>
					<Badge variant="light" color="cyan" size="xs">
						User Preferences
					</Badge>
				</Group>
			}
			centered
			radius="md"
			size="md"
		>
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
							setLayout((prev) => ({ ...prev, navMode: val as NavMode }))
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
						Content Container Width
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
							{ label: "Inset (Default)", value: "inset" },
							{ label: "Flush (Edge-to-Edge)", value: "flush" },
						]}
					/>
				</div>

				<div>
					<Text size="sm" fw={600} mb={4}>
						Power Control Placement
					</Text>
					<Text size="xs" c="dimmed" mb="xs">
						Control where server power actions (Start, Stop, Restart) appear.
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
							{ label: "Header Bar", value: "header" },
							{ label: "Sidebar Top", value: "sidebar" },
							{ label: "Floating HUD", value: "floating" },
						]}
					/>
				</div>

				<Group justify="flex-end" mt="sm">
					<Button variant="subtle" color="gray" onClick={onClose}>
						Done
					</Button>
				</Group>
			</Stack>
		</Modal>
	);
}
