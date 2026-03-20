<script lang="ts">
	import Icon from '@iconify/svelte';

	import { browser } from '$app/environment';

	type NavItem = {
		id: string;
		label: string;
	};

	const navItems: NavItem[] = [
		{ id: 'about', label: 'About' },
		{ id: 'projects', label: 'Projects' },
		{ id: 'skills', label: 'Skills' },
		{ id: 'contact', label: 'Contact' }
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

<aside class="w-64 h-screen border-r border-gray-800 p-6 flex flex-col items-center">
	<!-- 🖼️ Profile Image -->
	<div class="w-full mb-6 overflow-hidden rounded-2xl border-10" style="border-color: #23292d;">
		<img src="/profile-image.jpeg" alt="Profile" class="w-full h-56 object-cover block" />
	</div>

	<!-- 👤 Name -->
	<h2 class="text-2xl font-bold mb-4">Nagamanickam S</h2>

	<!-- 🌐 Social Icons -->
	<div class="flex gap-4 mb-10 text-gray-400">
		<!-- Linkedin -->
		<a href="#" target="_blank" class="p-2 rounded-lg hover:bg-white/10 transition">
			<Icon icon="lucide:linkedin" class="w-5 h-5 text-gray-400 hover:text-white" />
		</a>

		<!-- Github -->
		<a href="#" target="_blank" class="p-2 rounded-lg hover:bg-white/10 transition">
			<Icon icon="lucide:github" class="w-5 h-5 text-gray-400 hover:text-white" />
		</a>

		<!-- Email -->
		<a href="#" target="_blank" class="p-2 rounded-lg hover:bg-white/10 transition">
			<Icon icon="lucide:mail" class="w-5 h-5 text-gray-400 hover:text-white" />
		</a>

		<!-- Facebook -->
		<a href="#" target="_blank" class="p-2 rounded-lg hover:bg-white/10 transition">
			<Icon icon="mdi:facebook" class="w-5 h-5 text-gray-400 hover:text-white" />
		</a>

		<!-- Instagram -->
		<a href="#" target="_blank" class="p-2 rounded-lg hover:bg-white/10 transition">
			<Icon icon="mdi:instagram" class="w-5 h-5 text-gray-400 hover:text-white" />
		</a>
	</div>

	<!-- 📌 Navigation -->
	<nav class="flex flex-col gap-4 w-full">
		{#each navItems as item (item.id)}
			<a
				href={`#${item.id}`}
				onclick={(e) => handleClick(e, item.id)}
				class="text-left text-gray-400 hover:text-white transition"
			>
				{item.label}
			</a>
		{/each}
	</nav>
</aside>
