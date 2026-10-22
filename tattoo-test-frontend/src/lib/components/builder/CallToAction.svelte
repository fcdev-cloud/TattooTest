<script lang="ts">
	import type { CallToActionLayout } from '#lib/types/builder.ts';
	import Arrow from './arrow.svelte';
	let { title, content, image, link }: CallToActionLayout = $props();
</script>

<section class="call-to-action relative z-10 grid grid-cols-1 grid-rows-1 mx-auto">
	<div class="relative z-10 col-start-1 row-start-1 call-to-action--background">	
		<picture class="call-to-action--image">
			<img
				src={image.node.sourceUrl}
				alt={image.node.altText}
				width={image.node.mediaDetails.width}
				height={image.node.mediaDetails.height}
			/>
		</picture>
	</div>
	<div class="max-w-component mx-auto p-gutter call-to-action--copy-container relative z-20 col-start-1 row-start-1">
		<div class="call-to-action--copy">
			<h2 class="call-to-action--title text-fluid-l text-text-light font-secondary tracking-tightest">{title}</h2>
			<div class="call-to-action--content text-text-light tracking-tight">
				{@html content}
			</div>
			<a class="call-to-action--link text-text-light tracking-tight" href={link.url} target={link.target || undefined}>
				<span class="mr-auto">{link.title}</span><span class="call-to-action--link__arrow">
					<Arrow />
				</span>
			</a>
		</div>
	</div>
</section>

<style>

	.call-to-action {
		width: 100%;
		overflow: hidden;
		height: auto;
		.call-to-action--background {
			width: 100%;
			height: 100%;
		}
		.call-to-action--background picture {
			width: 100%;
		}
		.call-to-action--background img {
			width: 100%;
			height: 0;
			min-height: 100%; 
  			object-fit: cover;
		}
		.call-to-action--copy-container {
			width: 100%;
			padding-top: 23.94rem;
			padding-bottom: 2.5rem;
		}
		.call-to-action--copy {
			width: 100%;
			max-width: 32rem;
		}
		.call-to-action--title {
			margin-bottom: clamp(1.75rem, 4vw, 2.8125rem);
			width: clamp(80%, 35vw, 90%);
		}
		.call-to-action--content {
			margin-bottom: clamp(1.56rem, 4vw, 2rem) ;
		}
		.call-to-action--link {
			display: flex;
			width: 100%;
			gap: 1.5rem;
			align-items: center;
			font-size: clamp(1.25rem, 2vw, 1.5rem);
			line-height: 1.6875rem;
			padding-bottom: 1.125rem;
			border-bottom: 2px solid #fff;
		}
	}

	@media(min-width: 640px) {
		.call-to-action {
			.call-to-action--copy-container {
				width: 100%;
				padding-top: 7.56rem;
				padding-bottom: 7.18rem;
			}
		}
	}
</style>