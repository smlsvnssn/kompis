<script>
	import KamratKompis from './KamratKompis.svelte'

	let { modal = $bindable(), closeModal } = $props()
</script>

<dialog bind:this={modal}>
	<KamratKompis />
	<h1>Så funkar Kamrat Kompis®</h1>
	<p>
		I vanliga fall, när du ska dela på en krognota, på månadens utgifter, eller
		på ett bilköp, gör du det förmodligen lätt för dig. Ni är kanske två som ska
		dela, så ni delar på hälften. Eller så är ni tre, kliar er lite i huvudet,
		och lyckas dela jämnt på tre.
	</p>
	<p>
		Kamrat Kompis® gör lite annorlunda, men det är lika lätt! Du får fylla i inkomst för alla som ska
		dela, och vem som lagt ut vad. Sedan ser Kamrat Kompis® till att alla får betala i proportion
		till sin andel av den totala inkomsten, minus dina egna utgifter förstås.
		(Vilken sorts inkomst spelar ingen roll, det kan vara månadsinkomst,
		årsinkomst, total förmögenhet eller vad du vill, bara det är samma sorts
		inkomst för alla.)
	</p>
	<p>
		Ni får en praktisk lista på vem som ska betala vad till vem, som går att kopiera för att skicka i ett sms eller en chatt. Sedan är det bara att swisha, eller plocka fram sedelbuntarna. Lycka till!
	</p>

	<button
		onclick={closeModal}
		type="button"
		class="btn btn-primary btn-sm-block"
	>
		Toppen, jag fattar!
	</button>
</dialog>

<style lang="scss">
	dialog {
		border-radius: 0.5rem;
		border: none;
		padding: 1.5rem;
		inset: 1rem;

		max-width: 30rem;
		filter: drop-shadow(0px 6px 6px rgba(0, 0, 0, 0.1))
			drop-shadow(0px 1px 1px rgba(0, 0, 0, 0.1));

		transition: display 0.3s allow-discrete;
		animation: close 0.3s forwards;

		background: #fffe;
		color: var(--secondary);

		display: grid;
		justify-items: center;
		gap: 0.5rem;

		h1 {
			margin: 0;
		}

		p {
			width: 100%;
			font-size: 0.875rem;
		}

		&[open] {
			animation: open 0.3s forwards;
		}

		button {
			margin: auto;
			margin-top: 1rem;
			margin-bottom: .25rem;
			display: block !important;
		}

		&::backdrop {
			background: #0003;
			backdrop-filter: blur(0.5rem);
		}
	}

	@keyframes open {
		from {
			opacity: 0;
			scale: 0.95;
			translate: 0 2rem;
		}
		to {
			opacity: 1;
		}
	}

	@keyframes close {
		from {
			opacity: 1;
		}
		to {
			opacity: 0;
			scale: 0.95;
			translate: 0 2rem;
		}
	}
</style>
