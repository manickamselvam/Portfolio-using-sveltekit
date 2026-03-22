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

	// Svelte 5: Use $state rune for reactive state
	let activeSection = $state('home');

	function scrollToSection(id: string): void {
		if (!browser) return;

		const element = document.getElementById(id);
		if (element) {
			element.scrollIntoView({ behavior: 'smooth', block: 'start' });
			activeSection = id;
			// Update URL without page reload (better SEO and sharability)
			history.replaceState(null, '', `#${id}`);
		}
	}

	function handleClick(e: MouseEvent, id: string): void {
		e.preventDefault();
		scrollToSection(id);
	}

	// Svelte 5: Use $effect for side effects (replaces onMount)
	$effect(() => {
		if (!browser) return;

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						activeSection = entry.target.id;
					}
				});
			},
			{ threshold: 0.5, rootMargin: '-100px 0px -100px 0px' }
		);

		// Observe all sections
		navItems.forEach(({ id }) => {
			const element = document.getElementById(id);
			if (element) observer.observe(element);
		});

		// Svelte 5: Cleanup function
		return () => observer.disconnect();
	});
</script>

<!-- SEO: Semantic HTML with proper ARIA labels -->
<aside
	class="w-90 h-screen overflow-y-auto overflow-x-hidden border-r border-gray-800 p-6 flex flex-col"
	aria-label="Main navigation and profile information"
>
	<!-- Profile Section -->
	<div class="flex flex-col items-center">
		<!-- SEO: Optimized image with descriptive alt text and explicit dimensions -->
		<div class="w-full mb-6 overflow-hidden rounded-2xl border-2" style="border-color: #23292d;">
			<img
				src="/profile-image.jpeg"
				alt="Nagamanickam S - Full Stack Developer and Software Engineer"
				width="300"
				height="300"
				loading="eager"
				fetchpriority="high"
				class="w-full h-75 object-cover block"
			/>
		</div>

		<!-- SEO: Proper heading hierarchy (use h1 if this is the main heading) -->
		<h1 class="text-2xl font-bold mb-2">Nagamanickam S</h1>

		<!-- SEO: Hidden but accessible job title for screen readers and search engines -->
		<p class="sr-only">Full Stack Developer & Software Engineer</p>

		<!-- SEO: Semantic navigation for social links with descriptive labels -->
		<nav aria-label="Social media profiles" class="flex gap-4 mb-6 text-gray-400">
			<a
				href="https://www.linkedin.com/in/nagamanickam-selvam"
				target="_blank"
				rel="noopener noreferrer"
				aria-label="Visit Nagamanickam S's LinkedIn profile"
				class="p-2 rounded-lg hover:bg-white/10 transition-colors"
			>
				<Icon
					icon="lucide:linkedin"
					class="w-8 h-8 hover:text-white transition-colors"
					aria-hidden="true"
				/>
			</a>

			<a
				href="https://github.com/manickamselvam"
				target="_blank"
				rel="noopener noreferrer"
				aria-label="Visit Nagamanickam S's GitHub profile"
				class="p-2 rounded-lg hover:bg-white/10 transition-colors"
			>
				<Icon
					icon="lucide:github"
					class="w-8 h-8 hover:text-white transition-colors"
					aria-hidden="true"
				/>
			</a>

			<a
				href="mailto:nagamanickam@yahoo.com"
				aria-label="Send email to Nagamanickam S"
				class="p-2 rounded-lg hover:bg-white/10 transition-colors"
			>
				<Icon
					icon="lucide:mail"
					class="w-8 h-8 hover:text-white transition-colors"
					aria-hidden="true"
				/>
			</a>

			<a
				href="https://www.facebook.com/manickam.selvam.764032"
				target="_blank"
				rel="noopener noreferrer"
				aria-label="Visit Nagamanickam S's Facebook profile"
				class="p-2 rounded-lg hover:bg-white/10 transition-colors"
			>
				<Icon
					icon="mdi:facebook"
					class="w-8 h-8 hover:text-white transition-colors"
					aria-hidden="true"
				/>
			</a>

			<a
				href="https://www.instagram.com/__m_a_n_i_c_k__/"
				target="_blank"
				rel="noopener noreferrer"
				aria-label="Visit Nagamanickam S's Instagram profile"
				class="p-2 rounded-lg hover:bg-white/10 transition-colors"
			>
				<Icon
					icon="mdi:instagram"
					class="w-8 h-8 hover:text-white transition-colors"
					aria-hidden="true"
				/>
			</a>
		</nav>
	</div>

	<!-- Main Navigation -->
	<nav class="mt-4" aria-label="Page sections navigation">
		<ul class="flex flex-col gap-3" role="list">
			{#each navItems as item (item.id)}
				<li>
					<a
						href={`#${item.id}`}
						onclick={(e) => handleClick(e, item.id)}
						class="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-all {activeSection ===
						item.id
							? 'bg-white/10 text-white'
							: ''}"
						aria-current={activeSection === item.id ? 'page' : undefined}
					>
						<Icon icon={item.icon} class="w-5 h-5" aria-hidden="true" />
						<span>{item.label}</span>
					</a>
				</li>
			{/each}
		</ul>
	</nav>
</aside>

<style>
	/* Screen reader only utility for SEO-friendly hidden content */
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

	/* Performance optimization: GPU acceleration for smooth transitions */
	a {
		will-change: background-color, color;
	}
</style>
