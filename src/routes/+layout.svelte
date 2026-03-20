<!-- <script lang="ts">
	import './layout.css';

	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children()} -->

<!-- ======================== Sidebar Fixed Code Below -->

<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<!-- ✅ Global Layout Wrapper -->
<div class="flex h-screen bg-[#0A0914] text-white">
	{@render children()}
</div>
