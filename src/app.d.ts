import { SupabaseClient, Session } from '@supabase/supabase-js';
// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}
		interface Locals {
			supabase: SupabaseClient;
		}
		interface PageData {
			session: Session | null;
		}
		interface Message {
			id: number;
			encrypted_message: string;
			password_hash: string;
			inserted_at: Date;
		}
	}
}

export {};
