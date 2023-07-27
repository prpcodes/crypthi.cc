import type { SupabaseClient } from '@supabase/supabase-js';
import { json } from '@sveltejs/kit';

export const POST = async ({
	request,
	locals: { supabase }
}: {
	request: Request;
	locals: {
		supabase: SupabaseClient;
	};
}) => {
	const { encrypted_message, password_hash } = await request.json();

	const { data, error } = await supabase
		.from('messages')
		.insert([{ encrypted_message, password_hash }])
		.select('id');

	console.log(data, error);

	if (error) {
		return json({ error: error.message }, { status: 500 });
	}

	return json({ id: data[0].id }, { status: 201 });
};
