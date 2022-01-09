import axios from "axios"
// import { useHttp } from '../hooks/http.hook'
// import { useEffect, useState } from 'react'
// const storageName = 'userData'
// const { request, login } = useHttp()
// const [ready, setReady] = useState(false)
export const verifyUser = code => {
	console.log(code)
	return axios.get("http://localhost:3000/confirm/:" + code)
	// .then(response => {
	// 	return response;
	// });
};

// export const verifyUser = async code => {
// 	try {
// 		const data = await request('http://localhost:3000/confirm/', 'POST', { code })

// 	} catch (e) {
// 		console.log('ErrorData', e)
// 	}
// 	useEffect(() => {
// 		const data = JSON.parse(localStorage.getItem(storageName))
// 		if (data && data.token) {
// 			login(data.token, data.userId)
// 		}
// 		setReady(true)
// 	}, [login])
// }