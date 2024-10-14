import React, { useContext } from 'react'
import MyInput from '../UI/input/MyInput'
import MyButton from '../UI/button/MyButton'
import { AuthContext } from '../context'

function Login() {
	const { isAuth, setIsAuth } = useContext(AuthContext)
	const login = event => {
		event.preventDefault()
		setIsAuth(true)
		localStorage.setItem('auth', 'true')
	}

	return (
		<div>
			<h1>Login Page</h1>
			<form onSubmit={login}>
				<MyInput type="text" placeholder='Enter login' />
				<MyInput type="password" placeholder='Enter password' />
				<MyButton>Enter</MyButton>
			</form>
		</div>
	)
}

export default Login
