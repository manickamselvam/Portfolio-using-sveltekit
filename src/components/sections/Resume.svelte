<script lang="ts">
	import { onMount, onDestroy } from 'svelte';

	let show = $state(false);
	let sectionRef: HTMLElement;

	let observer: IntersectionObserver;
	let lastState = false;

	onMount(() => {
		observer = new IntersectionObserver(
			(entries) => {
				const isVisible = entries[0].isIntersecting;

				if (isVisible !== lastState) {
					lastState = isVisible;
					show = isVisible;
				}
			},
			{ threshold: 0.2 }
		);

		if (sectionRef) observer.observe(sectionRef);
	});

	onDestroy(() => {
		if (observer) observer.disconnect();
	});
</script>

<svelte:head>
	<meta
		name="keywords"
		content="Software Developer Experience, Resume Portfolio, JavaScript Developer Experience, Freshworks Developer"
	/>
</svelte:head>

<section
	id="resume"
	bind:this={sectionRef}
	class="min-h-screen bg-[#0A0914] text-white px-4 sm:px-6 md:px-12 lg:px-16 py-16 md:py-20 overflow-x-hidden"
>
	<!-- Heading -->
	<h2 class="text-2xl sm:text-3xl md:text-4xl font-bold mb-12 md:mb-16">Resume</h2>

	<!-- Grid -->
	<div class="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 text-base sm:text-lg md:text-xl">
		<!-- LEFT -->
		<div
			class="space-y-8 md:space-y-12 transition-all duration-700"
			class:opacity-0={!show}
			class:-translate-x-10={!show}
			class:opacity-100={show}
			class:translate-x-0={show}
		>
			<!-- Summary -->
			<div>
				<h3 class="text-lg sm:text-xl font-semibold mb-3 md:mb-4 border-l-4 pl-4 border-[#555758]">
					Summary
				</h3>

				<p class="text-gray-400 leading-relaxed">
					Experienced JavaScript Developer with 3+ years of proven expertise in designing and
					implementing interactive web applications. Proficient in responsive design, Git version
					control, and RESTful APIs for creating high-performance applications. Passionate about
					building impactful solutions and staying updated with the latest trends in web
					development.
				</p>
			</div>

			<!-- Education -->
			<div>
				<h3 class="text-lg sm:text-xl font-semibold mb-3 md:mb-4 border-l-4 pl-4 border-[#555758]">
					Education
				</h3>

				<div class="bg-white/5 border border-gray-800 rounded-xl p-4 sm:p-6">
					<h4 class="font-semibold text-lg sm:text-xl">
						Sri Krishna College of Engineering and Technology
					</h4>

					<p class="text-gray-400 mt-1">
						Bachelor of Engineering in Electrical and Electronics Engineering
					</p>

					<div
						class="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-0 text-gray-500 mt-3"
					>
						<span>May 2020</span>
						<span>Coimbatore, Tamil Nadu</span>
					</div>
				</div>
			</div>
		</div>

		<!-- RIGHT -->
		<div
			class="relative transition-all duration-700 delay-200"
			class:opacity-0={!show}
			class:translate-x-10={!show}
			class:opacity-100={show}
			class:translate-x-0={show}
		>
			<h3 class="text-lg sm:text-xl font-semibold mb-4 md:mb-6 border-l-4 pl-4 border-[#555758]">
				Professional Experience
			</h3>

			<!-- Timeline line -->
			<div class="absolute left-2 top-2 bottom-0 w-0.5 bg-gray-800"></div>

			<!-- Item -->
			<div class="relative pl-8">
				<div class="absolute left-0 top-2 w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-[#555758]"></div>

				<div
					class="bg-white/5 border border-gray-800 rounded-xl p-4 sm:p-6 text-base sm:text-lg md:text-xl"
				>
					<h4 class="text-lg sm:text-xl font-semibold">Konnectify</h4>
					<p class="text-gray-400">Software Developer</p>

					<div
						class="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-0 text-gray-500 mt-2 mb-4"
					>
						<span>May 2022 – Aug 2025</span>
						<span>Chennai, Tamil Nadu</span>
					</div>

					<ul class="list-disc pl-5 space-y-2 text-gray-400 leading-relaxed">
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
