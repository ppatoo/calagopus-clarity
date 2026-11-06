import {
	faCheckCircle,
	faSliders,
	faSwatchbook,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Badge, Code, Group, Stack, Text } from "@mantine/core";

export function ClarityCardSummary() {
	return (
		<Group gap="xs">
			<Badge
				color="cyan"
				variant="light"
				size="sm"
				leftSection={<FontAwesomeIcon icon={faCheckCircle} />}
			>
				Clarity Engine Active
			</Badge>
			<Badge color="gray" variant="outline" size="sm">
				Mantine 9 + CSS Tokens
			</Badge>
		</Group>
	);
}

export function ClarityCardDetails() {
	return (
		<Stack gap="xs" mt="xs">
			<Text size="xs" c="dimmed">
				Original Theme & UI enhancement layer featuring reactive multi-mode
				navigation, container scaling, and live telemetry HUD.
			</Text>
			<Group gap="xs">
				<Badge
					size="xs"
					variant="dot"
					color="cyan"
					leftSection={<FontAwesomeIcon icon={faSliders} />}
				>
					3 Navigation Modes
				</Badge>
				<Badge
					size="xs"
					variant="dot"
					color="purple"
					leftSection={<FontAwesomeIcon icon={faSwatchbook} />}
				>
					Dual Palette
				</Badge>
			</Group>
			<Group gap="xs">
				<Text size="xs" c="dimmed">
					Namespace:
				</Text>
				<Code>dev.antigravity.clarity</Code>
			</Group>
		</Stack>
	);
}
