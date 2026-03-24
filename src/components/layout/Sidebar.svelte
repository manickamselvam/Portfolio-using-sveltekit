<script lang="ts">
	import Icon from '@iconify/svelte';
	import { browser } from '$app/environment';

	type NavItem = {
		id: string;
		label: string;
		icon: string;
	};

	const navItems: NavItem[] = [
		{ id: 'home', label: 'Home', icon: 'lucide:home' },
		{ id: 'about', label: 'About', icon: 'lucide:user' },
		{ id: 'resume', label: 'Resume', icon: 'lucide:file-text' },
		{ id: 'projects', label: 'Projects', icon: 'lucide:briefcase' },
		{ id: 'services', label: 'Services', icon: 'lucide:settings' },
		{ id: 'contact', label: 'Contact', icon: 'lucide:mail' }
	];

	let activeSection = $state('home');

	let isOpen = $state(false);

	let sectionElements: HTMLElement[] = [];

	function initSections() {
		sectionElements = navItems
			.map(({ id }) => document.getElementById(id))
			.filter(Boolean) as HTMLElement[];
	}

	function scrollToSection(id: string): void {
		if (!browser) return;

		const element = document.getElementById(id);
		if (!element) return;

		element.scrollIntoView({ behavior: 'smooth', block: 'start' });

		if (activeSection !== id) {
			activeSection = id;
			history.replaceState(null, '', `#${id}`);
		}

		isOpen = false;
	}

	function handleClick(e: MouseEvent, id: string): void {
		e.preventDefault();
		scrollToSection(id);
	}

	$effect(() => {
		if (!browser) return;

		initSections();

		const observer = new IntersectionObserver(
			(entries) => {
				let newActive = activeSection;

				for (const entry of entries) {
					if (entry.isIntersecting) {
						newActive = entry.target.id;
					}
				}

				if (newActive !== activeSection) {
					activeSection = newActive;
				}
			},
			{
				threshold: 0.5,
				rootMargin: '-100px 0px -100px 0px'
			}
		);

		sectionElements.forEach((el) => observer.observe(el));

		return () => observer.disconnect();
	});
</script>

<!-- ✅ MOBILE + TABLET MENU BUTTON -->
<button
	type="button"
	class="fixed top-4 left-4 z-50 p-2 rounded-lg bg-[#0A0914] border border-gray-800 lg:hidden"
	onclick={() => (isOpen = true)}
	aria-label="Open menu"
>
	<Icon icon="lucide:menu" class="w-6 h-6 text-white" />
</button>

<!-- ✅ OVERLAY -->
{#if isOpen}
	<button
		type="button"
		class="fixed inset-0 bg-black/50 z-40 lg:hidden"
		onclick={() => (isOpen = false)}
		aria-label="Close menu overlay"
	></button>
{/if}

<!-- ✅ SIDEBAR -->
<aside
	class="
		w-90 h-screen overflow-y-auto overflow-x-hidden border-r border-gray-800 p-6 flex flex-col
		bg-[#0A0914]

		fixed top-0 left-0 z-50 transform transition-transform duration-300
		{isOpen ? 'translate-x-0' : '-translate-x-full'}

		lg:translate-x-0 lg:static
	"
	aria-label="Main navigation and profile information"
>
	<!-- ✅ CLOSE ICON (YOUR ORIGINAL BEHAVIOR PRESERVED) -->
	{#if isOpen}
		<button
			type="button"
			class="absolute top-4 right-4 p-2 rounded-lg border border-gray-700 lg:hidden"
			onclick={() => (isOpen = false)}
			aria-label="Close menu"
		>
			<Icon icon="lucide:x" class="w-6 h-6 text-white" />
		</button>
	{/if}

	<div class="flex flex-col items-center">
		<div class="w-full mb-6 overflow-hidden rounded-2xl border-2" style="border-color: #23292d;">
			<img
				src="/profile-image.jpeg"
				alt="Nagamanickam S - Full Stack Developer and Software Engineer"
				width="300"
				height="300"
				loading="eager"
				fetchpriority="high"
				decoding="async"
				class="w-full h-75 object-cover block"
			/>
		</div>

		<h1 class="text-2xl font-bold mb-2">Nagamanickam S</h1>

		<p class="sr-only">Full Stack Developer & Software Engineer</p>

		<nav aria-label="Social media profiles" class="flex gap-4 mb-6 text-gray-400">
			<a href="https://www.linkedin.com/in/nagamanickam-selvam" target="_blank" class="p-2 rounded-lg hover:bg-white/10">
				<Icon icon="lucide:linkedin" class="w-6 h-6 hover:text-white" />
			</a>
			<a href="https://github.com/manickamselvam" target="_blank" class="p-2 rounded-lg hover:bg-white/10">
				<Icon icon="lucide:github" class="w-6 h-6 hover:text-white" />
			</a>
			<a href="mailto:nagamanickam@yahoo.com" class="p-2 rounded-lg hover:bg-white/10">
				<Icon icon="lucide:mail" class="w-6 h-6 hover:text-white" />
			</a>
			<a href="https://www.facebook.com/manickam.selvam.764032" target="_blank" class="p-2 rounded-lg hover:bg-white/10">
				<Icon icon="mdi:facebook" class="w-6 h-6 hover:text-white" />
			</a>
			<a href="https://www.instagram.com/__m_a_n_i_c_k__/" target="_blank" class="p-2 rounded-lg hover:bg-white/10">
				<Icon icon="mdi:instagram" class="w-6 h-6 hover:text-white" />
			</a>
		</nav>
	</div>

	<nav class="mt-4" aria-label="Page sections navigation">
		<ul class="flex flex-col gap-3" role="list">
			{#each navItems as item (item.id)}
				<li>
					<a
						href={`#${item.id}`}
						onclick={(e) => handleClick(e, item.id)}
						class="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-all {activeSection === item.id ? 'bg-white/10 text-white' : ''}"
						aria-current={activeSection === item.id ? 'page' : undefined}
					>
						<Icon icon={item.icon} class="w-6 h-6" />
						<span class="text-xl">{item.label}</span>
					</a>
				</li>
			{/each}
		</ul>
	</nav>
</aside>

<style>
	.sr-only {
		position: absolute;
		width: 1px;
		height: 1px;
		padding: 0;
		margin: -1px;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
		white-space: nowrap;
		border-width: 0;
	}

	a {
		will-change: background-color, color;
	}
</style>