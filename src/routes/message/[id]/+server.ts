import { checkIsValid } from '$lib/utils/security';
import type { SupabaseClient } from '@supabase/supabase-js';
import { json } from '@sveltejs/kit';

export const GET = async ({
	url,
	params,
	locals: { supabase }
}: {
	url: URL;
	params: { id: string };
	locals: {
		supabase: SupabaseClient;
	};
}) => {
	const { id } = params;
	const password = url.searchParams.get('password');

	if (!id || !password) {
		return { status: 400, body: { error: 'Missing required fields' } };
	}

	const { data: messages, error } = await supabase
		.from('messages')
		.select('encrypted_message, password_hash')
		.match({ id });

	if (error || !messages || messages.length === 0) {
		return { status: 500, body: { error: 'Could not find message' } };
	}

	const isValid = await checkIsValid(password, messages[0].password_hash);

	if (!isValid) {
		return { status: 401, body: { error: 'Invalid password' } };
	}

	return json({ encrypted_message: messages[0].encrypted_message }, { status: 200 });
};

export const DELETE = async ({
	url,
	params,
	locals: { supabase }
}: {
	url: URL;
	params: { id: string };
	locals: {
		supabase: SupabaseClient;
	};
}) => {
	const { id } = params;
	const password = url.searchParams.get('password');

	if (!id || !password) {
		return { status: 400, body: { error: 'Missing required fields' } };
	}

	const { data: existingMessages, error } = await supabase
		.from('messages')
		.select('password_hash')
		.eq('id', id);

	if (error || !existingMessages || existingMessages.length === 0) {
		return { status: 500, body: { error: 'Could not find message' } };
	}

	const isValid = await checkIsValid(password, existingMessages[0].password_hash);
	if (!isValid) {
		return { status: 401, body: { error: 'Invalid password' } };
	}

	const { error: deleteError } = await supabase.from('messages').delete().match({ id });

	if (deleteError) {
		return { status: 500, body: { error: 'Error deleting message' } };
	}

	return json({ message: 'Message deleted successfully!' }, { status: 200 });
};
