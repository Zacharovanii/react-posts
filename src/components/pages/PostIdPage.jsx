import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useFetching } from '../hooks/useFetching'
import PostService from '../API/PostService'
import Loader from '../UI/Loader/Loader'


function PostIdPage() {
	const params = useParams()
	const [post, setPost] = useState({})
	const [comments, setComments] = useState([])
	const [fetchPostsById, isLoading, error] = useFetching(async (id) => {
		const response = await PostService.getById(id)
		setPost(response.data)
	})

	const [fetchComments, isComLoading, comError] = useFetching(async (id) => {
		const response = await PostService.getCommentsByPostId(id)
		setComments(response.data)
	})

	useEffect(() => {
		fetchPostsById(params.id)
		fetchComments(params.id)
	}, [])

	return (
		<div>

			<h1>Posts page with id = {params.id}</h1>
			{isLoading
				? <Loader />
				: <div>{post.id} {post.title}</div>
			}
			<h1>Comments</h1>
			{isComLoading
				? <Loader />
				: <div>
					{comments.map(function (comm) {
						return (
							<div key={comm.id} style={{ marginTop: '15px' }} >
								<h5>{comm.email}</h5>
								<div>{comm.body}</div>
							</div>
						)
					}

					)}
				</div>
			}
		</div>
	)
}

export default PostIdPage
