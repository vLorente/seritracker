interface UserMetadata {
	avatar_url: string
	email: string
	name: string
	full_name: string
	user_name: string
}

export interface UserSession {
	id: string
	role: string
	email: string
	phone: string
	user_metadata: UserMetadata
}
