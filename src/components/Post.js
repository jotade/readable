
import React, { Component } from "react"
import AddComment from "./AddComment"
import { connect } from 'react-redux'
import * as actions from '../actions'
import { Link } from 'react-router-dom'

class Post extends Component {

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

  render() {
    const  { showModal, post, comments, comment } = this.state
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
          <Link to={{pathname: "/editpost/"+post.id, state: post} } >Edit post</Link>
        </div>
        <ol className="post-comments">
          {
            comments.map(comment =>
              <li key={comment.id}>
              <button type="button" onClick={() => this.showModal(comment)} className="comment-box">
                {comment.body}
              </button>
              <div>
              <div className="comment-score">{"Score: "+comment.voteScore }</div>
              <div className="comment-author-box">{"Author: "+comment.author }</div>
              <div className="comment-vote-buttons">
              <button className="upVote" onClick={() => this.props.voteComment(comment.id, {option: "upVote"})}>upVote</button>
              <button className="downVote" onClick={() => this.props.voteComment(comment.id, {option: "downVote"})}>downVote</button>
              </div>
              </div>
              </li>
            )
          }
        </ol>
      </div>

      </div>
    );
  }
}

function mapStateToProps({ blog, comments }) {
  return {
    post: blog.post,
    comments: comments.comments
  }
}

export default connect(mapStateToProps, actions)(Post)
