<script>
	import '../style.scss'
	import * as ö from 'ouml'
	import autoAnimate from '@formkit/auto-animate'

	import Intro from './Intro.svelte'
	import Header from './Header.svelte'
	import PersonCard from './PersonCard.svelte'
	import Total from './Total.svelte'
	import AddPerson from './AddPerson.svelte'
	import Dialog from './Dialog.svelte'

	import { Person } from './räkna.svelte'

	/*
	Personer
	*/

	let defaults = ö.times(2, () => new Person())

	let personer = $state(
		ö.getLocal('personer')?.map(person => new Person(person)) ?? defaults
	)

	const addPerson = () => personer.push(new Person())

	$effect(() => {
		ö.setLocal(
			'personer',
			personer.map(({ namn, inkomst, utgift }) => ({ namn, inkomst, utgift }))
		)
	})

	/*
	Intro
	*/

	let hasSeenIntro = $state(ö.getLocal('hasSeenIntro') ?? false)

	const closeIntro = () => (hasSeenIntro = true)

	$effect(() => {
		ö.setLocal('hasSeenIntro', hasSeenIntro)
	})

	/*
	Modal
	*/

	let modalIsActive = $state(false)
	const openModal = () => (modalIsActive = true)
	const closeModal = () => (modalIsActive = false)
</script>

{#if modalIsActive}
	<Dialog {closeModal} />
{/if}

{#if !hasSeenIntro}
	<Intro onclick={closeIntro} />
{:else}
	<Header />

	<ul class="personer hasScrollShadows" use:autoAnimate>
		{#each personer as person}
			<PersonCard {person} bind:personer />
		{/each}
	</ul>

	<div class="total">
		<Total {personer} />

		<div class="footer">
			<a href="#" class="info" onclick={openModal}>Så funkar det</a>
			<AddPerson onclick={addPerson} />
		</div>
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

		.footer {
			display: flex;
			justify-content: space-between;
			align-items: center;

			.info {
				display: flex;
				gap: 0.5rem;

				font-family: var(--display);
				font-weight: 600;
				font-size: 0.875rem;
			}
		}
	}
</style>
