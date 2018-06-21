import React, { Component } from "react"
import { connect } from 'react-redux'
import * as actions from '../actions'
import { Link } from 'react-router-dom'

class Post extends Component {
  render() {
    const { post } = this.props
    return (
      <li key={post.id}>
      <button className="delete-button" onClick={() => this.props.deletePost(post)}>X</button>
      <div className="edit-post-button">
        <Link to={{pathname: "/editpost/"+post.id, state: post} } >Edit post</Link>
      </div>
        <Link to={{pathname: "/"+post.category+"/"+post.id, state: post} }>
          <div className="post-title">{ post.title }</div>
          <div className="post-body">{ post.body }</div>
          <div className="post-author">{"Author: "+post.author }</div>
          <div>
            <div className="post-score-post">{"Score: "+post.voteScore }</div>
            <div className="post-comment">{"Comments: "+post.commentCount }</div>
          </div>
        </Link>
        <button className="upVote" onClick={() => this.props.votePost(post.id, {option: "upVote"})}>upVote</button>
        <button className="downVote" onClick={() => this.props.votePost(post.id, {option: "downVote"})}>downVote</button>
      </li>
    )
  }
}

export default connect(null, actions)(Post)
