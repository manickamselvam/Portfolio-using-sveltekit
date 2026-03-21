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

	function scrollToSection(id: string): void {
		if (!browser) return;

		const element = document.getElementById(id);
		element?.scrollIntoView({ behavior: 'smooth' });
	}

	function handleClick(e: MouseEvent, id: string) {
		e.preventDefault();
		scrollToSection(id);
	}
</script>

<aside
	class="w-90 h-screen overflow-y-auto overflow-x-hidden border-r border-gray-800 p-6 flex flex-col"
>
	<!-- 🔝 TOP CONTENT -->
	<div class="flex flex-col items-center">
		<!-- 🖼️ Profile Image -->
		<div class="w-full mb-6 overflow-hidden rounded-2xl border-2" style="border-color: #23292d;">
			<img src="/profile-image.jpeg" alt="Profile" class="w-full h-75 object-cover block" />
		</div>

		<!-- 👤 Name -->
		<h2 class="text-2xl font-bold mb-4">Nagamanickam S</h2>

		<!-- 🌐 Social Icons -->
		<div class="flex gap-4 mb-6 text-gray-400">
			<a
				href="https://www.linkedin.com/in/nagamanickam-selvam"
				target="_blank"
				class="p-2 rounded-lg hover:bg-white/10 transition"
			>
				<Icon icon="lucide:linkedin" class="w-5 h-5 hover:text-white" />
			</a>

			<a
				href="https://github.com/manickamselvam"
				target="_blank"
				class="p-2 rounded-lg hover:bg-white/10 transition"
			>
				<Icon icon="lucide:github" class="w-5 h-5 hover:text-white" />
			</a>
			<a href="mailto:nagamanickam@yahoo.com" class="p-2 rounded-lg hover:bg-white/10 transition">
				<Icon icon="lucide:mail" class="w-5 h-5 hover:text-white" />
			</a>
			<a
				href="https://www.facebook.com/manickam.selvam.764032"
				target="_blank"
				class="p-2 rounded-lg hover:bg-white/10 transition"
			>
				<Icon icon="mdi:facebook" class="w-5 h-5 hover:text-white" />
			</a>
			<a
				href="https://www.instagram.com/__m_a_n_i_c_k__/"
				target="_blank"
				class="p-2 rounded-lg hover:bg-white/10 transition"
			>
				<Icon icon="mdi:instagram" class="w-5 h-5 hover:text-white" />
			</a>
		</div>
	</div>

	<!-- 📌 NAV (NO INTERNAL SCROLL) -->
	<nav class="mt-4">
		<div class="flex flex-col gap-3">
			{#each navItems as item (item.id)}
				<a
					href={`#${item.id}`}
					onclick={(e) => handleClick(e, item.id)}
					class="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition"
				>
					<Icon icon={item.icon} class="w-5 h-5" />
					<span>{item.label}</span>
				</a>
			{/each}
		</div>
	</nav>
</aside>
