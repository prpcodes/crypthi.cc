<script lang="ts">
	import {
		Dialog,
		DialogContent,
		DialogHeader,
		DialogTitle,
		DialogTrigger
	} from '$components/ui/dialog';
</script>

<Dialog modal={true}>
	<DialogTrigger class="underline">How does it work?</DialogTrigger>
	<DialogContent class="sm:max-w-[425px]">
		<DialogHeader>
			<DialogTitle>How does it work?</DialogTitle>
		</DialogHeader>
		<p class="text-sm">
			The message encryption and password hashing both happen on the client-side, and the server
			just stores and retrieves the encrypted messages and hashed passwords.
		</p>
		<p class="text-sm">
			When a client wants to read a message, they send the password and the message id to the
			server, and the server checks if the hashed password matches the one stored in the database.
			If it does, it returns the encrypted message.
		</p>
		<p class="text-sm">In the end, the message gets decrypted on the clients device.</p>
	</DialogContent>
</Dialog>
