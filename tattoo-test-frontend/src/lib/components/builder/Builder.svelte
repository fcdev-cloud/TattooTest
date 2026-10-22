<script lang="ts">
	import type { BuilderItem, TeamMemberNode } from '#lib/types/builder.ts';
	import VideoPlayer from '#lib/components/builder/VideoPlayer.svelte';
	import TabbedContent from '#lib/components/builder/TabbedContent.svelte';
	import MediaContent from '#lib/components/builder/MediaContent.svelte';
	import CallToAction from '#lib/components/builder/CallToAction.svelte';
	import TeamMemberListing from '#lib/components/builder/TeamMemberListing.svelte';

	let {
		items,
		templateName,
		teamMembersSortedByLastName
	}: {
		items: BuilderItem[];
		templateName: string;
		teamMembersSortedByLastName: TeamMemberNode[];
	} = $props();
</script>

<div data-template={templateName}>
	{#each items as item, i (i)}
		{#if item.__typename === 'BuilderBuilderVideoPlayerLayout'}
			<VideoPlayer {...item} />
		{:else if item.__typename === 'BuilderBuilderTabbedContentLayout'}
			<TabbedContent {...item} />
		{:else if item.__typename === 'BuilderBuilderMediaContentLayout'}
			<MediaContent {...item} />
		{:else if item.__typename === 'BuilderBuilderCallToActionLayout'}
			<CallToAction {...item} />
		{:else if item.__typename === 'BuilderBuilderTeamMemberListingLayout'}
			<TeamMemberListing {...item} {teamMembersSortedByLastName} />
		{/if}
	{/each}
</div>