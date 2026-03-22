<script lang="ts">
	import Icon from '@iconify/svelte';
	import { useReveal } from '$lib/utils/useReveal';

	let show = $state(false);
	let sectionRef: HTMLElement;

	useReveal(
		() => sectionRef,
		() => (show = true),
		() => (show = false)
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

<section
	id="services"
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
		Services
	</h2>

	<!-- 📦 Grid -->
	<div
		class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-700 delay-200"
		class:opacity-0={!show}
		class:translate-y-10={!show}
		class:opacity-100={show}
		class:translate-y-0={show}
	>
		{#each services as service, index (service.title)}
			<div
				class="group bg-white/5 border border-gray-800 rounded-xl p-6 
				transition-all duration-300 hover:-translate-y-2 hover:bg-white/10 
				hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
				style="transition-delay: {index * 100}ms"
			>
				<!-- 🔥 Icon -->
				<div class="mb-4 text-[#555758] group-hover:text-white transition">
					<Icon icon={service.icon} class="w-8 h-8" />
				</div>

				<!-- 🧾 Title -->
				<h3 class="text-lg font-semibold mb-2">
					{service.title}
				</h3>

				<!-- 📄 Description -->
				<p class="text-gray-400 text-sm leading-relaxed">
					{service.desc}
				</p>
			</div>
		{/each}
	</div>
</section>