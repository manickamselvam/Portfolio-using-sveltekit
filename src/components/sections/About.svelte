<script lang="ts">
	import { onMount } from 'svelte';

	const stats = [
		{ label: 'Happy Clients', value: 20 },
		{ label: 'Projects Done', value: 35 },
		{ label: 'Years of Experience', value: 4 }
	];

	// ✅ Svelte 5 state
	let counts = $state(stats.map(() => 0));
	let show = $state(false);
	let sectionRef: HTMLElement;

	function animateCount(index: number, target: number) {
		let start = 0;
		const duration = 1200;
		const increment = target / (duration / 16);

		function update() {
			start += increment;

			if (start < target) {
				counts[index] = Math.floor(start);
				requestAnimationFrame(update);
			} else {
				counts[index] = target;
			}
		}

		update();
	}

	onMount(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				const entry = entries[0];

				if (entry.isIntersecting) {
					show = true;

					// 👉 Trigger count animation
					stats.forEach((stat, index) => {
						setTimeout(() => {
							animateCount(index, stat.value);
						}, index * 200);
					});
				} else {
					show = false;

					// 👉 Reset counts when leaving viewport
					counts = stats.map(() => 0);
				}
			},
			{ threshold: 0.3 }
		);

		if (sectionRef) observer.observe(sectionRef);
	});
</script>

<section
	id="about"
	bind:this={sectionRef}
	class="min-h-screen bg-[#0A0914] text-white px-6 md:px-16 py-20"
>
	<!-- 🧾 ABOUT TEXT -->
	<div
		class="max-w-4xl mb-16 transition-all duration-700"
		class:opacity-0={!show}
		class:-translate-y-10={!show}
		class:opacity-100={show}
		class:translate-y-0={show}
	>
		<h2 class="text-3xl md:text-4xl font-bold mb-6">About Me</h2>

		<p class="text-gray-400 leading-relaxed">
			I am a passionate Fullstack Developer with strong experience in building scalable web
			applications. I enjoy creating clean UI, optimizing performance, and delivering real-world
			solutions. I continuously learn new technologies and aim to build impactful digital
			experiences.
		</p>
	</div>

	<!-- 👤 PROFILE + TEXT -->
	<div
		class="grid md:grid-cols-2 gap-10 items-center mb-20 transition-all duration-700 delay-200"
		class:opacity-0={!show}
		class:-translate-y-10={!show}
		class:opacity-100={show}
		class:translate-y-0={show}
	>
		<!-- 🖼️ Image -->
		<div>
			<div class="overflow-hidden rounded-2xl border-2" style="border-color: #23292d;">
				<img src="/profile-image.jpeg" alt="Profile" class="w-full h-100 object-scale-down" />
			</div>
		</div>

		<!-- 📝 Text -->
		<div>
			<h3 class="text-2xl md:text-3xl font-semibold mb-6">
				Fullstack Developer & Freshworks Marketplace App Developer
			</h3>

			<div class="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-10 text-gray-400">
				<div><span class="text-white font-medium">Birthday:</span> 30 Apr 1998</div>
				<div><span class="text-white font-medium">Age:</span> 27</div>

				<div><span class="text-white font-medium">Degree:</span> Bachelors</div>
				<div><span class="text-white font-medium">Email:</span> nagamanickam@yahoo.com</div>

				<div><span class="text-white font-medium">Phone:</span> +91 9500960553</div>
				<div><span class="text-white font-medium">Freelance:</span> Available</div>

				<div><span class="text-white font-medium">City:</span> Namakkal, India</div>
			</div>
		</div>
	</div>

	<!-- 📊 STATS -->
	<div
		class="grid grid-cols-1 sm:grid-cols-3 gap-6 transition-all duration-700 delay-400"
		class:opacity-0={!show}
		class:translate-y-10={!show}
		class:opacity-100={show}
		class:translate-y-0={show}
	>
		{#each stats as stat, index (stat.label)}
			<div
				class="bg-white/5 border border-gray-800 rounded-xl p-6 text-center hover:bg-white/10 transition"
			>
				<h4 class="text-3xl font-bold text-white mb-2">
					{counts[index]}+
				</h4>
				<p class="text-gray-400">{stat.label}</p>
			</div>
		{/each}
	</div>
</section>
