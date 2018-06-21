import React, { Component } from "react"
import AddComment from "./AddComment"
import { connect } from 'react-redux'
import * as actions from '../actions'
import { Link } from 'react-router-dom'
import Comment from './Comment'

class PostDetail extends Component {

  state = {
    showModal: false,
    post: {},
    comments: [],
    comment: {}
  }

  componentDidMount() {
    const { id } = this.props.match.params
    this.props.fetchPost(id)
    this.props.fetchComments(id)
  }

  componentWillReceiveProps(newProps) {
    if (newProps.post !== undefined && newProps.comments !== undefined){
      this.setState({
        post: newProps.post,
        comments: newProps.comments.sort((a, b) => b.voteScore - a.voteScore)
      })
    }
  }

  showModal = (comment) => {
    this.setState({ showModal: true, comment })
  }

  hideModal = () => {
    this.setState({ showModal: false });
  }

  formatDate(timestamp) {
    const date = new Date(timestamp)
    return date.toUTCString()
  }

  delete() {
    this.props.deletePost(this.state.post)
    this.props.history.push("/")
  }

  render() {
    const  { showModal, post, comments, comment } = this.state
    if (post.id === undefined) {
      return(
      <div className="post-container">POST NOT FOUND</div>
      )
    } else {
    return (
      <div>
      <div className="post-container">
        <h1 className="post-header" >{"POST - "+post.title }</h1>
        <button type="button" onClick={this.showModal} className="comment-open-modal">
          Add Comment
        </button>
        { showModal &&
          <AddComment hide={this.hideModal} postID={post.id} comment={comment}/>
        }
        <div className="post">
          <div className="post-date">{ this.formatDate(post.timestamp) }</div>
          <div className="post-title">{ post.title }</div>
          <div className="post-body">{ post.body }</div>
          <div className="post-author">{"Author: "+ post.author }</div>
          <div className="post-score">{"Score: "+post.voteScore }</div>
        </div>
        <div className="open-edit-post">
          <div>
          <Link to={{pathname: "/editpost/"+post.id, state: post} } >Edit post</Link>
          <button className="delete-button" onClick={this.delete.bind(this)}>X</button>
          </div>
        </div>
        <ol className="post-comments">
          {
            comments.map(comment =>
              <Comment comment={ comment } showModal={ this.showModal } key={ comment.id } />
            )
          }
        </ol>
      </div>
      </div>
    )
  }
  }
}

function mapStateToProps({ blog, comments }) {
  return {
    post: blog.post,
    comments: comments.comments
  }
}

export default connect(mapStateToProps, actions)(PostDetail)
