import { z } from "zod";

const announcementLabelSchema = z.object({
	id: z.string(),
	name: z.string()
});

export const announcementSchema = z.object({
	id: z.number(),
	slug: z.string(),
	title: z.string(),
	description: z.string(),
	description_md: z.string(),
	feature_image_url: z.string().url(),
	learn_more_url: z.string().url().optional(),
	published: z.boolean(),
	published_at: z.string().datetime(),
	should_highlight: z.boolean(),
	labels: z.array(announcementLabelSchema)
});

export const announcementsSchema = z.array(announcementSchema);

export type Announcement = z.infer<typeof announcementSchema>;
export type AnnouncementLabel = z.infer<typeof announcementLabelSchema>;
export type Announcements = z.infer<typeof announcementsSchema>;
