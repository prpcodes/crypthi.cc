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
	import { ExplanationDialog } from '$components/ui/explanation-dialog';
	import { decryptMessage } from '$lib/utils/security';
	import { Textarea } from '$components/ui/textarea';
	import { Input } from '$components/ui/input';
	import { Label } from '$components/ui/label';
	import { goto } from '$app/navigation';
	import toast from 'svelte-french-toast';

	export let data;

	let message = '';
	let password = '';

	async function handleSubmit() {
		// send the data to server
		const res = await fetch(`/message/${data.id}?password=${password}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		});

		// handle response
		if (res.ok) {
			const { encrypted_message: encryptedMessage } = await res.json();

			message = decryptMessage(encryptedMessage, password);
			if (message === '') {
				toast.error('Invalid password, please try again.', {
					icon: '🤨',
					position: 'bottom-center'
				});
			} else {
				toast.success('Message has been decrypted!', {
					icon: '😎',
					position: 'bottom-center'
				});
			}
		} else {
			toast.error('Could not decrypt message.', {
				icon: '😭',
				position: 'bottom-center'
			});
		}
	}
	async function handleDelete() {
		// send the data to server
		const res = await fetch(`/message/${data.id}?password=${password}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			}
		});

		// handle response
		if (res.ok) {
			navigator.clipboard.writeText('');
			goto('/');
			toast.success('Message has been destroyed!', {
				icon: '🔥',
				position: 'bottom-center'
			});
		} else {
			toast.error('Could not delete message.', {
				icon: '😭',
				position: 'bottom-center'
			});
		}
	}
</script>

<Card class="w-[380px] ">
	<CardHeader>
		<CardTitle>🍑 Crypthi.cc</CardTitle>
		<CardDescription>
			A thicc wall of cryptography - that stands between your messages and the world.
			<ExplanationDialog />
		</CardDescription>
	</CardHeader>
	<form on:submit|preventDefault={handleSubmit}>
		<CardContent class="grid gap-4">
			{#if !message}
				<Label for="password">Password:</Label>
				<Input
					label="password"
					type="password"
					placeholder="Enter your password"
					bind:value={password}
					required
				/>
			{:else}
				<Textarea class="mt-2" label="message" type="message" bind:value={message} />
			{/if}
		</CardContent>
		{#if !message}
			<CardFooter>
				<Button class="w-full" type="submit">Decrypt Message</Button>
			</CardFooter>
		{:else}
			<CardFooter>
				<Button type="button" on:click={() => handleDelete()} class="w-full">Delete Message</Button>
			</CardFooter>
		{/if}
	</form>
</Card>
