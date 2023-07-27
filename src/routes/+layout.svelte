<script>
	import '../app.postcss';
	import { onMount } from 'svelte';
	import toast, { Toaster } from 'svelte-french-toast';
</script>

<main class="flex items-center justify-center w-screen h-screen">
	<Toaster />
	<slot />
</main>
