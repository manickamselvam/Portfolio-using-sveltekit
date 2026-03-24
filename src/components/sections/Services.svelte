<script lang="ts">
	import Icon from '@iconify/svelte';
	import { useReveal } from '$lib/utils/useReveal';

	let show = $state(false);
	let sectionRef: HTMLElement;

	let lastRevealState = false;

	useReveal(
		() => sectionRef,
		() => {
			if (!lastRevealState) {
				lastRevealState = true;
				show = true;
			}
		},
		() => {
			if (lastRevealState) {
				lastRevealState = false;
				show = false;
			}
		}
	);

	const services = [
		{
			title: 'Fullstack Development',
			desc: 'Building scalable web applications using modern technologies like React, Node.js, and MongoDB.',
			icon: 'lucide:layers'
		},
		{
			title: 'Freshworks Marketplace Apps',
			desc: 'Developing custom apps and integrations for Freshdesk, Freshservice, and Freshsales.',
			icon: 'lucide:box'
		},
		{
			title: 'API & Integration',
			desc: 'Creating robust REST APIs and integrating third-party services like Stripe, Jira, and Zapier.',
			icon: 'lucide:link'
		},
		{
			title: 'Frontend Development',
			desc: 'Designing responsive, high-performance UI using modern frameworks and best practices.',
			icon: 'lucide:layout'
		},
		{
			title: 'Automation & Workflows',
			desc: 'Automating repetitive business processes using Zapier and custom logic to improve efficiency.',
			icon: 'lucide:zap'
		},
		{
			title: 'Performance Optimization',
			desc: 'Optimizing applications for speed, scalability, and better user experience.',
			icon: 'lucide:gauge'
		}
	];
</script>

<svelte:head>
	<meta
		name="keywords"
		content="Fullstack Developer Services, Web Development Services, Freshworks App Development, API Integration Services, Freelance Developer India"
	/>
</svelte:head>

<section
	id="services"
	bind:this={sectionRef}
	class="min-h-screen bg-[#0A0914] text-white px-4 sm:px-6 md:px-16 py-16 sm:py-20"
	aria-labelledby="services-heading"
>
	<h2
		id="services-heading"
		class="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 sm:mb-12 transition-all duration-700"
		class:opacity-0={!show}
		class:-translate-y-10={!show}
		class:opacity-100={show}
		class:translate-y-0={show}
	>
		Services
	</h2>

	<div
		class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 transition-all duration-700 delay-200"
		class:opacity-0={!show}
		class:translate-y-10={!show}
		class:opacity-100={show}
		class:translate-y-0={show}
		role="list"
		aria-label="Services offered"
	>
		{#each services as service, index (service.title)}
			<div
				class="group bg-white/5 border border-gray-800 rounded-xl p-5 sm:p-6
				transition-all duration-300 hover:-translate-y-2 hover:bg-white/10
				hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
				style="transition-delay: {index * 100}ms"
				role="listitem"
			>
				<!-- Icon -->
				<div class="mb-3 sm:mb-4 text-[#555758] group-hover:text-white transition">
					<Icon icon={service.icon} class="w-6 h-6 sm:w-8 sm:h-8" aria-hidden="true" />
				</div>

				<!-- Title -->
				<h3 class="text-lg sm:text-xl font-semibold mb-2">
					{service.title}
				</h3>

				<!-- Description -->
				<p class="text-sm sm:text-base text-gray-400 leading-relaxed">
					{service.desc}
				</p>

				<span class="sr-only">
					Service: {service.title}. {service.desc}
				</span>
			</div>
		{/each}
	</div>
</section>
