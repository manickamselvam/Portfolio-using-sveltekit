<script lang="ts">
	import { onMount } from 'svelte';

	// ✅ Svelte 5 state
	let animate = $state(false);
	let show = $state(false);

	const skills = [
		{ name: 'HTML5', level: 95 },
		{ name: 'CSS3', level: 85 },
		{ name: 'Javascript', level: 80 },
		{ name: 'React.Js', level: 75 },
		{ name: 'Node.js', level: 70 },
		{ name: 'MongoDB', level: 65 }
	];

	let sectionRef: HTMLElement;

	onMount(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				const entry = entries[0];

				if (entry.isIntersecting) {
					show = true;
					animate = true;
				} else {
					show = false;
					animate = false;
				}
			},
			{ threshold: 0.3 }
		);

		if (sectionRef) observer.observe(sectionRef);
	});
</script>

<section
	id="skills"
	bind:this={sectionRef}
	class="min-h-screen bg-[#0A0914] text-white px-6 md:px-16 py-20"
>
	<!-- 🧠 Heading -->
	<h2
		class="text-3xl md:text-4xl font-bold mb-12 transition-all duration-700"
		class:opacity-0={!show}
		class:-translate-y-10={!show}
		class:opacity-100={show}
		class:translate-y-0={show}
	>
		Skills
	</h2>

	<!-- 📊 Grid -->
	<div
		class="grid grid-cols-1 md:grid-cols-2 gap-10 transition-all duration-700 delay-200"
		class:opacity-0={!show}
		class:-translate-y-10={!show}
		class:opacity-100={show}
		class:translate-y-0={show}
	>
		{#each skills as skill, index (skill.name)}
			<div class="transition-all duration-500" style="transition-delay: {index * 100}ms">
				<!-- Skill Name -->
				<div class="flex justify-between mb-2">
					<span class="font-medium">{skill.name}</span>
					<span class="text-gray-400">{skill.level}%</span>
				</div>

				<!-- Progress Bar -->
				<div class="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
					<div
						class="h-full bg-[#555758] transition-all duration-1000 ease-out"
						style="
							width: {animate ? skill.level + '%' : '0%'};
							transition-delay: {index * 120}ms;
						"
					></div>
				</div>
			</div>
		{/each}
	</div>
</section>
