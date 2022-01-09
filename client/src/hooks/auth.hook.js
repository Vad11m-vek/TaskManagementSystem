import { useState, useCallback, useEffect } from 'react'
const storageName = 'userData'

export const useAuth = () => {
	const [token, setToken] = useState(null)
	const [ready, setReady] = useState(false)
	const [userId, setUserId] = useState(null)
	const [userStatus, setUserStatus] = useState(null)

	const login = useCallback((jwtToken, id, userStatus) => {
		setToken(jwtToken)
		setUserId(id)
		setUserStatus(userStatus)
		localStorage.setItem(storageName, JSON.stringify({
			userId: id, token: jwtToken, userStatus
		}))
	}, [])
	const logout = useCallback(() => {
		localStorage.removeItem("userData")
		setToken(null)
		setUserId(null)
		setUserStatus(null)
	}, [])
	useEffect(() => {
		const data = JSON.parse(localStorage.getItem(storageName))
		if (data && data.token) {
			login(data.token, data.userId, data.userStatus)
		}
		setReady(true)
	}, [login, token])
	return { login, logout, token, userId, ready }
}