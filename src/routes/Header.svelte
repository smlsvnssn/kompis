<script>
	import * as ö from 'ouml'
	import autoAnimate from '@formkit/auto-animate'
	import { fly, fade } from 'svelte/transition'

	import KamratKompis from './KamratKompis.svelte'

	let { personer } = $props()

	let hasSeenBubble = $state(ö.getLocal('hasSeenBubble') ?? false)

	$effect(() => {
		// Sets to true when list has seen two named persons
		if (personer.filter(({ namn }) => namn.length).length >= 2)
			ö.setLocal('hasSeenBubble', true)
	})

	let bubbleManuallyActivated = $state(false)

	const toggleBubble = () =>
		(bubbleManuallyActivated = !bubbleManuallyActivated)

	let showBubble = $derived(
		(!hasSeenBubble && personer.filter(({ namn }) => namn.length).length < 2) ||
			bubbleManuallyActivated
	)
</script>

<div class="infoBox" use:autoAnimate>
	{#if showBubble}
		<div class="bubble" in:fly={{ y: -400, opacity: 0 }}>
			<div class="card">
				<p>Det ska vara enkelt att dela rättvist!</p>
				<p>Fyll i ditt namn, och namnen på dem du vill dela med.</p>
				<p>
					Därefter fyller du i inkomster och utgifter för var och en, och får
					direkt summan var och en ska betala. Enkelt!
				</p>
			</div>

			<svg width="40" height="40" viewBox="0 0 40 40">
				<path
					d="M40 40C12.6061 40 0 15.7576 0 0H40C19.3939 20.9091 36.1616 38.1818 40 40Z"
				/>
			</svg>
		</div>
	{/if}

	<a href="#" aria-label="info" onclick={toggleBubble} class="kompis">
		{#if showBubble}
			<span />
		{:else}
			<span transition:fade>Kamrat Kompis®</span>
		{/if}
		<KamratKompis size="48" />
	</a>
</div>

<style lang="scss">
	.infoBox {
		//display: grid;
		justify-items: end;
		margin-bottom: -0.5rem;

		.kompis {
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: space-between;

			color: var(--white);
			font-family: var(--display);
			font-weight: 600;
			text-decoration: none;
		}

		.bubble {
			--boxBg: rgba(255, 255, 255, 0.95);

			display: grid;
			justify-items: end;

			.card {
				color: var(--secondary);
				background: var(--boxBg);
				margin-bottom: 0;
				padding: 1.5rem;
			}
			svg {
				margin-right: 4rem;
				margin-bottom: -1rem;
				path {
					fill: var(--boxBg);
				}
			}
		}
	}
</style>
