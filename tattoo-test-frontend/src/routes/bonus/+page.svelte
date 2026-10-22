<script lang="ts">
	import FlexibleBuilder from '#lib/components/builder/Builder.svelte';
    import './bonus-theme.css';
	let { data } = $props();
</script>

<FlexibleBuilder
	items={data.builderItems}
	templateName={data.templateName}
	teamMembersSortedByLastName={data.teamMembersSortedByLastName}
/>