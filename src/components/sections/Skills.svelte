<script lang="ts">
	import { browser } from '$app/environment';

	type Skill = {
		name: string;
		level: number;
	};

	let animate = $state(false);
	let show = $state(false);
	let sectionRef = $state<HTMLElement>();

	const skills: Skill[] = [
		{ name: 'HTML5', level: 95 },
		{ name: 'CSS3', level: 85 },
		{ name: 'Javascript', level: 80 },
		{ name: 'React.Js', level: 75 },
		{ name: 'Node.js', level: 70 },
		{ name: 'MongoDB', level: 65 }
	];

	let lastState = false;

	$effect(() => {
		if (!browser || !sectionRef) return;

		const observer = new IntersectionObserver(
			(entries) => {
				const entry = entries[0];
				const isVisible = entry.isIntersecting;

				if (isVisible !== lastState) {
					lastState = isVisible;
					show = isVisible;
					animate = isVisible;
				}
			},
			{ threshold: 0.3 }
		);

		observer.observe(sectionRef);

		return () => observer.disconnect();
	});
</script>

<svelte:head>
	<meta
		name="keywords"
		content="Frontend Skills, React Developer Skills, Node.js Skills, MERN Stack Skills"
	/>
</svelte:head>

<section
	id="skills"
	bind:this={sectionRef}
	aria-labelledby="skills-heading"
	class="bg-[#0A0914] text-white px-4 sm:px-6 md:px-12 lg:px-16 py-16 md:py-20"
>
	<!-- Heading -->
	<h2
		id="skills-heading"
		class="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 md:mb-12 transition-all duration-700"
		class:opacity-0={!show}
		class:-translate-y-10={!show}
		class:opacity-100={show}
		class:translate-y-0={show}
	>
		Skills
	</h2>

	<!-- Grid -->
	<div
		class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6 sm:gap-8 md:gap-10 transition-all duration-700 delay-200"
		class:opacity-0={!show}
		class:-translate-y-10={!show}
		class:opacity-100={show}
		class:translate-y-0={show}
		role="list"
	>
		{#each skills as skill, index (skill.name)}
			<div
				class="transition-all duration-500"
				style="transition-delay: {index * 100}ms"
				role="listitem"
			>
				<!-- Skill Header -->
				<div class="flex justify-between mb-2">
					<span class="font-medium text-base sm:text-lg md:text-xl">
						{skill.name}
					</span>

					<span
						class="text-gray-400 text-sm sm:text-base"
						aria-label="Proficiency: {skill.level} percent"
					>
						{skill.level}%
					</span>
				</div>

				<!-- Progress -->
				<div
					class="w-full h-2 bg-gray-800 rounded-full overflow-hidden"
					role="progressbar"
					aria-valuenow={animate ? skill.level : 0}
					aria-valuemin={0}
					aria-valuemax={100}
				>
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

<style>
	section > h2,
	section > div {
		will-change: opacity, transform;
	}

	[role='progressbar'] > div {
		will-change: width;
	}
</style>
