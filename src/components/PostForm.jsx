import React, { useState } from 'react'
import MyInput from './UI/input/MyInput'
import MyButton from './UI/button/MyButton'

function PostForm(props) {
	const [post, setPost] = useState({ title: '', body: '' })

	const addNewPost = (e) => {
		e.preventDefault()
		const newPost = {
			...post, id: Date.now()
		}
		props.create(newPost)
		setPost({ title: '', body: '' })
	}

	return (
		<form>
			<MyInput
				value={post.title}
				onChange={e => setPost({ ...post, title: e.target.value })}
				type="text"
				placeholder="Name post"
			/>
			<MyInput
				value={post.body}
				onChange={e => setPost({ ...post, body: e.target.value })}
				type="text"
				placeholder="Description post"
			/>
			<MyButton onClick={addNewPost} >Create post</MyButton>
		</form>
	)
}

export default PostForm
