<script lang="ts">
	import { onMount, onDestroy } from 'svelte';

	let show = $state(false);
	let sectionRef: HTMLElement;

	// ✅ Track observer
	let observer: IntersectionObserver;

	// ✅ Prevent unnecessary updates
	let lastState = false;

	onMount(() => {
		observer = new IntersectionObserver(
			(entries) => {
				const isVisible = entries[0].isIntersecting;

				// ✅ Update only if changed (prevents re-render spam)
				if (isVisible !== lastState) {
					lastState = isVisible;
					show = isVisible;
				}
			},
			{ threshold: 0.2 }
		);

		if (sectionRef) observer.observe(sectionRef);
	});

	// ✅ CLEANUP (important fix)
	onDestroy(() => {
		if (observer) observer.disconnect();
	});
</script>

<!-- ✅ SEO (no UI impact) -->
<svelte:head>
	<meta
		name="keywords"
		content="Software Developer Experience, Resume Portfolio, JavaScript Developer Experience, Freshworks Developer"
	/>
</svelte:head>

<!-- 🔒 YOUR UI (UNCHANGED) -->
<section
	id="resume"
	bind:this={sectionRef}
	class="min-h-screen bg-[#0A0914] text-white px-6 md:px-16 py-20"
>
	<h2 class="text-3xl md:text-4xl font-bold mb-16">Resume</h2>

	<div class="grid grid-cols-1 md:grid-cols-2 gap-16 text-xl">
		<div
			class="space-y-12 transition-all duration-700"
			class:opacity-0={!show}
			class:-translate-x-10={!show}
			class:opacity-100={show}
			class:translate-x-0={show}
		>
			<div>
				<h3 class="text-xl font-semibold mb-4 border-l-4 pl-4 border-[#555758]">Summary</h3>

				<p class="text-gray-400 leading-relaxed">
					Experienced JavaScript Developer with 3+ years of proven expertise in designing and
					implementing interactive web applications. Proficient in responsive design, Git version
					control, and RESTful APIs for creating high-performance applications. Passionate about
					building impactful solutions and staying updated with the latest trends in web
					development.
				</p>
			</div>

			<div>
				<h3 class="text-xl font-semibold mb-4 border-l-4 pl-4 border-[#555758]">Education</h3>

				<div class="bg-white/5 border border-gray-800 rounded-xl p-6">
					<h4 class="font-semibold text-xl">Sri Krishna College of Engineering and Technology</h4>
					<p class="text-gray-400 mt-1">
						Bachelor of Engineering in Electrical and Electronics Engineering
					</p>

					<div class="flex justify-between text-gray-500 mt-3 text-xl">
						<span>May 2020</span>
						<span>Coimbatore, Tamil Nadu</span>
					</div>
				</div>
			</div>
		</div>

		<div
			class="relative transition-all duration-700 delay-200"
			class:opacity-0={!show}
			class:translate-x-10={!show}
			class:opacity-100={show}
			class:translate-x-0={show}
		>
			<h3 class="text-xl font-semibold mb-6 border-l-4 pl-4 border-[#555758]">
				Professional Experience
			</h3>

			<div class="absolute left-2 top-2 bottom-0 w-0.5 bg-gray-800"></div>

			<div class="relative pl-8">
				<div class="absolute left-0 top-2 w-4 h-4 rounded-full bg-[#555758]"></div>

				<div class="bg-white/5 border border-gray-800 rounded-xl p-6 text-xl">
					<h4 class="text-xl font-semibold">Konnectify</h4>
					<p class="text-gray-400">Software Developer</p>

					<div class="flex justify-between text-xl text-gray-500 mt-2 mb-4">
						<span>May 2022 – Aug 2025</span>
						<span>Chennai, Tamil Nadu</span>
					</div>

					<ul class="list-disc pl-5 space-y-2 text-gray-400 text-xl leading-relaxed">
						<li>
							Developed custom applications and integrations within the Freshworks ecosystem using
							the Freshworks SDK.
						</li>
						<li>
							Designed and implemented UI using HTML, CSS, and JavaScript for 1000+ monthly users.
						</li>
						<li>
							Collaborated with cross-functional teams to gather requirements and define project
							scope.
						</li>
						<li>Integrated RESTful APIs to enhance application capabilities.</li>
						<li>Wrote efficient, testable code following best practices.</li>
						<li>Mentored 2 junior developers improving team productivity and code quality.</li>
						<li>Automated workflows using Zapier, improving productivity by 50%.</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</section>
