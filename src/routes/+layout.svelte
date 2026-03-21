<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import Sidebar from '../components/layout/Sidebar.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="flex h-screen bg-[#0A0914] text-white overflow-hidden">
	<!-- Sidebar -->
	<Sidebar />

	<!-- Main Content -->
	<main class="flex-1 overflow-y-auto">
		{@render children()}
	</main>
</div>
