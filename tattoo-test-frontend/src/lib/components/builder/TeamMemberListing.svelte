<script lang="ts">
	import type { TeamMemberNode } from '#lib/types/builder.ts';

	let {
		manualSort,
		relationship,
		teamMembersSortedByLastName
	}: {
		manualSort: boolean;
		relationship: { nodes: TeamMemberNode[] } | null;
		teamMembersSortedByLastName: TeamMemberNode[];
	} = $props();

	const members = $derived(manualSort ? (relationship?.nodes ?? []) : teamMembersSortedByLastName);
</script>

<section class="team-member-listing  max-w-component mx-auto p-gutter">
	<div class="team-member-listing--intro text-center">
		<h2 class="text-text-light text-fluid-l font-secondary">OUR TEAM</h2>
		<p class="text-text-light text-base">Meet the nuts behind the snacks.</p>
	</div>

	<div class="team-member-listing--grid">
	{#each members as member (member.id)}
		<div class="team-member">
			<div class="team-member--img">
				<img src={member.featuredImage.node.sourceUrl} alt={member.featuredImage.node.altText} />
			</div>
			<div class="team-member--content text-text-light font-primary">
				<p>{member.teamMemberFields.firstName} {member.teamMemberFields.lastName}</p>
				<p>{member.teamMemberFields.position}</p>
			</div>
		</div>
	{/each}
	</div>
</section>

<style>
	.team-member-listing {
		.team-member-listing--grid {
			display: grid;
			grid-template-columns: repeat(auto-fit, minmax(max(16.25rem, calc((100% - (1.875rem * 3)) / 4)), 1fr));
			column-gap: 1.875rem;
			row-gap: clamp(3rem, 6vw,4.75rem);
		}
		.team-member-listing--intro {
			margin-bottom: clamp(3rem, 6vw ,6rem);
		}
		.team-member--img {
			width: 100%;
			aspect-ratio: 1;
			overflow: hidden;
			border-radius: 1rem;
			border-top-left-radius: 3.75rem;
			img {
				width: 100%;
				height: 100%;
				object-fit: cover;
			}
		}
	}
</style>
