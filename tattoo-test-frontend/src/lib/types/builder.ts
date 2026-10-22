import * as v from 'valibot';
import { sanitizeWpHtml } from '#lib/server/sanitize.ts';

const SanitizedHtml = v.pipe(v.string(), v.transform(sanitizeWpHtml));
const toNumber =  v.pipe( v.string(), v.transform((input) => parseInt(input)));

export const BuilderLinkSchema = v.object({
	url: v.string(),
	title: v.string(),
	target: v.string(),
});

export const BuilderImageSchema = v.object({
	node: v.object({
		sourceUrl: v.string(),
		altText: v.string(),
		mediaDetails: v.object({
			width: v.number(),
			height: v.number(),
			sizes: v.array(
				v.object({
					name: v.string(),
					sourceUrl: v.string(),
					width: toNumber,
					height: toNumber
				})
			)
		}),
	}),
});

export const TabbedContentTabSchema = v.object({
	title: v.string(),
	description: SanitizedHtml,
	thumbnail: v.nullable(BuilderImageSchema),
	featureList: v.array(
		v.object({
			title: v.string(),
			description: SanitizedHtml,
		})
	),
});

export const TabbedContentLayoutSchema = v.object({
	__typename: v.literal('BuilderBuilderTabbedContentLayout'),
	title: v.string(),
	tabs: v.array(TabbedContentTabSchema),
});

export const VideoPlayerLayoutSchema = v.object({
	__typename: v.literal('BuilderBuilderVideoPlayerLayout'),
	title: SanitizedHtml,
	videoLink: BuilderLinkSchema,
	thumbnail: BuilderImageSchema,
});

export const MediaContentLayoutSchema = v.object({
	__typename: v.literal('BuilderBuilderMediaContentLayout'),
	mediaContentBlocks: v.array(
		v.object({
			title: v.string(),
			content: SanitizedHtml,
				thumbnails: v.array(v.object({
					thumbnail: BuilderImageSchema
				})
			)
		})
	),
});

export const CallToActionLayoutSchema = v.object({
	__typename: v.literal('BuilderBuilderCallToActionLayout'),
	title: v.string(),
	content: SanitizedHtml,
	image: BuilderImageSchema,
	link: BuilderLinkSchema
});

export const TeamMemberFieldsSchema = v.object({
	firstName: v.string(),
	lastName: v.string(),
	position: v.string(),
});

export const TeamMemberNodeSchema = v.object({
	id: v.string(),
	title: v.optional(v.string()),
	teamMemberFields: TeamMemberFieldsSchema,
	featuredImage: BuilderImageSchema,
});

export const TeamMemberListingLayoutSchema = v.object({
	__typename: v.literal('BuilderBuilderTeamMemberListingLayout'),
	manualSort: v.boolean(),
	relationship: v.nullable(
		v.object({
			nodes: v.array(TeamMemberNodeSchema),
		})
	),
});

export const BuilderItemSchema = v.variant('__typename', [
	VideoPlayerLayoutSchema,
	TabbedContentLayoutSchema,
	MediaContentLayoutSchema,
	CallToActionLayoutSchema,
	TeamMemberListingLayoutSchema
]);

export type BuilderLink = v.InferOutput<typeof BuilderLinkSchema>;
export type BuilderImage = v.InferOutput<typeof BuilderImageSchema>;
export type TabbedContentTab = v.InferOutput<typeof TabbedContentTabSchema>;
export type TabbedContentLayout = v.InferOutput<typeof TabbedContentLayoutSchema>;
export type VideoPlayerLayout = v.InferOutput<typeof VideoPlayerLayoutSchema>;
export type MediaContentLayout = v.InferOutput<typeof MediaContentLayoutSchema>;
export type CallToActionLayout = v.InferOutput<typeof CallToActionLayoutSchema>;
export type BuilderItem = v.InferOutput<typeof BuilderItemSchema>;
export type TeamMemberFields = v.InferOutput<typeof TeamMemberFieldsSchema>;
export type TeamMemberNode = v.InferOutput<typeof TeamMemberNodeSchema>;
export type TeamMemberListingLayout = v.InferOutput<typeof TeamMemberListingLayoutSchema>;