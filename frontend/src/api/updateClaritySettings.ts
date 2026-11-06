import { axiosInstance } from "@/api/axios.ts";
import {
	parseFromApi,
	serializeForApi,
} from "@/lib/serialization/api-transform.ts";
import {
	type ClarityOperatorSettings,
	clarityOperatorSettingsSchema,
} from "./schema.ts";

export default async (
	payload: ClarityOperatorSettings,
): Promise<ClarityOperatorSettings> => {
	const body = serializeForApi(clarityOperatorSettingsSchema, payload);
	const { data } = await axiosInstance.put(
		"/api/admin/extensions/dev.antigravity.clarity/settings",
		body,
	);
	return parseFromApi(clarityOperatorSettingsSchema, data.settings);
};
