export type Json =
	| string
	| number
	| boolean
	| null
	| { [key: string]: Json | undefined }
	| Json[]

export interface Database {
	public: {
		Tables: {
			watching: {
				Row: {
					// the data expected from .select()
					userId: number
					malId: number
					data: Json | null
				}
				Insert: {
					// the data to be passed to .insert()
					userId: never
					malId: string
					data?: Json | null
				}
				Update: {
					// the data to be passed to .update()
					userId?: never
					malId?: string
					data?: Json | null
				}
			}
			watchlist: {
				Row: {
					// the data expected from .select()
					userId: number
					malId: number
					data: Json | null
				}
				Insert: {
					// the data to be passed to .insert()
					userId: never
					malId: string
					data?: Json | null
				}
				Update: {
					// the data to be passed to .update()
					userId?: never
					malId?: string
					data?: Json | null
				}
			}
			finished: {
				Row: {
					// the data expected from .select()
					userId: number
					malId: number
					data: Json | null
				}
				Insert: {
					// the data to be passed to .insert()
					userId: never
					malId: string
					data?: Json | null
				}
				Update: {
					// the data to be passed to .update()
					userId?: never
					malId?: string
					data?: Json | null
				}
			}
		}
	}
}
