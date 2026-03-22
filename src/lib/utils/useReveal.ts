import { onMount } from 'svelte';

export function useReveal(
	getElement: () => HTMLElement | null,
	onEnter: () => void,
	onLeave?: () => void,
	threshold = 0.3
) {
	onMount(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				const entry = entries[0];

				if (entry.isIntersecting) {
					onEnter();
				} else {
					if (onLeave) {
						onLeave();
					}
				}
			},
			{ threshold }
		);

		const el = getElement();
		if (el) observer.observe(el);

		return () => observer.disconnect();
	});
}
