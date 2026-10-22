
<script lang="ts">
	import type { VideoPlayerLayout } from '#lib/types/builder.ts';
	let { title, videoLink, thumbnail }: VideoPlayerLayout = $props();
</script>

<section class="max-w-component p-gutter mx-auto video-player">
    <div class="video-player--container md:border-b border-white/50 md:pb-16">
        <div class="relative z-20 text-text-light text-fluid-xl font-secondary font-bold uppercase video-player--heading -mb-video-player-heading">
            {@html title}
        </div>
        <div class="relative z-10 grid grid-cols-1 grid-rows-1 video-player--body">
            <div class="flex relative z-20 col-start-1 row-start-1">
                <a class="video-player--button 
                flex text-black 
                bg-brand-1 
                mx-auto 
                self-center 
                text-center 
                items-center 
                justify-center 
                font-medium
                font-primary
                uppercase" 
                href={videoLink.url} 
                target={videoLink.target || undefined}>
                    <span>{videoLink.title}</span>
                </a>
            </div>
            <picture class="relative z-10 col-start-1 row-start-1">
                <img
                    src={thumbnail.node.sourceUrl}
                    alt={thumbnail.node.altText}
                    width={thumbnail.node.mediaDetails.width}
                    height={thumbnail.node.mediaDetails.height}
                />
            </picture>
        </div>
    </div>
</section>

<style>

	.video-player--button {
		width: clamp(4rem, 11vw,10rem);
		height: clamp(4rem, 11vw,10rem);
		border-radius: 999rem;
		font-size: clamp(.75rem, 2vw, 1rem);

		span {
			line-height: 1;
		}
	}
</style>
