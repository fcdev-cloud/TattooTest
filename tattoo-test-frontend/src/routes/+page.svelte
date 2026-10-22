<script lang="ts">
	import FlexibleBuilder from '#lib/components/builder/Builder.svelte';
	import bg from '#lib/assets/images/bg-black.webp';
	let { data } = $props();
</script>
<picture class="page-texture fixed inset-0 -z-10">
	<img src={bg} alt="" class="h-full w-full object-cover" />
</picture>
<FlexibleBuilder
	items={data.builderItems}
	templateName={data.templateName}
	teamMembersSortedByLastName={data.teamMembersSortedByLastName}
/>
