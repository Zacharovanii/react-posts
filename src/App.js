import React, { useEffect, useState } from "react";
import './styles/App.css';
import PostList from "./components/PostList";
import PostForm from "./components/PostForm";
import PostFilter from "./components/PostFilter";
import MyModal from "./components/UI/MyModal/MyModal";
import MyButton from "./components/UI/button/MyButton";
import { usePosts } from "./components/hooks/usePosts";
import PostService from "./components/API/PostService";
import Loader from "./components/UI/Loader/Loader";
import { useFetching } from "./components/hooks/useFetching";

function App() {
	const [posts, setPosts] = useState([])
	const [filter, setFilter] = useState({ sort: '', query: '' })
	const [modal, setModal] = useState(false)
	const [totalCount, setTotalCount] = useState(0)
	const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)

	const [fetchPosts, isPostsLoading, postError] = useFetching(async () => {
		const response = await PostService.getAll()
		setPosts(response.data)
		setTotalCount(response.headers['x-total-count'])
	})

	useEffect(() => {
		fetchPosts()
	}, [])

	const createPost = (newPost) => {
		setPosts([...posts, newPost])
		setModal(false)
	}

	const removePost = (post) => {
		setPosts(posts.filter(p => p.id !== post.id))
	}

	return (
		<div className="App">
			<MyButton style={{ marginTop: '30px' }} onClick={() => setModal(true)} >
				Create User
			</MyButton>
			<MyModal visible={modal} setVisible={setModal}>
				<PostForm create={createPost} />
			</MyModal>
			<hr style={{ margin: '15px 0' }} />
			<PostFilter
				filter={filter}
				setFilter={setFilter}
			/>
			{postError
				? <h1>Some Error: {postError}</h1>
				: ''
			}
			{isPostsLoading
				? <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }} ><Loader /></div>
				: <PostList
					remove={removePost}
					posts={sortedAndSearchedPosts}
					title='Список постов 1'
				/>
			}

		</div>
	);
}

export default App;
