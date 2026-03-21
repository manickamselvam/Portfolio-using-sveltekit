<script lang="ts">
	import { onMount } from 'svelte';

	const roles = [
		'Fullstack Developer',
		'Freelancer',
		'Freshworks Marketplace App Developer'
	];

	let displayText = $state(''); // ✅ Use $state() for Svelte 5
	let roleIndex = $state(0);
	let charIndex = $state(0);
	let isDeleting = $state(false);
	let isPaused = $state(false);

	function typeEffect() {
		const currentRole = roles[roleIndex];

		if (isPaused) {
			// Wait during pause
			isPaused = false;
			setTimeout(typeEffect, 1200); // Pause after typing complete
			return;
		}

		if (!isDeleting && charIndex <= currentRole.length) {
			// Typing
			displayText = currentRole.slice(0, charIndex);
			charIndex++;
			
			if (charIndex > currentRole.length) {
				// Finished typing, pause before deleting
				isPaused = true;
				setTimeout(typeEffect, 1200);
				return;
			}
			
			setTimeout(typeEffect, 100); // Typing speed
		} else if (isDeleting && charIndex >= 0) {
			// Deleting
			displayText = currentRole.slice(0, charIndex);
			charIndex--;
			
			if (charIndex < 0) {
				// Finished deleting, move to next role
				isDeleting = false;
				roleIndex = (roleIndex + 1) % roles.length;
				charIndex = 0;
				setTimeout(typeEffect, 300); // Gap before next word
				return;
			}
			
			setTimeout(typeEffect, 50); // Deletion speed (faster)
		} else {
			// Start deleting
			isDeleting = true;
			setTimeout(typeEffect, 50);
		}
	}

	onMount(() => {
		typeEffect();
	});
</script>

<!-- 🌄 HERO SECTION -->
<section
	id="home"
	class="relative h-screen w-full flex items-center justify-start text-left text-white"
>
	<div
		class="absolute inset-0 bg-cover bg-center"
		style="background-image: url('/hero-image.jpg');"
	></div>

	<div class="absolute inset-0 bg-black/80"></div>

	<div class="relative z-10 px-10 md:px-20">
		<h1 class="text-4xl md:text-6xl font-bold mb-4">Nagamanickam S</h1>

		<p class="text-lg md:text-2xl text-gray-300">
			I'm a
			<span class="text-white font-semibold ml-1">
				{displayText}
			</span>
			<span class="cursor"></span>
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