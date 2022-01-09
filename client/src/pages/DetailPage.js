import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useHttp } from '../hooks/http.hook'
import { AuthContext } from '../context/AuthContext'
import { Loader } from '../components/Loader'
import { TasksList } from '../components/TasksList'
import { useParams } from "react-router-dom"
const storageName = 'userData'

export const DetailPage = () => {
	let confirmationCode = useParams().confirmationCode

	const [token, setToken] = useState(null)
	const [links, setLinks] = useState([])
	const [userId, setUserId] = useState(null)
	const { loading, request } = useHttp()
	const { auth } = useContext(AuthContext)


	const fetchLinks = useCallback(async () => {
		try {
			const fetched = await request(`http://localhost:5000/confirm/${confirmationCode}`, 'GET', null, {})
			const token = fetched.token
			const userId = fetched.userId
			const userStatus = fetched.userStatus
			localStorage.setItem(storageName, JSON.stringify({
				userId, token, userStatus
			}))

			auth.login(token, userId, userStatus)
		} catch (e) {

		}
	}, [token, request])
	useEffect(() => {
		fetchLinks()
	}, [fetchLinks])
	if (loading) {
		return <Loader />
	}
	return (
		<div>
			{!loading && <TasksList />}
		</div>
	)
}