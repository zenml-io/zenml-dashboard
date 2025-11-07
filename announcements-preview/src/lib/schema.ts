import { ALLOWED_LABEL_VALUES, LabelValue } from "@/components/announcements/label-utils";
import { z } from "zod";

const labelSchema = z.enum(ALLOWED_LABEL_VALUES);

export const announcementSchema = z.object({
	id: z.number(),
	slug: z.string(),
	title: z.string(),
	description: z.string(),
	feature_image_url: z.string().optional(),
	learn_more_url: z.string().url().optional(),
	published: z.boolean().default(true),
	published_at: z.string().datetime(),
	highlight_until: z.string().datetime().optional(),
	should_highlight: z.boolean().optional().default(false),
	video_url: z.string().optional(),
	audience: z.enum(["pro", "oss", "all"]).optional().default("all"),
	labels: z
		.array(z.string())
		.optional()
		.default([])
		.transform((labels) =>
			labels.filter((label): label is LabelValue =>
				ALLOWED_LABEL_VALUES.includes(label as LabelValue)
			)
		)
});

export const announcementListSchema = z.array(announcementSchema);

export type AnnouncementLabel = z.infer<typeof labelSchema>;
export type Announcement = z.infer<typeof announcementSchema>;
export type AnnouncementList = z.infer<typeof announcementListSchema>;
