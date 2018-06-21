import React, { Component } from "react"
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actions from '../actions'
import Post from './Post'

class Posts extends Component {

  state = {
    posts: [],
    category: ""
  }

  componentDidMount() {
    // const { cat } = this.props.match.params
    // if (cat !== undefined) {
    //   this.props.fetchPostsByCat(cat)
    // } else {
      this.props.fetchPosts()
    //}
  }

  componentWillReceiveProps(newProps) {
    const { cat } = newProps.match.params
    const { sortType } = newProps
    this.props.setCategory(cat)
    if (cat !== undefined) {
      const postsFiltered = newProps.posts.filter(post => post.category === cat)
      this.setState({
        posts: this.sortPosts(postsFiltered, sortType),
        category: cat
      })
    } else {
      this.setState({
        posts: this.sortPosts(newProps.posts, sortType),
        category: cat
      })
    }
  }

  sortPosts(posts, sortType) {
    if (sortType === "Timestamp") {
      return posts.sort((a, b) => b.timestamp - a.timestamp)
    } else if (sortType === "Vote Score"){
      return posts.sort((a, b) => b.voteScore - a.voteScore)
    }
  }

  render() {
    const { posts, category } = this.state
    return(
      <div >
        <div className="posts">
          <h1>{category !== undefined ? category.toUpperCase()+" POSTS":"POSTS"}</h1>
            <ol className="posts-container">
                { posts !== undefined ? posts.map( post =>
                  <Post post={ post } key={ post.id } />
                )
                : <h1>No Posts available</h1>}
            </ol>
        </div>
        <div className="open-add-post">
          <Link to="/addpost" >Add a post</Link>
        </div>
      </div>
    )
  }
}

function mapStateToProps({ blog }) {
  return {
    posts: blog.posts,
    sortType: blog.sortType
  }
}

export default connect(mapStateToProps, actions)(Posts)
