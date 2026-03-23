<script lang="ts">
	import { onMount, onDestroy } from 'svelte';

	const roles = [
		'Fullstack Developer',
		'Freelancer',
		'Freshworks Marketplace App Developer'
	];

	let displayText = $state('');
	let roleIndex = $state(0);
	let charIndex = $state(0);
	let isDeleting = $state(false);
	let isPaused = $state(false);
	let show = $state(false);

	// ✅ Track timers (FIX)
	let timers: ReturnType<typeof setTimeout>[] = [];

	function safeTimeout(fn: () => void, delay: number) {
		const t = setTimeout(fn, delay);
		timers.push(t);
	}

	function typeEffect() {
		const currentRole = roles[roleIndex];

		if (isPaused) {
			isPaused = false;
			safeTimeout(typeEffect, 1200);
			return;
		}

		if (!isDeleting && charIndex <= currentRole.length) {
			displayText = currentRole.slice(0, charIndex);
			charIndex++;

			if (charIndex > currentRole.length) {
				isPaused = true;
				safeTimeout(typeEffect, 1200);
				return;
			}

			safeTimeout(typeEffect, 100);
		} else if (isDeleting && charIndex >= 0) {
			displayText = currentRole.slice(0, charIndex);
			charIndex--;

			if (charIndex < 0) {
				isDeleting = false;
				roleIndex = (roleIndex + 1) % roles.length;
				charIndex = 0;
				safeTimeout(typeEffect, 300);
				return;
			}

			safeTimeout(typeEffect, 50);
		} else {
			isDeleting = true;
			safeTimeout(typeEffect, 50);
		}
	}

	onMount(() => {
		typeEffect();

		// same animation trigger (UNCHANGED)
		safeTimeout(() => {
			show = true;
		}, 100);
	});

	// ✅ CLEANUP (this was missing — FIXES BREAK ISSUES)
	onDestroy(() => {
		timers.forEach(clearTimeout);
	});
</script>

<!-- ✅ SEO (safe, no behavior impact) -->
<svelte:head>
	<meta name="keywords" content="Fullstack Developer, MERN Stack Developer, React Developer, Freelancer India" />
</svelte:head>

<!-- 🔒 YOUR UI (UNCHANGED) -->
<section
	id="home"
	class="relative h-screen w-full flex items-center justify-start text-left text-white overflow-hidden"
>
	<div
		class="absolute inset-0 bg-cover bg-center scale-105 transition-transform duration-2000"
		class:scale-105={!show}
		class:scale-100={show}
		style="background-image: url('/hero-image.jpg');"
	></div>

	<div class="absolute inset-0 bg-black/80"></div>

	<div
		class="relative z-10 px-10 md:px-20 transition-all duration-700"
		class:opacity-0={!show}
		class:translate-y-10={!show}
		class:opacity-100={show}
		class:translate-y-0={show}
	>
		<h1 class="text-4xl md:text-6xl font-bold mb-4">
			Nagamanickam S
		</h1>

		<p class="text-lg md:text-2xl text-gray-300">
			I'm a
			<span class="text-white font-semibold ml-1">
				{displayText}
			</span>
			<span class="cursor"></span>
		</p>

		<!-- ✅ SEO boost (invisible) -->
		<p class="sr-only">
			Nagamanickam S is a Fullstack Developer, Freelancer, and Freshworks Marketplace App Developer specializing in React, Node.js, and MERN stack.
		</p>
	</div>
</section>

<style>
	.cursor {
		display: inline-block;
		width: 2px;
		height: 1.2em;
		background-color: white;
		margin-left: 2px;
		animation: blink 0.7s infinite;
		vertical-align: text-bottom;
	}

	@keyframes blink {
		0%, 50% { opacity: 1; }
		51%, 100% { opacity: 0; }
	}
</style>