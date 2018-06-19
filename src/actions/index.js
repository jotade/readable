import axios from 'axios'

export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const RECEIVE_POST = 'RECEIVE_POST'
export const ADD_POST = 'ADD_POST'
export const VOTE_POST = 'VOTE_POST'
export const EDIT_POST = 'EDIT_POST'
export const DELETE_POST = 'DELETE_POST'
export const ADD_COMMENT = 'ADD_COMMENT'
export const VOTE_COMMENT = 'VOTE_COMMENT'
export const EDIT_COMMENT = 'EDIT_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'
export const SORT_TYPE = 'SORT_TYPE'
export const CATEGORY = 'CATEGORY'
export const POST_COMMENTS = 'POST_COMMENTS'

const api = `http://localhost:3001`
const headers = { headers: { 'Authorization': 'whatever-you-want' }}

export const fetchCategories = () => async dispatch => {
  const res = await axios.get(`${api}/categories`, headers)
  dispatch({type: RECEIVE_CATEGORIES, categories: res.data.categories})
}

export const fetchPosts = () => async dispatch => {
  const res = await axios.get(`${api}/posts`, headers)
  dispatch({type: RECEIVE_POSTS, posts: res.data})
}

export const fetchPostsByCat = (cat) => async dispatch => {
  const res = await axios.get(`${api}/${cat}/posts`, headers)
  dispatch({type: RECEIVE_POSTS, posts: res.data})
}

export const fetchPost = (id) => async dispatch => {
  const res = await axios.get(`${api}/posts/${id}`, headers)
  dispatch({type: RECEIVE_POST, post: res.data})
}

export const fetchComments = (id) => async dispatch => {
  const res = await axios.get(`${api}/posts/${id}/comments`, headers)
  dispatch({type: POST_COMMENTS, comments: res.data})
}

export const insertPost = (post) => async dispatch => {
  const res = await axios.post(`${api}/posts`, post, headers)
  dispatch({type: ADD_POST, post: res.data})
}

export const insertComment = (comment) => async dispatch => {
  const res = await axios.post(`${api}/comments`, comment, headers)
  dispatch({type: ADD_COMMENT, comment: res.data})
}

export const setSortType = (sortType) => dispatch => {
  dispatch({type: SORT_TYPE, sortType: sortType})
}

export const setCategory = (cat) => dispatch => {
  dispatch({type: CATEGORY, category: cat})
}

export const votePost = (id, vote) => async dispatch => {
  const res = await axios.post(`${api}/posts/${id}`, vote, headers)
  dispatch({type: VOTE_POST, post: res.data})
}

export const voteComment = (id, vote) => async dispatch => {
  const res = await axios.post(`${api}/comments/${id}`, vote, headers)
  dispatch({type: VOTE_COMMENT, comment: res.data})
}

export const editPost = (post) => async dispatch => {
  await axios.put(`${api}/posts/${post.id}`, post, headers)
}

export const deletePost = (post) => async dispatch => {
  const res = await axios.delete(`${api}/posts/${post.id}`, headers)
  dispatch({type: DELETE_POST, post: res.data})
}

export const editComment = (comment) => async dispatch => {
  const res = await axios.put(`${api}/comments/${comment.id}`, comment, headers)
  dispatch({type: EDIT_COMMENT, comment: res.data})
}

export function deleteComment ({ id }) {
  return {
    type: DELETE_COMMENT,
    id,
  }
}
