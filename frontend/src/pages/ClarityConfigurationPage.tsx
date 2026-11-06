import { faPalette, faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	Button,
	Card,
	ColorInput,
	Group,
	SegmentedControl,
	Stack,
	Switch,
	Text,
	TextInput,
	Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { zodResolver } from "mantine-form-zod-resolver";
import { useEffect } from "react";
import { httpErrorToHuman } from "@/api/axios.ts";
import { AdminCan } from "@/elements/Can.tsx";
import Spinner from "@/elements/feedback/Spinner.tsx";
import { useToast } from "@/providers/ToastProvider.tsx";
import getClaritySettings from "../api/getClaritySettings.ts";
import {
	type ClarityOperatorSettings,
	clarityOperatorSettingsSchema,
} from "../api/schema.ts";
import updateClaritySettings from "../api/updateClaritySettings.ts";

export default function ClarityConfigurationPage() {
	const { addToast } = useToast();
	const queryClient = useQueryClient();

	const queryKey = ["extensions", "dev.antigravity.clarity", "settings"];

	const { data: settings, isLoading } = useQuery({
		queryKey,
		queryFn: getClaritySettings,
	});

	const form = useForm<ClarityOperatorSettings>({
		initialValues: {
			defaultNavMode: "left-sidebar",
			defaultContainerMode: "inset",
			allowUserCustomization: true,
			customAccentColor: "#06b6d4",
			customBrandTitle: "Clarity",
		},
		validate: zodResolver(clarityOperatorSettingsSchema),
	});

	useEffect(() => {
		if (settings) {
			form.setValues(settings);
			form.resetDirty();
		}
	}, [settings]);

	const mutation = useMutation({
		mutationFn: updateClaritySettings,
		onSuccess: (updated) => {
			queryClient.setQueryData(queryKey, updated);
			form.setValues(updated);
			form.resetDirty();
			addToast("Clarity operator settings saved successfully", "success");
		},
		onError: (err) => {
			addToast(httpErrorToHuman(err), "error");
		},
	});

	if (isLoading) {
		return <Spinner.Centered />;
	}

	return (
		<AdminCan action="clarity.settings-read">
			<div className="max-w-4xl mx-auto p-4 lg:p-6">
				<form onSubmit={form.onSubmit((values) => mutation.mutate(values))}>
					<Card p="lg" radius="md" withBorder className="bg-surface-raised">
						<Group justify="space-between" mb="lg">
							<Group gap="sm">
								<FontAwesomeIcon
									icon={faPalette}
									className="text-cyan-500 text-xl"
								/>
								<div>
									<Title order={3}>Clarity Theme Configuration</Title>
									<Text size="sm" c="dimmed">
										Global operator defaults for navigation, containers, and
										brand styling
									</Text>
								</div>
							</Group>

							<AdminCan action="clarity.settings-write" cantSave>
								<Button
									type="submit"
									color="cyan"
									leftSection={<FontAwesomeIcon icon={faSave} />}
									loading={mutation.isPending}
									disabled={!form.isDirty()}
								>
									Save Settings
								</Button>
							</AdminCan>
						</Group>

						<Stack gap="md">
							<div>
								<Text size="sm" fw={600} mb={4}>
									Default Navigation Layout
								</Text>
								<Text size="xs" c="dimmed" mb="xs">
									The navigation layout presented to new or unconfigured
									accounts.
								</Text>
								<SegmentedControl
									fullWidth
									{...form.getInputProps("defaultNavMode")}
									data={[
										{ label: "Left Sidebar", value: "left-sidebar" },
										{ label: "Collapsed Rail", value: "collapsed-drawer" },
										{ label: "Top Bar", value: "top-bar" },
									]}
								/>
							</div>

							<div>
								<Text size="sm" fw={600} mb={4}>
									Default Container Width
								</Text>
								<Text size="xs" c="dimmed" mb="xs">
									Controls whether content frames are comfortably inset or
									extend edge-to-edge.
								</Text>
								<SegmentedControl
									fullWidth
									{...form.getInputProps("defaultContainerMode")}
									data={[
										{ label: "Inset Mode", value: "inset" },
										{ label: "Flush Mode", value: "flush" },
									]}
								/>
							</div>

							<Switch
								label="Allow Per-User Customization"
								description="When enabled, individual operators and users can customize their own navigation layout and container modes."
								checked={form.values.allowUserCustomization}
								onChange={(event) =>
									form.setFieldValue(
										"allowUserCustomization",
										event.currentTarget.checked,
									)
								}
							/>

							<ColorInput
								label="Custom Accent Color"
								description="Primary accent color used in boot loader screen and index variables."
								placeholder="#06b6d4"
								{...form.getInputProps("customAccentColor")}
							/>

							<TextInput
								label="Custom Brand Title"
								description="Branded title displayed during early panel boot loading."
								placeholder="Clarity Panel"
								{...form.getInputProps("customBrandTitle")}
							/>
						</Stack>
					</Card>
				</form>
			</div>
		</AdminCan>
	);
}
