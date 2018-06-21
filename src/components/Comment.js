import React, { Component } from "react"
import { connect } from 'react-redux'
import * as actions from '../actions'

class Comment extends Component {
  render() {
    const { comment } = this.props
    return (
      <li key={comment.id}>
        <button type="button" onClick={() => this.props.showModal(comment)} className="comment-box">
          <i className="edit-comment-icon"></i>
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
}

export default connect(null, actions)(Comment)
