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
			return;
		}

		if (isDeleting && charIndex >= 0) {
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
			return;
		}

		isDeleting = true;
		safeTimeout(typeEffect, 50);
	}

	onMount(() => {
		typeEffect();

		safeTimeout(() => {
			show = true;
		}, 100);
	});

	onDestroy(() => {
		timers.forEach(clearTimeout);
		timers = [];
	});
</script>

<svelte:head>
	<meta
		name="keywords"
		content="Fullstack Developer, MERN Stack Developer, React Developer, Node.js Developer, Freelancer India"
	/>
</svelte:head>

<!-- ✅ RESPONSIVE IMPROVED -->
<section
	id="home"
	class="relative min-h-screen w-full flex items-center justify-center md:justify-start text-center md:text-left text-white overflow-hidden"
>
	<!-- Background -->
	<div
		class="absolute inset-0 bg-cover bg-center scale-105 transition-transform duration-2000"
		class:scale-105={!show}
		class:scale-100={show}
		style="background-image: url('/hero-image.jpg');"
	></div>

	<!-- Overlay -->
	<div class="absolute inset-0 bg-black/80"></div>

	<!-- Content -->
	<div
		class="relative z-10 
		px-4 sm:px-6 md:px-12 lg:px-20 
		max-w-4xl
		transition-all duration-700"
		class:opacity-0={!show}
		class:translate-y-10={!show}
		class:opacity-100={show}
		class:translate-y-0={show}
	>
		<h1
			class="font-bold mb-4
			text-3xl sm:text-4xl md:text-5xl lg:text-6xl"
		>
			Nagamanickam S
		</h1>

		<p
			class="text-gray-300
			text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed"
		>
			I'm a
			<span
				class="text-white font-semibold ml-1 wrap-break-word"
				aria-live="polite"
			>
				{displayText}
			</span>
			<span class="cursor"></span>
		</p>

		<p class="sr-only">
			Nagamanickam S is a Fullstack Developer, Freelancer, and Freshworks Marketplace App Developer
			specializing in React, Node.js, and MERN stack.
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
		0%, 50% {
			opacity: 1;
		}
		51%, 100% {
			opacity: 0;
		}
	}
</style>