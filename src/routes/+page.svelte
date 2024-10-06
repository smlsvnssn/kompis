<script>
	import '../style.scss'
	import * as ö from 'ouml'
	import autoAnimate from '@formkit/auto-animate'

	import Intro from './Intro.svelte'
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

	let hasSeenIntro = $state(ö.getLocal('hasSeenIntro') ?? false)
	//let hasSeenIntro = $state(false)

	const closeIntro = () => (hasSeenIntro = true)

	$effect(() => ö.setLocal('hasSeenIntro', hasSeenIntro))
</script>

{#if !hasSeenIntro}
	<Intro onclick={closeIntro} />
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
	.personer {
		width: 100%;
		overflow: scroll;
		margin-top: -0.5rem;
	}

	.total {
		display: grid;
		gap: 1rem;

		position: sticky;
		bottom: 0;
	}
</style>
