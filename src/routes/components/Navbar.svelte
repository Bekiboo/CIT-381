<script lang="ts">
	import { page } from '$app/stores';
	$: currentPage = $page.url.pathname;

	let barWidth: number;
	let barTranslate: number;

	let linksWrapper: HTMLElement;
	let currentLink: HTMLElement;

	const LINKS = [
		{ name: 'OCR', href: '/OCR' },
		{ name: 'Shifumi', href: '/shifumi' },
		{ name: 'TensorFlow', href: '/tensorflow' }
	];

	$: {
		if (currentLink) {
			barWidth = currentLink.clientWidth;
			barTranslate = currentLink.offsetLeft;
		}
	}
</script>

{barWidth}
<nav class="flex justify-between items-center bg-slate-300 p-2">
	<a class="logo-link" href="/">
		CIT-381
		<h1>Julien Connault</h1>
	</a>

	<div class="relative">
		<!-- Top Bar -->
		<span
			class="absolute h-2 bg-orange-500"
			style="width: {barWidth}px; translate: {barTranslate}px;"
			aria-hidden="true"
		/>

		<!-- Bottom Bar -->
		<span class="" style="width: {barWidth}px; translate: {barTranslate}px;" aria-hidden="true" />

		<!-- Links -->
		<div class="links-wrapper" bind:this={linksWrapper}>
			{#each LINKS as link}
				{#if link.href === currentPage}
					<a
						class:active={currentPage === link.href}
						href={link.href}
						bind:this={currentLink}
						aria-current={currentPage === link.href ? 'page' : undefined}>{link.name}</a
					>
				{:else}
					<a href={link.href}>{link.name}</a>
				{/if}
			{/each}
		</div>
	</div>
</nav>
