<script>
	import KamratKompis from './KamratKompis.svelte'

	let handlers = $props()
</script>

<div class="intro">
	<div class="kompis">
		<KamratKompis />
	</div>

	<h1>Kamrat Kompis®</h1>
	<p>
		Hej kamrat! Kamrat Kompis® förenklar din vardagsekonomi genom att låta var
		och en bidra efter förmåga, och få tillbaka efter behov. Det är jättelätt
		att komma igång!
	</p>
	<button {...handlers}> Kom igång </button>
</div>

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
