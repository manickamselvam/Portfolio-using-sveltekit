<script lang="ts">
	// Svelte 5 ready (no special state needed yet)

	const stats = [
		{ label: 'Happy Clients', value: 20 },
		{ label: 'Projects Done', value: 35 },
		{ label: 'Active Projects', value: 2 }
	];
</script>

<section id="about" class="min-h-screen bg-[#0A0914] text-white px-6 md:px-16 py-20">
	<!-- 🧾 ABOUT TEXT -->
	<div class="max-w-4xl mb-16">
		<h2 class="text-3xl md:text-4xl font-bold mb-6">About Me</h2>

		<p class="text-gray-400 leading-relaxed">
			I am a passionate Fullstack Developer with strong experience in building scalable web
			applications. I enjoy creating clean UI, optimizing performance, and delivering real-world
			solutions. I continuously learn new technologies and aim to build impactful digital
			experiences.
		</p>
	</div>

	<!-- 👤 PROFILE + TEXT -->
	<div class="grid md:grid-cols-2 gap-10 items-center mb-20">
		<!-- 🖼️ Image -->
		<div class="w-full">
			<div class="overflow-hidden rounded-2xl border-2" style="border-color: #23292d;">
				<img src="/profile-image.jpeg" alt="Profile" class="w-full h-87.5 object-cover" />
			</div>
		</div>

		<!-- 📝 Text -->
		<div>
			<h3 class="text-2xl font-semibold mb-4">Who am I?</h3>

			<p class="text-gray-400 leading-relaxed">
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut
				labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
				laboris nisi ut aliquip ex ea commodo consequat.
			</p>
		</div>
	</div>

	<!-- 📊 STATS -->
	<div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
		{#each stats as stat (stat.label)}
			<div
				class="bg-white/5 border border-gray-800 rounded-xl p-6 text-center hover:bg-white/10 transition"
			>
				<h4 class="text-3xl font-bold text-white mb-2">{stat.value}</h4>
				<p class="text-gray-400">{stat.label}</p>
			</div>
		{/each}
	</div>
</section>
