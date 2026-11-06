import {
	faBolt,
	faHardDrive,
	faMemory,
	faMicrochip,
	faNetworkWired,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Badge, Card, Group, Progress, SimpleGrid, Text } from "@mantine/core";
import { ServerCan } from "@/elements/Can.tsx";
import { bytesToString } from "@/lib/format/size.ts";
import { useServerStore } from "@/stores/server.ts";

export default function ServerMetricsHud() {
	const server = useServerStore((state) => state.server);
	const stats = useServerStore((state) => state.stats);

	if (!server || !stats) {
		return null;
	}

	const cpuPercent = Math.min(100, Math.round(stats.cpuAbsolute || 0));
	const memUsed = stats.memoryBytes || 0;
	const memLimit = (server.limits.memory || 0) * 1024 * 1024;
	const memPercent =
		memLimit > 0 ? Math.min(100, Math.round((memUsed / memLimit) * 100)) : 0;

	const diskUsed = stats.diskBytes || 0;
	const diskLimit = (server.limits.disk || 0) * 1024 * 1024;
	const diskPercent =
		diskLimit > 0 ? Math.min(100, Math.round((diskUsed / diskLimit) * 100)) : 0;

	return (
		<ServerCan action="clarity.view">
			<Card
				withBorder
				p="xs"
				radius="md"
				className="mb-4 bg-surface-glass border-[var(--clarity-subtle-border)] backdrop-blur-sm shadow-sm"
			>
				<Group justify="space-between" mb="xs">
					<Group gap="xs">
						<FontAwesomeIcon icon={faBolt} className="text-cyan-400 text-xs" />
						<Text size="xs" fw={700} tt="uppercase" c="dimmed">
							Clarity Real-Time Telemetry HUD
						</Text>
					</Group>
					<Badge size="xs" variant="dot" color="green">
						Live Sync
					</Badge>
				</Group>

				<SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing="xs">
					{/* CPU Card */}
					<div className="p-2 rounded bg-neutral-900/40 border border-neutral-800/60">
						<Group justify="space-between" mb={4}>
							<Group gap="xs">
								<FontAwesomeIcon
									icon={faMicrochip}
									className="text-cyan-400 text-xs"
								/>
								<Text size="xs" fw={600}>
									CPU Load
								</Text>
							</Group>
							<Text size="xs" fw={700} c={cpuPercent > 85 ? "red" : "cyan"}>
								{cpuPercent}%
							</Text>
						</Group>
						<Progress
							value={cpuPercent}
							size="xs"
							color={cpuPercent > 85 ? "red" : "cyan"}
							radius="xl"
						/>
					</div>

					{/* Memory Card */}
					<div className="p-2 rounded bg-neutral-900/40 border border-neutral-800/60">
						<Group justify="space-between" mb={4}>
							<Group gap="xs">
								<FontAwesomeIcon
									icon={faMemory}
									className="text-amber-400 text-xs"
								/>
								<Text size="xs" fw={600}>
									Memory
								</Text>
							</Group>
							<Text size="xs" fw={700} c={memPercent > 90 ? "red" : "amber"}>
								{bytesToString(memUsed)}
							</Text>
						</Group>
						<Progress
							value={memPercent}
							size="xs"
							color={memPercent > 90 ? "red" : "amber"}
							radius="xl"
						/>
					</div>

					{/* Disk Card */}
					<div className="p-2 rounded bg-neutral-900/40 border border-neutral-800/60">
						<Group justify="space-between" mb={4}>
							<Group gap="xs">
								<FontAwesomeIcon
									icon={faHardDrive}
									className="text-purple-400 text-xs"
								/>
								<Text size="xs" fw={600}>
									Storage
								</Text>
							</Group>
							<Text size="xs" fw={700} c={diskPercent > 90 ? "red" : "grape"}>
								{bytesToString(diskUsed)}
							</Text>
						</Group>
						<Progress
							value={diskPercent}
							size="xs"
							color={diskPercent > 90 ? "red" : "grape"}
							radius="xl"
						/>
					</div>

					{/* Network I/O */}
					<div className="p-2 rounded bg-neutral-900/40 border border-neutral-800/60">
						<Group justify="space-between" mb={4}>
							<Group gap="xs">
								<FontAwesomeIcon
									icon={faNetworkWired}
									className="text-emerald-400 text-xs"
								/>
								<Text size="xs" fw={600}>
									Network I/O
								</Text>
							</Group>
							<Text size="xs" fw={700} c="emerald">
								{bytesToString(stats.network?.rxBytes || 0)} ↓ /{" "}
								{bytesToString(stats.network?.txBytes || 0)} ↑
							</Text>
						</Group>
						<Progress value={45} size="xs" color="emerald" radius="xl" />
					</div>
				</SimpleGrid>
			</Card>
		</ServerCan>
	);
}
