<script>
	import '../style.scss'
	import * as ö from 'ouml'
	import autoAnimate from '@formkit/auto-animate'

	import KamratKompis from './KamratKompis.svelte'
	import InfoBox from './InfoBox.svelte'
	import PersonCard from './PersonCard.svelte'
	import Total from './Total.svelte'
	import AddPerson from './AddPerson.svelte'

	class Person {
		constructor({ namn = '', inkomst = 0, utgift = 0 } = {}) {
			this.namn = namn
			this.inkomst = inkomst
			this.utgift = utgift
		}
		namn = $state()
		inkomst = $state()
		utgift = $state()
	}

	let personer = $state(
		ö.getLocal('personer')?.map((person) => new Person(person)) ??
			ö.times(2, () => new Person())
	)

	$effect(() =>
		ö.setLocal(
			'personer',
			personer.map(({ namn, inkomst, utgift }) => ({ namn, inkomst, utgift }))
		)
	)

	let hasSeenIntro = $state(ö.getLocal('hasSeenIntro') ?? false)

	$effect(() => ö.setLocal('hasSeenIntro', hasSeenIntro))
</script>

{#if !hasSeenIntro}
	<div class="intro">
		<div class="kompis">
			<KamratKompis />
		</div>

		<h1>Kamrat Kompis®</h1>
		<p>
			Hej kamrat! Kamrat Kompis® förenklar din vardagsekonomi genom att låta
			var och en bidra efter förmåga, och få tillbaka efter behov. Det är
			jättelätt att komma igång!
		</p>
		<button onclick={() => (hasSeenIntro = true)}> Kom igång </button>
	</div>
{:else}
	<InfoBox {personer} />

	<ul class="persons hasScrollShadows" use:autoAnimate>
		{#each personer as person}
			<PersonCard {person} bind:personer />
		{/each}
	</ul>

	<div class="total">
		<Total {personer} />
		<AddPerson onclick={() => personer.push(new Person())} />
	</div>
{/if}

<style lang="scss">
	.kompis,
	button,
	h1,
	p {
		margin: auto;
		width: fit-content;
		display: block;
	}

	.persons {
		width: 100%;
		overflow: scroll;
	}

	.intro {
		display: grid;
		gap: 1.5rem;

		grid-row: 2 / 2;
		align-self: center;

		height: fit-content;
		padding: 1rem;
	}

	.total {
		display: grid;
		gap: 1.5rem;

		position: sticky;
		bottom: 0;
	}
</style>
