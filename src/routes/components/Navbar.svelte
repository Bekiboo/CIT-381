<script lang="ts">
	import { page } from '$app/stores';
	$: currentPage = $page.url.pathname;

	let barWidth: number;
	let barTranslate: number;

	let linksWrapper: HTMLElement;
	let currentLink: HTMLElement;

	const LINKS = [
		{ name: 'OCR', href: '/OCR' },
		{ name: 'Shifumi', href: '/shifumi' }
	];

	$: {
		if (currentLink) {
			barWidth = currentLink.clientWidth;
			barTranslate = currentLink.offsetLeft;
		}
	}
</script>

<nav class="absolute w-screen h-16 flex justify-between items-center bg-slate-300 p-2">
	<a class="logo-link" href="/">
		CIT-381
		<h1>Julien Connault</h1>
	</a>

	<div class="relative">
		<!-- Top Bar -->
		<span
			class="absolute h-1 -top-1 bg-orange-500 duration-300 ease-in-out"
			style="width: {barWidth}px; translate: {barTranslate}px;"
			aria-hidden="true"
		/>

		<!-- Bottom Bar -->
		<span
			class="absolute h-1 -bottom-1 bg-orange-500 duration-300 ease-in-out"
			style="width: {barWidth}px; translate: {barTranslate}px;"
			aria-hidden="true"
		/>

		<!-- Links -->
		<div class="flex gap-5 font-bold" bind:this={linksWrapper}>
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

<style>
	a {
		display: inline-block;
	}

	.active {
		color: #f80;
	}
</style>
