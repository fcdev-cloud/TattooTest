import { client } from '#lib/server/graphql.ts';
import * as v from 'valibot';
import { BuilderItemSchema, TeamMemberNodeSchema } from '#lib/types/builder.ts';

const PageResponseSchema = v.object({
	page: v.object({
		title: v.string(),
		template: v.object({
			templateName: v.string(),
		}),
		builder: v.object({
			builder: v.array(BuilderItemSchema),
		}),
	}),
	teamMembers: v.object({
		nodes: v.array(TeamMemberNodeSchema),
	}),
});

const videoPlayerQuery: string = `... on BuilderBuilderVideoPlayerLayout {
          title
          fieldGroupName
          thumbnail {
            node {
              altText
              sourceUrl
              mediaDetails {
			  	width
			  	height
			  	sizes{
					name
					sourceUrl
					width
					height
				}
              }
            }
          }
          videoLink {
            target
            title
            url
          }
        }
`;

const tabbedContentQuery: string = `... on BuilderBuilderTabbedContentLayout {
          title
          tabs {
            title
            description
            featureList {
              description
              title
            }
            thumbnail {
              node {
                altText
                sourceUrl
                mediaDetails {
					width
			  		height
					sizes {
						name
						sourceUrl
						width
						height
					}
                }
              }
            }
          }
        }`;

const mediaContentQuery: string = `... on BuilderBuilderMediaContentLayout {
          mediaContentBlocks {
            content
            title
            thumbnails {
              thumbnail {
                node {
                  altText
                  sourceUrl
                  mediaDetails {
				  	width
			  	  	height
                    sizes {
                      name
                      sourceUrl
                      width
                      height
                    }
                  }
                }
              }
            }
          }
        }`;

const callToActionQuery: string = `... on BuilderBuilderCallToActionLayout {
          content
          fieldGroupName
          title
          image {
            node {
              altText
              sourceUrl
              mediaDetails {
			  	width
			  	height
                sizes {
					name
					sourceUrl
					width
					height
                }
              }
            }
          }
          link {
            target
            title
            url
          }
        }`;

const teamMemberListingQuery: string = `... on BuilderBuilderTeamMemberListingLayout {
          fieldGroupName
          manualSort
          relationship {
            nodes {
              id
              ... on TeamMember {
                title
                teamMemberFields {
                  firstName
                  lastName
                  position
                }
                featuredImage {
                  node {
                    altText
                    sourceUrl
                    mediaDetails {
                      width
                      height
                      sizes {
                        name
                        sourceUrl
                        width
                        height
                      }
                    }
                  }
                }
              }
            }
          }
        }`;

const teamMemberAutoQuery:string =` teamMembers(where: { orderby: [{ field: LAST_NAME, order: ASC }] }) {
				nodes {
					id
					title
					teamMemberFields {
						firstName
						lastName
						position
					}
					featuredImage {
						node {
							altText
							sourceUrl
							mediaDetails {
								width
								height
								sizes {
									name
									sourceUrl
									width
									height
								}
							}
						}
					}
				}
			}`;

export async function getBuilderPage(uri: string) {
	const raw = await client.request(`
		query GetPageBuilderData {
			page(id: "${uri}", idType: URI) {
				title
                template {
                    templateName
                }
				builder {
					builder {
						__typename
						${videoPlayerQuery}
						${tabbedContentQuery}
						${mediaContentQuery}
						${callToActionQuery}
						${teamMemberListingQuery}
					}
				}
			}
      ${teamMemberAutoQuery}
		}
	`);

	const data = v.parse(PageResponseSchema, raw);

	return {
		pageTitle: data.page.title,
		templateName: data.page.template.templateName,
		builderItems: data.page.builder.builder,
		teamMembersSortedByLastName: data.teamMembers.nodes,
	};
}