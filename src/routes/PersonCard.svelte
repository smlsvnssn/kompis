<script>
	import InputField from './InputField.svelte'
	import autoAnimate from '@formkit/auto-animate'
	import * as ö from 'ouml'

	let { person, personer = $bindable() } = $props()

	let isEditingName = $state(person.namn ? false : true)

	const removePerson = () => (personer = personer.filter((v) => v != person))
</script>

<li class="card">
	<div class="namn">
		{#if isEditingName}
			<InputField
				label="Namn"
				bind:value={person.namn}
				onfocusout={() => person.namn && (isEditingName = false)}
			/>
		{:else}
			<a href="#" onclick={() => (isEditingName = true)}
				>{ö.capitalise(person.namn)}</a
			>

			<a
				href="#"
				class="removePerson"
				onclick={removePerson}
				aria-label="Ta bort"
			>
				<svg width="12" height="13" viewBox="0 0 12 13">
					<rect y="5.5" width="12" height="2" />
				</svg>
			</a>
		{/if}
	</div>

	<InputField label="Inkomst" type='number' bind:value={person.inkomst} />
	<InputField label="Utgift" type='number' bind:value={person.utgift} />
</li>

<style lang="scss">
	.card {
		grid: auto-flow / 1fr 1fr;

		margin-bottom: 1rem;

		.namn {
			grid-column: span 2;
			font-family: var(--display);
			font-size: 1.5rem;
			font-weight: 600;
			display: flex;
			justify-content: space-between;
			align-items: center;

			a {
				text-decoration: none;
				color: var(--white);
			}

			.removePerson {
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
		}
	}
</style>
