<script>
	import * as ö from 'ouml'

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
</script>

<div class="card">
	<div class="total">
		<span class="label">Total utgift: </span>
		{ö.prettyNumber(totalUtgift)}
	</div>
	{#if totalUtgift > 0}
		<div>
			{@html formatted}
		</div>
	{/if}
</div>

<style lang="scss">
	.card {
		grid: auto-flow / 1fr;
		font-family: var(--display);
		font-weight: 600;
		font-size: 1.5rem;

		:global(span.amount) {
			font-weight: 800;
			color: var(--primary);
			//font-size: 1.75rem;
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
	}
</style>
