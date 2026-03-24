<script lang="ts">
	import { useReveal } from '$lib/utils/useReveal';

	let show = $state(false);
	let activeFilter = $state('all');

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

	const projects = [
		{
			title: 'Zapier Integration with Freshsales',
			desc: 'Maintained Zapier automation with Freshsales and built custom triggers/actions.',
			tag: 'Freshworks',
			type: 'app',
			link: 'https://zapier.com/apps/freshsales-suite/integrations'
		},
		{
			title: 'Remote - Freshteam Integration',
			desc: 'Syncs employees between Freshteam and Remote including historical data.',
			tag: 'Freshworks',
			type: 'app',
			link: 'https://support.freshteam.com/support/solutions/articles/19000138849-integrating-remote-with-freshteam'
		},
		{
			title: 'Freshdesk Ticket Parsing App',
			desc: 'Extracts patterns from ticket fields and updates destination fields automatically.',
			tag: 'Freshworks',
			type: 'app',
			link: 'https://www.freshworks.com/apps/ticket_parsing_app'
		},
		{
			title: 'Stripe Integration with Freshsales',
			desc: 'Manage subscriptions and chat with customers directly inside Freshsales.',
			tag: 'Freshworks',
			type: 'app',
			link: 'https://www.freshworks.com/apps/stripe_integration'
		},
		{
			title: 'Jira Integration with Freshservice',
			desc: 'Create Jira issues, sync comments/status, supports cloud & on-prem.',
			tag: 'Freshworks',
			type: 'app',
			link: 'https://www.freshworks.com/apps/jira_integration_3'
		},
		{
			title: 'Genesys Cloud Integration with Freshchat',
			desc: 'Handle incoming calls from Genesys directly inside Freshchat.',
			tag: 'Freshworks',
			type: 'app',
			link: 'https://www.freshworks.com/apps/genesys_cti_integration'
		},
		{
			title: 'Dashboard Application in Freshsales',
			desc: 'Improves productivity with workflow automation and task segmentation.',
			tag: 'Freshworks',
			type: 'app',
			link: 'https://www.freshworks.com/customers/stories/avanse'
		},
		{
			title: 'Riverbed Aternity Integration',
			desc: 'View device health and run remediation inside Freshservice.',
			tag: 'Freshworks',
			type: 'app',
			link: 'https://www.freshworks.com/apps/aternity_for_freshservice_1'
		},
		{
			title: 'Empolis Integration',
			desc: 'Attach best solution articles using Empolis API for email responses.',
			tag: 'Freshworks',
			type: 'app',
			link: 'https://empolis.com/en'
		},
		{
			title: 'SJC School Website',
			desc: 'A complete school website built as a freelance project.',
			tag: 'Website',
			type: 'website',
			link: 'https://sjc-school.vercel.app'
		},
		{
			title: 'CometChat Marketing Site',
			desc: 'A modern marketing site built as part of CometChat task.',
			tag: 'Website',
			type: 'website',
			link: 'https://comet-chat-task-omega.vercel.app'
		}
	];

	const filteredProjects = $derived(
		activeFilter === 'all' ? projects : projects.filter((p) => p.type === activeFilter)
	);
</script>

<section
	id="projects"
	bind:this={sectionRef}
	class="min-h-screen bg-[#0A0914] text-white px-4 sm:px-6 md:px-16 py-16 sm:py-20"
>
	<!-- Heading -->
	<h2
		class="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 sm:mb-10 transition-all duration-700"
		class:opacity-0={!show}
		class:-translate-y-10={!show}
		class:opacity-100={show}
		class:translate-y-0={show}
	>
		Projects
	</h2>

	<!-- ✅ FILTER BUTTONS (SCROLLABLE ON MOBILE) -->
	<div
		class="flex gap-3 sm:gap-4 mb-10 sm:mb-12 overflow-x-auto no-scrollbar transition-all duration-700 delay-200 text-sm sm:text-base md:text-xl"
		class:opacity-0={!show}
		class:translate-y-6={!show}
		class:opacity-100={show}
		class:translate-y-0={show}
	>
		<button
			onclick={() => (activeFilter = 'all')}
			class="whitespace-nowrap px-3 sm:px-4 py-2 rounded-full border border-gray-700 hover:bg-white/10"
		>
			All
		</button>

		<button
			onclick={() => (activeFilter = 'website')}
			class="whitespace-nowrap px-3 sm:px-4 py-2 rounded-full border border-gray-700 hover:bg-white/10"
		>
			Website
		</button>

		<button
			onclick={() => (activeFilter = 'app')}
			class="whitespace-nowrap px-3 sm:px-4 py-2 rounded-full border border-gray-700 hover:bg-white/10"
		>
			Freshworks Apps
		</button>
	</div>

	<!-- ✅ GRID -->
	<div
		class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 transition-all duration-700 delay-300"
		class:opacity-0={!show}
		class:translate-y-10={!show}
		class:opacity-100={show}
		class:translate-y-0={show}
	>
		{#each filteredProjects as project, index (project.title)}
			<a
				href={project.link}
				target="_blank"
				rel="noopener noreferrer"
				class="group relative bg-white/5 border border-gray-800 rounded-xl p-5 sm:p-6
				hover:bg-white/10 transition-all duration-300
				hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
				style="transition-delay: {index * 80}ms"
			>
				<span class="text-xs sm:text-sm text-gray-400 bg-white/10 px-2 py-1 rounded-full">
					{project.tag}
				</span>

				<h3 class="text-lg sm:text-xl font-semibold mt-3 sm:mt-4 mb-2 group-hover:text-white">
					{project.title}
				</h3>

				<p class="text-sm sm:text-base text-gray-400 leading-relaxed">
					{project.desc}
				</p>

				<div class="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition">↗</div>

				<span class="sr-only">
					Project: {project.title}. {project.desc}
				</span>
			</a>
		{/each}
	</div>
</section>

<style>
	/* hide scrollbar for mobile filter row */
	.no-scrollbar::-webkit-scrollbar {
		display: none;
	}
	.no-scrollbar {
		-ms-overflow-style: none;
		scrollbar-width: none;
	}
</style>
