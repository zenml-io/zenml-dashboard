import { ALLOWED_LABEL_VALUES, LabelValue } from "@/components/announcements/label-utils";
import { z } from "zod";

const announcementLabelSchema = z.enum(ALLOWED_LABEL_VALUES);

export const announcementSchema = z.object({
	id: z.number(),
	slug: z.string(),
	title: z.string(),
	description: z.string(),
	feature_image_url: z.string().optional(),
	learn_more_url: z.string().url().optional(),
	published: z.boolean(),
	published_at: z.string().datetime(),
	should_highlight: z.boolean(),
	video_url: z.string().optional(),
	is_pro_only: z.boolean().optional().default(false),
	labels: z
		.array(z.string())
		.transform((labels) =>
			labels.filter((label): label is LabelValue =>
				ALLOWED_LABEL_VALUES.includes(label as LabelValue)
			)
		)
});

export const announcementsSchema = z.array(announcementSchema);

export type Announcement = z.infer<typeof announcementSchema>;
export type AnnouncementLabel = z.infer<typeof announcementLabelSchema>;
export type Announcements = z.infer<typeof announcementsSchema>;
