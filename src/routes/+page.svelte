<script lang="ts">
	import {
		Card,
		CardContent,
		CardDescription,
		CardFooter,
		CardHeader,
		CardTitle
	} from '$components/ui/card';

	import { Button } from '$components/ui/button';
	import { Input } from '$components/ui/input';
	import { Textarea } from '$components/ui/textarea';
	import { ExplanationDialog } from '$components/ui/explanation-dialog';

	import { encryptMessage, hashPassword } from '$lib/utils/security';
	import { ArrowRight } from 'lucide-svelte';
	import Label from '$components/ui/label/Label.svelte';
	import toast from 'svelte-french-toast';
	import { goto } from '$app/navigation';

	let message = '';
	let password = '';
	let id = '';

	const handleCopyToClipboard = async (text: string) => {
		await navigator.clipboard.writeText(text);

		toast.success('Copied link to clipboard', {
			icon: '📎',
			position: 'bottom-center'
		});
	};

	async function handleSubmit() {
		// encrypt message and hash password
		const encrypted_message = await encryptMessage(message, password);
		const password_hash = await hashPassword(password);

		// send the data to server
		const res = await fetch('/message', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ encrypted_message, password_hash })
		});

		// handle response
		if (res.ok) {
			const { id: messageId } = await res.json();
			id = `https://crypthi.cc/${messageId}`;
			toast.success('Message has been encrypted!', {
				icon: '😎',
				position: 'bottom-center'
			});
		} else {
			toast.error('Could not encrypt message.', {
				icon: '😭',
				position: 'bottom-center'
			});
		}
	}
</script>

<Card class="w-[380px]">
	<CardHeader>
		<CardTitle>🍑 Crypthi.cc</CardTitle>
		<CardDescription>
			A thicc wall of cryptography - that stands between your messages and the world.
			<ExplanationDialog />
		</CardDescription>
	</CardHeader>
	<form on:submit|preventDefault={handleSubmit}>
		<CardContent class="grid gap-4">
			{#if !id}
				<Label for="message">Message:</Label>
				<Textarea label="message" placeholder="Enter your message" bind:value={message} required />
				<Label for="password">Password:</Label>
				<Input
					label="password"
					type="password"
					placeholder="Enter your password"
					bind:value={password}
					required
				/>
			{:else}
				<Input label="id" type="id" bind:value={id} />
			{/if}
		</CardContent>
		{#if !id}
			<CardFooter>
				<Button class="w-full" type="submit">Encrypt Message</Button>
			</CardFooter>
		{:else}
			<CardFooter class="flex justify-between w-full">
				<Button type="button" on:click={() => handleCopyToClipboard(id)} class="w-2/3">
					Copy Link
				</Button>
				<Button type="button" on:click={() => goto(id)} class="w-1/3 ml-2">
					<ArrowRight />
				</Button>
			</CardFooter>
		{/if}
	</form>
</Card>
