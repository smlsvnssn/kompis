<script>
	import Intro from './Intro.svelte'

	import '../style.scss'
	import * as ö from 'ouml'
	import autoAnimate from '@formkit/auto-animate'

	import Header from './Header.svelte'
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

	const addPerson = () => personer.push(new Person())

	$effect(() =>
		ö.setLocal(
			'personer',
			personer.map(({ namn, inkomst, utgift }) => ({ namn, inkomst, utgift }))
		)
	)

	let hasSeenIntro = $state(false)

	$effect(() => ö.setLocal('hasSeenIntro', hasSeenIntro))
</script>

{#if !hasSeenIntro}
	<Intro onclick={() => (hasSeenIntro = true)} />
{:else}
	<Header {personer} />

	<ul class="personer hasScrollShadows" use:autoAnimate>
		{#each personer as person}
			<PersonCard {person} bind:personer />
		{/each}
	</ul>

	<div class="total">
		<Total {personer} />
		<AddPerson onclick={addPerson} />
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

	.personer {
		width: 100%;
		overflow: scroll;
		margin-top: -.5rem;
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
