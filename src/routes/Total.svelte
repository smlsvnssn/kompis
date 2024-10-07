<script>
	import * as ö from 'ouml'
	import {fade} from 'svelte/transition'

	import CopyIcon from './CopyIcon.svelte'

	let { personer } = $props()

	let totalUtgift = $derived(ö.pipe(ö.map(personer, 'utgift'), ö.sum))
	let totalInkomst = $derived(ö.pipe(ö.map(personer, 'inkomst'), ö.sum))

	let checksAndBalances = $derived(
		personer.map((person, i) => ({
			namn: person.namn ? person.namn : `Person ${i + 1}`,
			summa: (person.inkomst / totalInkomst) * totalUtgift - person.utgift
		}))
	)

	const betalaTill = (person, skaFåBetalt) => {
		person.skaBetalaTill = []

		for (let p of skaFåBetalt) {
			if (p.summa > 0) {
				if (p.summa <= person.summa) {
					person.skaBetalaTill.push({ namn: p.namn, summa: p.summa })
					person.summa -= p.summa
					p.summa = 0
				} else {
					person.skaBetalaTill.push({ namn: p.namn, summa: person.summa })
					p.summa -= person.summa
					person.summa = 0
				}
			}
			if (person.summa == 0) break
		}

		return person
	}

	let output = $derived.by(() => {
		const normaliseSum = (p) => ({ ...p, summa: ö.round(Math.abs(p.summa), 2) })

		let skaBetala = ö.clone(
			checksAndBalances
				.filter((person) => person.summa > 0)
				.sort((a, b) => b.summa - a.summa)
				.map(normaliseSum)
		)

		let skaFåBetalt = ö.clone(
			checksAndBalances
				.filter((person) => person.summa < 0)
				.sort((a, b) => a.summa - b.summa)
				.map(normaliseSum)
		)

		return skaBetala.map((person) => betalaTill(person, skaFåBetalt))
	})

	const formatName = (name) => ö.pipe(name, ö.stripTags, ö.capitalise)
	const formatAmount = (n) =>
		ö.pipe(n, ö.prettyNumber, (n) => `<span class=amount>${n}</span>`)

	let formatted = $derived(
		output.reduce(
			(out, person, i, a) =>
				(out += `${formatName(person.namn)} ska betala ${person.skaBetalaTill.reduce(
					(out, person, i, a) =>
						(out += `${formatAmount(person.summa)} till ${formatName(person.namn)}${ö.when(
							i < a.length - 1,
							' och '
						)}`),
					''
				)}${
					i < a.length - 2 ? ', '
					: i < a.length - 1 ? ', och '
					: '.'
				}`),
			''
		)
	)

	let textTotal
	let textSkaBetala
	let textIsCopied = $state(false)

	const copy = () => {
		navigator.clipboard.writeText(
			`${ö.stripTags(textTotal.innerHTML)}
${ö.stripTags(textSkaBetala.innerHTML)}`
		)
		textIsCopied = true
		setTimeout(() => (textIsCopied = false), 600)
	}
</script>

<a href="#" class="card {ö.when(textIsCopied, 'copied')}" onclick={copy} aria-label="Kopiera">
	<div class="total" bind:this={textTotal}>
		<span class="label">Total utgift: </span>

		{#if textIsCopied}
			<span class="label" transition:fade={{duration: 300}}>Texten kopierad!</span>
		{/if}

		<div class="totalAmount">
			{ö.prettyNumber(totalUtgift)}
			<div class="copy">
				<CopyIcon />
			</div>
		</div>
	</div>
	{#if totalUtgift > 0}
		<div bind:this={textSkaBetala}>
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
		transition: all .6s;

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

			&.editing {
				position: absolute;
				right: 1.5rem;
				top: 2.875rem;
			}

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
