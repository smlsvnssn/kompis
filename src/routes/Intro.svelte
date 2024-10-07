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
		Hej! Kamrat Kompis® förenklar din vardagsekonomi genom att låta dig, din
		familj och dina kompisar dela rättvist på notan, hyran, bilen eller båten.
		Alla bidrar efter förmåga, och får tillbaka efter behov.
	</p>
	<p>
		Fyll bara i ditt namn, och namnen på dem du vill dela med. Därefter fyller
		du i inkomster (till exempel månadsinkomst) och utgifter för var och en, och
		får direkt summan var och en ska betala. Enkelt!
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

	.intro {
		display: grid;
		gap: 1.5rem;

		grid-row: 2 / 2;
		align-self: center;

		height: fit-content;
		padding: 1rem;
	}
</style>
