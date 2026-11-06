import { axiosInstance } from "@/api/axios.ts";
import { parseFromApi } from "@/lib/serialization/api-transform.ts";
import {
	type ClarityOperatorSettings,
	clarityOperatorSettingsSchema,
} from "./schema.ts";

export default async (): Promise<ClarityOperatorSettings> => {
	const { data } = await axiosInstance.get(
		"/api/admin/extensions/dev.antigravity.clarity/settings",
	);
	return parseFromApi(clarityOperatorSettingsSchema, data.settings);
};
