<script lang="ts">
	import Icon from '@iconify/svelte';
	import { useReveal } from '$lib/utils/useReveal';

	let show = $state(false);

	// ✅ Section ref (fixed)
	let sectionRef: HTMLElement | null = null;

	useReveal(
		() => sectionRef,
		() => (show = true),
		() => (show = false)
	);

	// ✅ Form state
	let name = $state('');
	let email = $state('');
	let subject = $state('');
	let message = $state('');
	let submitted = $state(false);
	let loading = $state(false);
	let errorMsg = $state('');

	// ✅ Submit handler
	async function handleSubmit(e: SubmitEvent) {
		e.preventDefault();

		loading = true;
		submitted = false;
		errorMsg = '';

		try {
			const res = await fetch('/api/contact', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ name, email, subject, message })
			});

			const data = await res.json();

			if (data.success) {
				submitted = true;

				// reset form
				name = '';
				email = '';
				subject = '';
				message = '';
			} else {
				errorMsg = 'Something went wrong. Please try again.';
			}
		} catch (err) {
			console.error(err);
			errorMsg = 'Failed to send message. Check your connection.';
		} finally {
			loading = false;
		}
	}
</script>

<section
	id="contact"
	bind:this={sectionRef}
	class="min-h-screen bg-[#0A0914] text-white px-6 md:px-16 py-20"
>
	<!-- 🔥 Heading -->
	<h2
		class="text-3xl md:text-4xl font-bold mb-12 transition-all duration-700"
		class:opacity-0={!show}
		class:-translate-y-10={!show}
		class:opacity-100={show}
		class:translate-y-0={show}
	>
		Contact
	</h2>

	<div class="grid grid-cols-1 lg:grid-cols-2 gap-10">
		<!-- LEFT INFO -->
		<div
			class="space-y-6 transition-all duration-700"
			class:opacity-0={!show}
			class:-translate-x-10={!show}
			class:opacity-100={show}
			class:translate-x-0={show}
		>
			<div class="flex items-start gap-4 p-5 rounded-xl bg-white/5 border border-gray-800">
				<Icon icon="lucide:map-pin" class="w-6 h-6 text-[#555758]" />
				<div>
					<h4 class="font-semibold">Location</h4>
					<p class="text-gray-400 text-sm">Namakkal, Tamil Nadu, India</p>
				</div>
			</div>

			<div class="flex items-start gap-4 p-5 rounded-xl bg-white/5 border border-gray-800">
				<Icon icon="lucide:mail" class="w-6 h-6 text-[#555758]" />
				<div>
					<h4 class="font-semibold">Email</h4>
					<p class="text-gray-400 text-sm">nagamanickam@yahoo.com</p>
				</div>
			</div>

			<div class="flex items-start gap-4 p-5 rounded-xl bg-white/5 border border-gray-800">
				<Icon icon="lucide:phone" class="w-6 h-6 text-[#555758]" />
				<div>
					<h4 class="font-semibold">Phone</h4>
					<p class="text-gray-400 text-sm">+91 9500960553</p>
				</div>
			</div>
		</div>

		<!-- RIGHT FORM -->
		<form
			onsubmit={handleSubmit}
			class="space-y-6 transition-all duration-700 delay-200"
			class:opacity-0={!show}
			class:translate-x-10={!show}
			class:opacity-100={show}
			class:translate-x-0={show}
		>
			<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
				<input type="text" placeholder="Your Name" bind:value={name} class="input" required />
				<input type="email" placeholder="Your Email" bind:value={email} class="input" required />
			</div>

			<input type="text" placeholder="Subject" bind:value={subject} class="input" required />

			<textarea
				rows="5"
				placeholder="Message"
				bind:value={message}
				class="input"
				required
			></textarea>

			<!-- 🔥 Button with Loader -->
			<button
				type="submit"
				disabled={loading}
				class="px-6 py-3 rounded-lg font-medium transition flex items-center justify-center gap-2
				{loading ? 'bg-gray-600 cursor-not-allowed' : 'bg-[#555758] hover:bg-white hover:text-black'}"
			>
				{#if loading}
					<span class="loader"></span>
					Sending...
				{:else}
					Send Message
				{/if}
			</button>

			<!-- ✅ Success -->
			{#if submitted}
				<p class="text-green-400 text-sm">Message sent successfully ✅</p>
			{/if}

			<!-- ❌ Error -->
			{#if errorMsg}
				<p class="text-red-400 text-sm">{errorMsg}</p>
			{/if}
		</form>
	</div>
</section>

<style>
	.input {
		width: 100%;
		padding: 12px;
		border-radius: 8px;
		background: rgba(255, 255, 255, 0.05);
		border: 1px solid #1f2937;
		outline: none;
	}

	.input:focus {
		border-color: #555758;
	}

	/* 🔄 Loader */
	.loader {
		width: 18px;
		height: 18px;
		border: 2px solid transparent;
		border-top: 2px solid white;
		border-radius: 50%;
		animation: spin 0.6s linear infinite;
	}

	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}
</style>