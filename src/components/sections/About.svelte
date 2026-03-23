<script lang="ts">
	import { browser } from '$app/environment';

	type Stat = {
		label: string;
		value: number;
	};

	const stats: Stat[] = [
		{ label: 'Happy Clients', value: 20 },
		{ label: 'Projects Done', value: 35 },
		{ label: 'Years of Experience', value: 4 }
	];

	let counts = $state(stats.map(() => 0));
	let show = $state(false);
	let sectionRef = $state<HTMLElement>();

	// ✅ Track timers (important fix)
	let timers: ReturnType<typeof setTimeout>[] = [];

	function safeTimeout(fn: () => void, delay: number) {
		const t = setTimeout(fn, delay);
		timers.push(t);
	}

	function animateCount(index: number, target: number): void {
		let start = 0;
		const duration = 1200;
		const increment = target / (duration / 16);

		function update(): void {
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

	// ✅ Prevent re-trigger spam
	let hasAnimated = false;

	$effect(() => {
		if (!browser || !sectionRef) return;

		const observer = new IntersectionObserver(
			(entries) => {
				const entry = entries[0];

				if (entry.isIntersecting) {
					show = true;

					// ✅ Run animation only once (FIX)
					if (!hasAnimated) {
						hasAnimated = true;

						stats.forEach((stat, index) => {
							safeTimeout(() => {
								animateCount(index, stat.value);
							}, index * 200);
						});
					}
				} else {
					show = false;

					// ✅ Reset counts safely (no new array)
					counts.forEach((_, i) => (counts[i] = 0));
					hasAnimated = false;
				}
			},
			{ threshold: 0.3 }
		);

		observer.observe(sectionRef);

		return () => {
			observer.disconnect();

			// ✅ Cleanup timers (critical)
			timers.forEach(clearTimeout);
		};
	});
</script>

<!-- ✅ SEO (no UI impact) -->
<svelte:head>
	<meta
		name="keywords"
		content="Fullstack Developer Experience, Projects Completed, Client Work Portfolio"
	/>
</svelte:head>

<!-- 🔒 YOUR UI (UNCHANGED) -->
<section
	id="about"
	bind:this={sectionRef}
	aria-labelledby="about-heading"
	class="min-h-screen bg-[#0A0914] text-white px-6 md:px-16 py-20"
>
	<div
		class="max-w-4xl mb-16 transition-all duration-700"
		class:opacity-0={!show}
		class:-translate-y-10={!show}
		class:opacity-100={show}
		class:translate-y-0={show}
	>
		<h2 id="about-heading" class="text-3xl md:text-4xl font-bold mb-6">About Me</h2>

		<p class="text-gray-400 leading-relaxed text-xl">
			I am a passionate Fullstack Developer with strong experience in building scalable web
			applications. I enjoy creating clean UI, optimizing performance, and delivering real-world
			solutions. I continuously learn new technologies and aim to build impactful digital
			experiences.
		</p>
	</div>

	<div
		class="grid md:grid-cols-2 gap-10 items-center mb-20 transition-all duration-700 delay-200"
		class:opacity-0={!show}
		class:-translate-y-10={!show}
		class:opacity-100={show}
		class:translate-y-0={show}
	>
		<div>
			<div class="overflow-hidden rounded-2xl border-2" style="border-color: #23292d;">
				<img
					src="/profile-image.jpeg"
					alt="Nagamanickam S - Fullstack Developer working on web applications"
					width="600"
					height="600"
					loading="lazy"
					decoding="async"
					class="w-full h-100 object-scale-down"
				/>
			</div>
		</div>

		<div>
			<h3 class="text-2xl md:text-3xl font-semibold mb-6">
				Fullstack Developer & Freshworks Marketplace App Developer
			</h3>

			<dl class="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-10 text-gray-400 text-xl">
				<div>
					<dt class="text-white font-medium inline">Birthday:</dt>
					<dd class="inline ml-1">
						<time datetime="1998-04-30">30 Apr 1998</time>
					</dd>
				</div>

				<div>
					<dt class="text-white font-medium inline">Age:</dt>
					<dd class="inline ml-1">27</dd>
				</div>

				<div>
					<dt class="text-white font-medium inline">Degree:</dt>
					<dd class="inline ml-1">Bachelors</dd>
				</div>

				<div>
					<dt class="text-white font-medium inline">Email:</dt>
					<dd class="inline ml-1">
						<a href="mailto:nagamanickam@yahoo.com" class="hover:text-white transition-colors">
							nagamanickam@yahoo.com
						</a>
					</dd>
				</div>

				<div>
					<dt class="text-white font-medium inline">Phone:</dt>
					<dd class="inline ml-1">
						<a href="tel:+919500960553" class="hover:text-white transition-colors">
							+91 9500960553
						</a>
					</dd>
				</div>

				<div>
					<dt class="text-white font-medium inline">Freelance:</dt>
					<dd class="inline ml-1">Available</dd>
				</div>

				<div>
					<dt class="text-white font-medium inline">City:</dt>
					<dd class="inline ml-1">Namakkal, India</dd>
				</div>
			</dl>
		</div>
	</div>

	<div
		class="grid grid-cols-1 sm:grid-cols-3 gap-6 transition-all duration-700 delay-400"
		class:opacity-0={!show}
		class:translate-y-10={!show}
		class:opacity-100={show}
		class:translate-y-0={show}
		role="list"
		aria-label="Professional statistics"
	>
		{#each stats as stat, index (stat.label)}
			<div
				class="bg-white/5 border border-gray-800 rounded-xl p-6 text-center hover:bg-white/10 transition-colors"
				role="listitem"
			>
				<p class="text-3xl font-bold text-white mb-2" aria-label="{stat.label}: {counts[index]}+">
					<span aria-hidden="true">{counts[index]}+</span>
				</p>
				<p class="text-gray-400 text-xl">{stat.label}</p>
			</div>
		{/each}
	</div>
</section>

<style>
	section > div {
		will-change: opacity, transform;
	}

	.transition-all {
		transition-property: opacity, transform;
		transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
	}
</style>
