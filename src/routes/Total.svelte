<script>
	import * as ö from 'ouml'
	import { fade } from 'svelte/transition'
	import { getTransactions, formatTransactions } from './räkna.svelte'

	import CopyIcon from './CopyIcon.svelte'

	let { personer } = $props()

	let totalUtgift = $derived(ö.pipe(ö.map(personer, 'utgift'), ö.sum))

	let transaktioner = $derived(getTransactions(personer))

	let formatted = $derived(formatTransactions(transaktioner))

	let textTotal
	let textIsCopied = $state(false)

	const copyText = () => {
		navigator.clipboard.writeText(
			textTotal.innerText.replace('\n', ' ') + '\n' + formatted
		)

		textIsCopied = true
		setTimeout(() => (textIsCopied = false), 600)
	}
</script>

<a
	href="#"
	class="card {ö.when(textIsCopied, 'copied')}"
	onclick={copyText}
	aria-label="Kopiera"
>
	<div class="total" bind:this={textTotal}>
		<span class="label">Total utgift: </span>

		{#if textIsCopied}
			<span class="label" transition:fade={{ duration: 300 }}>
				Texten kopierad!
			</span>
		{/if}

		<div class="totalAmount">
			{ö.prettyNumber(totalUtgift)}
			<div class="copy">
				<CopyIcon />
			</div>
		</div>
	</div>
	{#if totalUtgift > 0}
		<div>
			{@html formatted}
		</div>
	{/if}
</a>

<style lang="scss">
	.card {
		grid: auto-flow / 1fr;
		font-family: var(--display);
		font-weight: 600;
		font-size: 1.25rem;

		color: var(--white);
		text-decoration: none;
		transition: all 0.6s;

		:global(span.amount) {
			font-weight: 800;
			color: var(--primary);
			//font-size: 1.75rem;
		}

		&.copied {
			scale: 1.03;
			background: rgba(255, 255, 255, 0.3);
		}

		.copy {
			padding: 0.375rem;
			background: rgba(255, 255, 255, 0.3);
			border-radius: 100%;

			height: fit-content;

			transition: all 0.3s;

			&:hover {
				scale: 1.1;
			}

			svg {
				display: block;

				rect {
					fill: var(--secondary);
				}
			}
		}

		.total {
			display: flex;
			justify-content: space-between;
			align-items: center;

			padding-bottom: 0.5rem;
			border-bottom: 1px solid var(--white);

			.label {
				font-size: 0.875rem;
			}

			a {
				text-decoration: none;
				color: var(--white);
			}
		}

		.totalAmount {
			display: flex;
			gap: 0.5rem;
		}
	}
</style>
