import { combineReducers } from 'redux'
import {
  RECEIVE_CATEGORIES,
  RECEIVE_POSTS,
  RECEIVE_POST,
  ADD_POST,
  VOTE_POST,
  EDIT_POST,
  DELETE_POST,
  ADD_COMMENT,
  VOTE_COMMENT,
  EDIT_COMMENT,
  DELETE_COMMENT,
  SORT_TYPE,
  CATEGORY,
  POST_COMMENTS,
} from '../actions/types'

const blogInitialState = {
  categories: [],
  posts: [],
}

function blog (state = blogInitialState, action) {
  switch (action.type) {
    case RECEIVE_CATEGORIES:
      return {
        ...state,
        categories: [ ...state.categories, ...action.categories ]
      }
    case RECEIVE_POSTS :
      return {
        ...state,
        posts: [...action.posts]
      }
    case RECEIVE_POST :
      return {
        ...state,
        post: action.post
      }
    case ADD_POST :
      return {
        ...state,
        posts: [...state.posts, action.post]
      }
    case VOTE_POST :
      return {
        ...state,
        posts: [...state.posts.filter((post) => post.id !== action.post.id ), action.post]
      }
    case CATEGORY :
      return {
        ...state,
        category: action.category
      }
    case EDIT_POST :
      return {
        ...state,
        post: action.post,
        posts: [...state.posts.filter((post) => post.id !== action.post.id ), action.post]
      }
    case DELETE_POST :
      return {
        ...state,
        post: {},
        posts: [...state.posts.filter((post) => post.id !== action.post.id )]
      }
    case SORT_TYPE :
      return {
        ...state,
        sortType: action.sortType
      }
    default :
      return state
  }
}

const commentsInitialState = {
  comments: []
}

function comments (state = commentsInitialState, action) {
  switch (action.type) {
    case ADD_COMMENT :
      return {
        ...state,
        comments: [...state.comments, action.comment]
      }
    case POST_COMMENTS :
      return {
        ...state,
        comments: [...action.comments]
      }
    case VOTE_COMMENT :
      return {
        ...state,
        comments: [...state.comments.filter((comment) => comment.id !== action.comment.id ), action.comment]
      }
    case EDIT_COMMENT :
      return {
        ...state,
        comments: [...state.comments.filter((comment) => comment.id !== action.comment.id ), action.comment]
      }
    case DELETE_COMMENT :
      return {
        ...state,
        comments: [...state.comments.filter((comment) => comment.id !== action.comment.id )]
      }
    default:
      return state
  }
}

export default combineReducers({
  blog,
  comments
})
