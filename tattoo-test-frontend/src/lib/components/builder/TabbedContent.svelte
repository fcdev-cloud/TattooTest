<script lang="ts">
    import { onMount } from 'svelte';
    import type { TabbedContentLayout } from '#lib/types/builder.ts';
    import { ScrollBooster } from 'scrollbooster';

	let { title, tabs }: TabbedContentLayout = $props();

	let activeIndex = $state(0);
	let activeTab = $derived(tabs[activeIndex]);
    
    let trackEl = $state<HTMLDivElement | null>(null);
    let contentEl = $state<HTMLDivElement | null>(null);

    let isDesktop = $state(false);

    onMount(() => {
        const query = window.matchMedia('(min-width: 768px)');
        isDesktop = query.matches;

        const handleChange = (event: MediaQueryListEvent) => {
            isDesktop = event.matches;
        };

        query.addEventListener('change', handleChange);

        return () => query.removeEventListener('change', handleChange);
    });

    $effect(() => {
        if (!trackEl || !contentEl) return;

        const sb = new ScrollBooster({
            viewport: trackEl,
            content: contentEl,
            direction: 'horizontal',
            scrollMode: 'transform',
            inputsFocus: false,
            onClick: (_state, event) => {
                const tab = (event.target as HTMLElement).closest<HTMLElement>('[role="tab"]');
                if (!tab || event.defaultPrevented || !tab.dataset.index) return;

                activeIndex = Number(tab.dataset.index);
                sb.scrollIntoView(tab, { align: 'center' });
            },
        });

        return () => sb.destroy();
    });
</script>

{#snippet thumbnailBlock()}
    {#if activeTab?.thumbnail}
        <div class="tabbed-content--thumbnail rounded-2xl overflow-hidden">
            <picture>
                <img
                    src={activeTab.thumbnail.node.sourceUrl}
                    alt={activeTab.thumbnail.node.altText}
                    width={activeTab.thumbnail.node.mediaDetails.width}
                    height={activeTab.thumbnail.node.mediaDetails.height}
                    class="h-auto w-full"
                />
            </picture>
        </div>
    {/if}
{/snippet}

{#snippet titleBlock()}
    {#if title}
        <h2 class="text-text-light tabbed-content--title text-fluid-l font-secondary font-bold md:font-medium uppercase">
            {title}:
        </h2>
    {/if}
{/snippet}

{#snippet subTitleBlock()}
    {#if activeTab?.title}
        <h3 class="tabbed-content--sub-title text-brand-1 text-fluid-l font-secondary font-bold md:font-medium uppercase">
            {activeTab.title}
        </h3>
    {/if}
{/snippet}

{#snippet tabDescriptionBlock()}
    {#if activeTab?.description}
        <div class="tabbed-content--tab-description text-text-light font-primary font-light">
            {@html activeTab.description}
        </div>
    {/if}
{/snippet}

{#snippet buttonCarouselMobile()}
    <div class="tabbed-content--button-carousel">
        <div
            role="tablist"
            aria-label="Content tabs"
            class="tabbed-content--button-carousel__track"
            bind:this={trackEl}
        >
            <div class="tabbed-content--button-carousel__content" bind:this={contentEl}>
                {#each tabs as tab, i (i)}
                    <button
                        type="button"
                        role="tab"
                        id="tab-{i}"
                        data-index={i}
                        aria-selected={i === activeIndex}
                        aria-controls="panel-{i}"
                        tabindex="0"
                        class="button--outline text-fluid-xs font-primary font-medium {i === activeIndex ? 'active' : ''}"
                    >
                        <span>
                            {tab.title}
                        </span>
                    </button>
                {/each}
            </div>
        </div>
    </div>
{/snippet}

{#snippet buttonCarouselDesktop()}
    <div
        role="tablist"
        aria-label="Content tabs"
        class="tabbed-content--button-column"
    >
        {#each tabs as tab, i (i)}
            <button
                type="button"
                role="tab"
                id="tab-{i}"
                data-index={i}
                aria-selected={i === activeIndex}
                aria-controls="panel-{i}"
                tabindex="0"
                onclick={() => (activeIndex = i)}
                class="button--outline text-fluid-xs font-primary font-medium {i === activeIndex ? 'active' : ''}"
            >
                <span>
                    {tab.title}
                </span>
            </button>
        {/each}
    </div>
{/snippet}

{#snippet tabPanelBlock()}
    {#if activeTab}
        <div
            id="panel-{activeIndex}"
            role="tabpanel"
            aria-labelledby="tab-{activeIndex}"
            tabindex="0"
            class="tabbed-content--grid-container font-primary"
        >
            <div>
                {#if activeTab.featureList.length}
                    <ul class="grid text-text-light tabbed-content--list-grid">
                        {#each activeTab.featureList as item, i(i)}
                            <li>
                                <h4 class="tabbed-content--list-grid__title font-mono border-b-white/50;">
                                    <span>{item.title}</span>
                                </h4>
                                <div class="tabbed-content--list-grid__description">
                                    {@html item.description}
                                </div>
                            </li>
                        {/each}
                    </ul>
                {/if}
            </div>
        </div>
    {/if}
{/snippet}

<section class="tabbed-content max-w-component mx-auto p-gutter">
    {#if isDesktop}
        {@render buttonCarouselDesktop()}
        <div class="tabbed-content--desktop-panel">
            {@render titleBlock()}
            <div class="tabbed-content--desktop-panel__intro">
                {@render thumbnailBlock()}
                <div class="tabbed-content--desktop-panel__intro__content">
                    {@render subTitleBlock()}
                    {@render tabDescriptionBlock()}
                </div>
            </div>
            {@render tabPanelBlock()}
        </div>
    {:else}
        {@render thumbnailBlock()}
        {@render titleBlock()}
        {@render subTitleBlock()}
        {@render tabDescriptionBlock()}
        {@render buttonCarouselMobile()}
        {@render tabPanelBlock()}
    {/if}
</section>

<style>
	.tabbed-content {
		.tabbed-content--thumbnail {
			aspect-ratio: 407 / 265;
            margin-bottom: 3.1875rem;
		}
        .tabbed-content--sub-title {
            margin-bottom: .5rem;
        }
		.tabbed-content--tab-description {
			line-height: 1.65;
			letter-spacing: -0.025em;
            margin-bottom: 2.25rem;
		}
		.tabbed-content--button-carousel {
			position: relative;
			width: 100%;
			margin: 0 auto;
			overflow: visible;
			width: calc(100% + var(--raw-spacing-gutter-right) + var(--raw-spacing-gutter-left));
			transform: translateX(calc( var(--raw-spacing-gutter-left) * -1));
            margin-bottom: 4.375rem;
			.tabbed-content--button-carousel__track {
				overflow: hidden;
				.tabbed-content--button-carousel__content {
					display: inline-flex;
					gap: 1.125rem;
					padding-left: var(--raw-spacing-gutter-left);
					padding-right: var(--raw-spacing-gutter-right);

					button {
						flex: 0 0 auto;
					}
				}
			}
		}

		.tabbed-content--list-grid {
			li {
				margin-bottom: 3.125rem;
				text-transform: uppercase;
				.tabbed-content--list-grid__title {
					font-size: 1.375rem;
					line-height: .86;
					letter-spacing: -0.025em;
					border-bottom-width: 0.0625rem;
					padding-bottom: 1.4375rem;
					margin-bottom: 1.68rem;
				}
				.tabbed-content--list-grid__description {
					font-size: var(--text-tabbed-content-description);
					line-height: 1.6;
					letter-spacing: -0.025em;
				}
			}
		}
	}

	@media (min-width: 768px) {
		.tabbed-content {
            
			display: flex;
			gap: clamp(2rem, 12vw, 12rem);
			.tabbed-content--desktop-panel__intro {
				display: flex;
				flex-direction: row;
				gap: 1.875rem;
				container-type: inline-size;
				margin-bottom: clamp(5rem, 11vw, 7.125rem);
			}

			.tabbed-content--thumbnail {
				flex: 0 1 clamp(13rem, 40cqi, 25.43rem);
				overflow: hidden;
                margin-bottom: 0;
			}
			.tabbed-content--desktop-panel__intro__content {
				container-type: inline-size;
				width: 100%;
				flex: 1 1 max-content;
			}
			.tabbed-content--sub-title {
				--text-fluid-l: clamp(2rem, 13.5cqi, 8rem);
			}

			.tabbed-content--button-column {
				display: flex;
				flex-direction: column;
				align-items: flex-start;
				margin-right: auto;
				button {
					width: auto;
					margin-bottom: clamp(2rem, 5vw, 3.25rem);
                    height: 4.875rem;
				}
				button:last-child {
					margin-bottom: 0;
				}
			}

			.tabbed-content--tab-description {
				max-width: 25.43rem;
                margin-bottom: 0;
			}

			.tabbed-content--grid-container {
				width: 100%;
			}

			.tabbed-content--list-grid {
				display: grid;
				grid-template-columns: repeat(auto-fit, minmax(max(16.25rem, calc((100% - (1.875rem * 2)) / 3)), 1fr));
				gap: 1.875rem;
			}
		}
	}
</style>
