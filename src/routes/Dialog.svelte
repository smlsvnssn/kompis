<script>
	import { fly } from 'svelte/transition'

	import KamratKompis from './KamratKompis.svelte'

	let { closeModal } = $props()

	let modalEl

	$effect(() => modalEl.focus())
</script>

<div
	class="backdrop"
	transition:fly
	role="button"
	tabindex="0"
	onclick={closeModal}
	onkeydown={e => {
		if (e.key == 'Escape') closeModal()
	}}
>
	<div
		class="modal"
		bind:this={modalEl}
		transition:fly={{ y: -100 }}
		role="button"
		tabindex="0"
		onclick={e => e.stopPropagation()}
		onkeydown={e => {
			if (e.key == 'Escape') closeModal()
		}}
	>
		<KamratKompis opacity="1" />
		<h1>Så funkar Kamrat Kompis®</h1>
		<p>
			I vanliga fall, när du ska dela på en krognota, på månadens utgifter,
			eller på ett bilköp, gör du det förmodligen lätt för dig. Ni är kanske två
			som ska dela, så ni delar på hälften. Eller så är ni tre, kliar er i
			huvudet, och lyckas dela jämnt på tre.
		</p>
		<p>
			Kamrat Kompis® gör lite annorlunda, men det är lika lätt! Du får fylla i
			inkomst för alla som ska dela, och vem som lagt ut vad. Sedan ser Kamrat
			Kompis® till att alla får betala i proportion till sin andel av den
			totala inkomsten, minus dina egna utgifter förstås. (Vilken sorts inkomst
			spelar ingen roll, det kan vara månadsinkomst, årsinkomst, total
			förmögenhet eller vad du vill, bara det är samma sorts inkomst för alla.)
		</p>
		<p>
			Så här till exempel: Berit har köpt ett kylskåp för 10 000. Arne och Berit
			vill dela rättvist på kostnaden. Arne tjänar 30 000 i månaden, och Berit
			tjänar 50 000. De skriver in sina uppgifter, och får veta att Arne ska
			betala 3 750 till Berit.
		</p>
		<p>
			Ni får en praktisk lista på vem som ska betala vad till vem, som går att
			kopiera för att skicka i ett sms eller en chatt. Sedan är det bara att
			swisha, eller plocka fram sedelbuntarna. Lycka till!
		</p>

		<button onclick={closeModal} type="button"> Toppen, jag fattar! </button>
		<p class="footer">
			Byggd med 🩸, 😅 & 😭 av
			<a href="https://lhli.net" target="_blank"> lhli.net </a>. 🄯 2024
		</p>
	</div>
</div>

<style lang="scss">
	.backdrop {
		background: #0003;
		backdrop-filter: blur(0.5rem);
		position: fixed;
		inset: 0;
		height: 100%;
		z-index: 100;
		padding: 1rem;
		overflow-y: scroll;

		display: grid;
		place-items: center;

		.modal {
			border-radius: 0.5rem;
			border: none;
			padding: 1.5rem;

			overflow-y: scroll;

			max-height: 100%;
			max-width: 30rem;
			filter: drop-shadow(0px 6px 6px rgba(0, 0, 0, 0.1))
				drop-shadow(0px 1px 1px rgba(0, 0, 0, 0.1));

			background: #fffe;
			color: var(--secondary);

			display: grid;
			justify-items: center;
			gap: 0.5rem;

			h1 {
				margin: 0;
				text-align: center;
			}

			p {
				width: 100%;
				font-size: 0.875rem;
			}

			.footer {
				margin-top: 2rem;
				text-align: center;
				font-size: 0.75rem;
				a {
					color: var(--secondary);
				}
			}

			button {
				margin: auto;
				margin-top: 1rem;
				margin-bottom: 0.25rem;
			}
		}
	}
</style>
