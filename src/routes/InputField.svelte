<script>
	let { label, value = $bindable(), type = 'text', ...handlers } = $props()

	const selectOnfocus = (e) => e.target.select()
</script>

<div>
	<label for={label}>{label}</label>
	<input
		{type}
		id={label}
		inputmode={type == 'number' ? 'numeric' : 'text'}
		bind:value
		onfocus={selectOnfocus}
		{...handlers}
	/>
</div>

<style lang="scss">
	div {
		width: 100%;
		display: grid;
		gap: 0.125rem;

		label {
			color: var(--white);

			font-family: var(--display);
			font-weight: 600;
			font-size: 0.875rem;
		}

		input {
			padding: 0.75rem;
			border-radius: 8px;
			border: 1px solid var(--white);
			background: transparent;
			color: var(--white);
			font-size: 1rem;

			width: clamp(5rem, 100%, 100%);

			transition: all 0.3s;

			appearance: none;

			&::-webkit-outer-spin-button,
			&::-webkit-inner-spin-button {
				-webkit-appearance: none;
			}

			&:hover,
			&:focus {
				border-color: var(--primary);
			}
			&:focus {
				outline: none;
			}
		}
	}
</style>
