<script lang="ts">
	import Icon from '@iconify/svelte';
	import { useReveal } from '$lib/utils/useReveal';

	let show = $state(false);

	let sectionRef: HTMLElement | null = null;

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

	let name = $state('');
	let email = $state('');
	let subject = $state('');
	let message = $state('');
	let submitted = $state(false);
	let loading = $state(false);
	let errorMsg = $state('');

	async function handleSubmit(e: SubmitEvent) {
		e.preventDefault();

		if (loading) return;

		loading = true;
		submitted = false;
		errorMsg = '';

		try {
			const res = await fetch('/api/contact', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ name, email, subject, message })
			});

			if (!res.ok) throw new Error('Network error');

			const data = await res.json();

			if (data?.success) {
				submitted = true;
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

<svelte:head>
	<meta
		name="keywords"
		content="Contact Fullstack Developer, Hire MERN Developer India, Freelance Developer Contact"
	/>
</svelte:head>

<section
	id="contact"
	bind:this={sectionRef}
	class="min-h-screen bg-[#0A0914] text-white px-4 sm:px-6 md:px-16 py-16 sm:py-20 overflow-x-hidden"
	aria-labelledby="contact-heading"
>
	<h2
		id="contact-heading"
		class="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 sm:mb-12 transition-all duration-700"
		class:opacity-0={!show}
		class:-translate-y-10={!show}
		class:opacity-100={show}
		class:translate-y-0={show}
	>
		Contact
	</h2>

	<div class="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10">
		<!-- LEFT -->
		<div
			class="space-y-5 sm:space-y-6 transition-all duration-700"
			class:opacity-0={!show}
			class:-translate-x-10={!show}
			class:opacity-100={show}
			class:translate-x-0={show}
		>
			<div class="flex items-start gap-3 sm:gap-4 p-4 sm:p-5 rounded-xl bg-white/5 border border-gray-800">
				<Icon icon="lucide:map-pin" class="w-6 h-6 sm:w-8 sm:h-8 text-[#555758]" />
				<div class="text-base sm:text-xl">
					<h4 class="font-semibold">Location</h4>
					<p class="text-gray-400 text-sm sm:text-base">Namakkal, Tamil Nadu, India</p>
				</div>
			</div>

			<div class="flex items-start gap-3 sm:gap-4 p-4 sm:p-5 rounded-xl bg-white/5 border border-gray-800">
				<Icon icon="lucide:mail" class="w-6 h-6 sm:w-8 sm:h-8 text-[#555758]" />
				<div class="text-base sm:text-xl">
					<h4 class="font-semibold">Email</h4>
					<p class="text-gray-400 text-sm sm:text-base">nagamanickam@yahoo.com</p>
				</div>
			</div>

			<div class="flex items-start gap-3 sm:gap-4 p-4 sm:p-5 rounded-xl bg-white/5 border border-gray-800">
				<Icon icon="lucide:phone" class="w-6 h-6 sm:w-8 sm:h-8 text-[#555758]" />
				<div class="text-base sm:text-xl">
					<h4 class="font-semibold">Phone</h4>
					<p class="text-gray-400 text-sm sm:text-base">+91 9500960553</p>
				</div>
			</div>
		</div>

		<!-- FORM -->
		<form
			onsubmit={handleSubmit}
			class="space-y-5 sm:space-y-6 transition-all duration-700 delay-200"
			class:opacity-0={!show}
			class:translate-x-10={!show}
			class:opacity-100={show}
			class:translate-x-0={show}
			aria-label="Contact form"
		>
			<div class="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
				<input
					type="text"
					placeholder="Your Name"
					bind:value={name}
					class="input text-sm sm:text-base"
					required
				/>
				<input
					type="email"
					placeholder="Your Email"
					bind:value={email}
					class="input text-sm sm:text-base"
					required
				/>
			</div>

			<input
				type="text"
				placeholder="Subject"
				bind:value={subject}
				class="input text-sm sm:text-base"
				required
			/>

			<textarea
				rows="5"
				placeholder="Message"
				bind:value={message}
				class="input text-sm sm:text-base"
				required
			></textarea>

			<button
				type="submit"
				disabled={loading}
				class="w-full sm:w-auto px-5 sm:px-6 py-3 rounded-lg text-base sm:text-xl font-medium transition flex items-center justify-center gap-2
				{loading ? 'bg-gray-600 cursor-not-allowed' : 'bg-[#555758] hover:bg-white hover:text-black'}"
			>
				{#if loading}
					<span class="loader"></span>
					Sending...
				{:else}
					Send Message
				{/if}
			</button>

			{#if submitted}
				<p class="text-green-400 text-sm" role="status">Message sent successfully ✅</p>
			{/if}

			{#if errorMsg}
				<p class="text-red-400 text-sm" role="alert">{errorMsg}</p>
			{/if}
		</form>
	</div>
</section>

<style>
	.input {
		width: 100%;
		padding: 10px;
		border-radius: 8px;
		background: rgba(255, 255, 255, 0.05);
		border: 1px solid #1f2937;
		outline: none;
	}

	@media (min-width: 640px) {
		.input {
			padding: 12px;
		}
	}

	.input:focus {
		border-color: #555758;
	}

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