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

	const state = stats.state || "offline";
	const isOnline = state === "running";
	const isStarting = state === "starting";

	const glowClass = isOnline
		? "clarity-status-glow-running border-l-4 border-l-lime-400"
		: isStarting
			? "clarity-status-glow-starting border-l-4 border-l-amber-400"
			: "clarity-status-glow-offline border-l-4 border-l-rose-500";

	const statusColor = isOnline ? "lime" : isStarting ? "yellow" : "red";

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
				p="sm"
				radius="md"
				className={`mb-4 bg-[#0f1219]/90 border-[rgba(255,255,255,0.08)] backdrop-blur-md shadow-sm transition-all duration-200 ${glowClass}`}
			>
				<Group justify="space-between" mb="xs">
					<Group gap="xs">
						<FontAwesomeIcon icon={faBolt} className="text-cyan-400 text-xs" />
						<Text size="xs" fw={700} tt="uppercase" c="dimmed">
							Clarity Telemetry HUD
						</Text>
						<Badge size="xs" variant="light" color={statusColor}>
							{state.toUpperCase()}
						</Badge>
					</Group>
					<Badge size="xs" variant="dot" color="teal">
						Live Stream
					</Badge>
				</Group>

				<SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing="xs">
					{/* CPU Card */}
					<div className="p-2.5 rounded-lg bg-[#161a23] border border-white/5">
						<Group justify="space-between" mb={4}>
							<Group gap="xs">
								<FontAwesomeIcon
									icon={faMicrochip}
									className="text-cyan-400 text-xs"
								/>
								<Text size="xs" fw={600}>
									CPU
								</Text>
							</Group>
							<Text size="xs" fw={700} c="cyan">
								{cpuPercent}%
								{server.limits.cpu ? ` / ${server.limits.cpu}%` : ""}
							</Text>
						</Group>
						<Progress
							value={cpuPercent}
							size="xs"
							color={
								cpuPercent > 90 ? "red" : cpuPercent > 75 ? "yellow" : "cyan"
							}
							radius="xl"
						/>
					</div>

					{/* Memory Card */}
					<div className="p-2.5 rounded-lg bg-[#161a23] border border-white/5">
						<Group justify="space-between" mb={4}>
							<Group gap="xs">
								<FontAwesomeIcon
									icon={faMemory}
									className="text-purple-400 text-xs"
								/>
								<Text size="xs" fw={600}>
									Arbeitsspeicher
								</Text>
							</Group>
							<Text size="xs" fw={700} c="purple">
								{bytesToString(memUsed)}{" "}
								{memLimit > 0 ? `/ ${bytesToString(memLimit)}` : ""}
							</Text>
						</Group>
						<Progress
							value={memPercent}
							size="xs"
							color={
								memPercent > 90 ? "red" : memPercent > 75 ? "yellow" : "purple"
							}
							radius="xl"
						/>
					</div>

					{/* Disk Card */}
					<div className="p-2.5 rounded-lg bg-[#161a23] border border-white/5">
						<Group justify="space-between" mb={4}>
							<Group gap="xs">
								<FontAwesomeIcon
									icon={faHardDrive}
									className="text-amber-400 text-xs"
								/>
								<Text size="xs" fw={600}>
									Speicherplatz
								</Text>
							</Group>
							<Text size="xs" fw={700} c="amber">
								{bytesToString(diskUsed)}{" "}
								{diskLimit > 0 ? `/ ${bytesToString(diskLimit)}` : ""}
							</Text>
						</Group>
						<Progress
							value={diskPercent}
							size="xs"
							color={
								diskPercent > 90 ? "red" : diskPercent > 75 ? "yellow" : "amber"
							}
							radius="xl"
						/>
					</div>

					{/* Network I/O Card */}
					<div className="p-2.5 rounded-lg bg-[#161a23] border border-white/5">
						<Group justify="space-between" mb={4}>
							<Group gap="xs">
								<FontAwesomeIcon
									icon={faNetworkWired}
									className="text-lime-400 text-xs"
								/>
								<Text size="xs" fw={600}>
									Network I/O
								</Text>
							</Group>
							<Text size="xs" fw={700} c="lime">
								{bytesToString(stats.network?.rxBytes || 0)} ↓ /{" "}
								{bytesToString(stats.network?.txBytes || 0)} ↑
							</Text>
						</Group>
						<Progress value={50} size="xs" color="lime" radius="xl" />
					</div>
				</SimpleGrid>
			</Card>
		</ServerCan>
	);
}
