<script lang="ts">
	import { onMount } from 'svelte';
	import type { MediaContentLayout } from '#lib/types/builder.ts';

	let { mediaContentBlocks }: MediaContentLayout = $props();
	let isDesktop = $state(false);
	onMount(() => {
        const query = window.matchMedia('(min-width: 640px)');
        isDesktop = query.matches;

        const handleChange = (event: MediaQueryListEvent) => {
            isDesktop = event.matches;
        };

        query.addEventListener('change', handleChange);

        return () => query.removeEventListener('change', handleChange);
    });
</script>

<section class="media-content max-w-component mx-auto p-gutter">
	{#each mediaContentBlocks as block, i (i)}
		{#if isDesktop}
			{#if block.content && i === 0}
				<div class="media-content--block__content media-content--block__content-{i}">
					<h2 class="media-content--title font-secondary text-fluid-l tracking-tightest text-brand-1">{block.title}</h2>
					<div class="media-content--body font-primary tracking-tight text-base text-text-dark">
						{@html block.content}
					</div>
				</div>
			{/if}

			{#if block.thumbnails.length && i === 0}
				<div class="media-content--thumbnails media-content--thumbnails-{i}">
					{#each block.thumbnails as { thumbnail }, j (j)}
						<div class="media-content--thumbnails__image">
							<picture>
								<img
									src={thumbnail.node.sourceUrl}
									alt={thumbnail.node.altText}
									width={thumbnail.node.mediaDetails.width}
									height={thumbnail.node.mediaDetails.height}
									class="h-auto w-full"
								/>
							</picture>
						</div>
					{/each}
				</div>
			{/if}


			{#if block.thumbnails.length && i > 0}
				<div class="media-content--thumbnails media-content--thumbnails-{i}">
					{#each block.thumbnails as { thumbnail }, j (j)}
						{#if j < 1}
							<div class="media-content--thumbnails__image">
								<picture>
									<img
										src={thumbnail.node.sourceUrl}
										alt={thumbnail.node.altText}
										width={thumbnail.node.mediaDetails.width}
										height={thumbnail.node.mediaDetails.height}
										class="h-auto w-full"
									/>
								</picture>
							</div>
						{/if}
					{/each}
				</div>
			{/if}

			{#if block.content && i > 0}
				<div class="media-content--block__content media-content--block__content-{i}">
					<h2 class="media-content--title font-secondary text-fluid-l tracking-tightest text-brand-1">{block.title}</h2>
					<div class="media-content--body font-primary tracking-tight text-base text-text-dark">
						{@html block.content}
					</div>

					{#if block.thumbnails.length}
						<div class="media-content--thumbnails">
							{#each block.thumbnails as { thumbnail }, j (j)}
								{#if j >  0}
								<div class="media-content--thumbnails__image">
									<picture>
										<img
											src={thumbnail.node.sourceUrl}
											alt={thumbnail.node.altText}
											width={thumbnail.node.mediaDetails.width}
											height={thumbnail.node.mediaDetails.height}
											class="h-auto w-full"
										/>
									</picture>
								</div>
								{/if}
							{/each}
						</div>
					{/if}
				</div>
			{/if}


		{:else}
			<article class="media-content--block media-content--block-{i}">
				{#if block.thumbnails.length && i === 0}
					<div class="media-content--thumbnails">
						{#each block.thumbnails as { thumbnail }, j (j)}
							<div class="media-content--thumbnails__image">
								<picture>
									<img
										src={thumbnail.node.sourceUrl}
										alt={thumbnail.node.altText}
										width={thumbnail.node.mediaDetails.width}
										height={thumbnail.node.mediaDetails.height}
										class="h-auto w-full"
									/>
								</picture>
							</div>
						{/each}
					</div>
				{/if}

				{#if block.thumbnails.length}
					{#each block.thumbnails as { thumbnail }, j (j)}
						{#if i > 0 && j < 1}
							<div class="media-content--thumbnails">
								<div class="media-content--thumbnails__image">
									<picture>
										<img
											src={thumbnail.node.sourceUrl}
											alt={thumbnail.node.altText}
											width={thumbnail.node.mediaDetails.width}
											height={thumbnail.node.mediaDetails.height}
											class="h-auto w-full"
										/>
									</picture>
								</div>
							</div>
						{/if}
					{/each}
				{/if}

				{#if block.content}
					<div class="media-content--block__content">
						<h2 class="media-content--title font-secondary text-fluid-l tracking-tightest text-brand-1">{block.title}</h2>
						<div class="media-content--body font-primary tracking-tight text-base text-text-dark">
							{@html block.content}
						</div>
					</div>
				{/if}

				{#if block.thumbnails.length}
						<div class="media-content--thumbnails">
							{#each block.thumbnails as { thumbnail }, j (j)}
								{#if i > 0 && j > 0}
								<div class="media-content--thumbnails__image">
									<picture>
										<img
											src={thumbnail.node.sourceUrl}
											alt={thumbnail.node.altText}
											width={thumbnail.node.mediaDetails.width}
											height={thumbnail.node.mediaDetails.height}
											class="h-auto w-full"
										/>
									</picture>
								</div>
								{/if}
							{/each}
						</div>
				{/if}
			</article>
		{/if}
	{/each}	
</section>

<style>
	.media-content {
		.media-content--block-0 .media-content--thumbnails,
		.media-content--thumbnails-0 {
			gap: clamp(1rem, 2vw, 1.875rem);
			display: flex;

			.media-content--thumbnails .media-content--thumbnails__image {
				flex: 1 1 clamp(5.3125rem, 3vw, 10.9375rem);
			}
			.media-content--thumbnails .media-content--thumbnails__image:first-child {
				flex: 1 1 clamp(14.625rem, 3vw, 30.06rem);
			}
		}
		.media-content--block-0 .media-content--thumbnails,
		.media-content--block-1 .media-content--thumbnails {
			margin-bottom: clamp(2.8125rem, 1vw, 3.8125rem);
		}

		.media-content--block-1 .media-content--block__content {
			margin-bottom: calc(3.75rem, 1vw, 4.75rem);
		}
		.media-content--title {
			margin-bottom:  2.06rem;
		}
	}

	@media(min-width: 640px) {
		.media-content {
			display: grid;
			column-gap: clamp(2.75rem, 10vw,8.3125rem);
  			grid-template-areas: "content-1 media-1"
								 "media-2 media-1"
								 "media-2 content-2";
			.media-content--title {
				margin-bottom: clamp(2.06rem, 4.5vw,3.43rem);
			}
			.media-content--block__content-0 {
				grid-area: content-1;
				margin-bottom: clamp(3.85rem, 8vw, 11.5625rem);
				margin-top: clamp(2.15rem, 8vw, 6.4375rem);
			}
			.media-content--block__content-1 {
				grid-area: content-2;
				.media-content--thumbnails__image {
					margin-top: clamp(1.85rem, 8vw, 5.5625rem);
				}
			}
			.media-content--thumbnails-0 {
				grid-area: media-1;
				margin-bottom: clamp(3.5rem, 8vw, 10.5rem);
			}

			.media-content--thumbnails-1 {
				grid-area: media-2;
				margin-top: clamp(-3.75rem,-1vw, -1.25rem);
			}
		}
	}
</style>