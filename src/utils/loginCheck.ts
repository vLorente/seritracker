import { COOKIES } from "@consts/cookies"
import { getCookie } from "@utils/cookies"

export default function loginCheck() {
	const userId = getCookie(COOKIES.USERID)
	const accessToken = getCookie(COOKIES.SB_ACCESS_TOKEN)
	const refreshToken = getCookie(COOKIES.SB_REFRESH_TOKEN)

	return userId && accessToken && refreshToken
}
