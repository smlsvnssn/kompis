<script>
	let props = $props()
</script>

<a href="#" {...props}>
	Lägg till person
	<div>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
		>
			<rect y="11" width="24" height="2" />
			<rect x="13" width="24" height="2" transform="rotate(90 13 0)" />
		</svg>
	</div>
</a>

<style lang="scss">
	a {
		display: flex;
		align-items: center;
		gap: 0.5rem;

		width: fit-content;
		justify-self: end;

		text-decoration: none;
		color: var(--white);
		font-family: var(--display);
		font-weight: 600;
		font-size: 0.875rem;

		div {
			transition: all 0.3s;
			background: var(--primary);
			padding: 0.5rem;
			width: fit-content;
			border-radius: 100%;

			&:hover {
				scale: 1.1;
			}

			rect {
				fill: var(--secondary);
			}
		}
	}
</style>
