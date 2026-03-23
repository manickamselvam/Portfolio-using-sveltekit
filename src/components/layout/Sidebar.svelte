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

	// ✅ Cache elements (NO layout impact)
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

		// ✅ Prevent unnecessary updates
		if (activeSection !== id) {
			activeSection = id;
			history.replaceState(null, '', `#${id}`);
		}
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

				// ✅ Avoid re-render spam
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

<!-- ✅ SEO ONLY (no visual impact) -->
<svelte:head>
	<title>Nagamanickam S | Full Stack Developer</title>
	<meta
		name="description"
		content="Nagamanickam S portfolio - Full Stack Developer specializing in React, Node.js, and MERN stack."
	/>
	<link rel="canonical" href="https://your-domain.com/" />

	<!-- Open Graph -->
	<meta property="og:title" content="Nagamanickam S Portfolio" />
	<meta property="og:description" content="Full Stack Developer Portfolio" />
	<meta property="og:type" content="website" />

	<!-- Structured Data -->
	<script type="application/ld+json">
		{JSON.stringify({
			"@context": "https://schema.org",
			"@type": "Person",
			"name": "Nagamanickam S",
			"jobTitle": "Full Stack Developer",
			"url": "https://your-domain.com"
		})}
	</script>
</svelte:head>

<!-- ⛔ BELOW THIS: EXACT SAME AS YOUR CODE (UNCHANGED) -->

<aside
	class="w-90 h-screen overflow-y-auto overflow-x-hidden border-r border-gray-800 p-6 flex flex-col"
	aria-label="Main navigation and profile information"
>
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
			<a
				href="https://www.linkedin.com/in/nagamanickam-selvam"
				target="_blank"
				rel="noopener noreferrer"
				aria-label="Visit Nagamanickam S's LinkedIn profile"
				class="p-2 rounded-lg hover:bg-white/10 transition-colors"
			>
				<Icon icon="lucide:linkedin" class="w-6 h-6 hover:text-white transition-colors" aria-hidden="true" />
			</a>

			<a
				href="https://github.com/manickamselvam"
				target="_blank"
				rel="noopener noreferrer"
				aria-label="Visit Nagamanickam S's GitHub profile"
				class="p-2 rounded-lg hover:bg-white/10 transition-colors"
			>
				<Icon icon="lucide:github" class="w-6 h-6 hover:text-white transition-colors" aria-hidden="true" />
			</a>

			<a
				href="mailto:nagamanickam@yahoo.com"
				aria-label="Send email to Nagamanickam S"
				class="p-2 rounded-lg hover:bg-white/10 transition-colors"
			>
				<Icon icon="lucide:mail" class="w-6 h-6 hover:text-white transition-colors" aria-hidden="true" />
			</a>

			<a
				href="https://www.facebook.com/manickam.selvam.764032"
				target="_blank"
				rel="noopener noreferrer"
				aria-label="Visit Nagamanickam S's Facebook profile"
				class="p-2 rounded-lg hover:bg-white/10 transition-colors"
			>
				<Icon icon="mdi:facebook" class="w-6 h-6 hover:text-white transition-colors" aria-hidden="true" />
			</a>

			<a
				href="https://www.instagram.com/__m_a_n_i_c_k__/"
				target="_blank"
				rel="noopener noreferrer"
				aria-label="Visit Nagamanickam S's Instagram profile"
				class="p-2 rounded-lg hover:bg-white/10 transition-colors"
			>
				<Icon icon="mdi:instagram" class="w-6 h-6 hover:text-white transition-colors" aria-hidden="true" />
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
						<Icon icon={item.icon} class="w-6 h-6" aria-hidden="true" />
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