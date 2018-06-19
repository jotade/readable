import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import UUID from 'uuid'

class AddComment extends Component {

  constructor(props) {
    super(props);
    this.state = {
      id: UUID(),
      timestamp: Date.now(),
      body: "",
      author: "",
      parentId: ""
    }
    this.close = this.close.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    const { comment } = this.props
    if (comment.id !== undefined) {
      this.setState({
        id: comment.id,
        timestamp: Date.now(),
        body: comment.body,
        author: comment.author,
        parentId: comment.parentId
      })
    } else {
      this.setState({parentId: this.props.postID})
    }
  }

  close() {
    this.props.hide()
  }

  validateForm() {
    if (this.state.body !== "" && this.state.author !== "") {
      return true
    } else {
      return false
    }
  }

  handleSubmit(event) {
    event.preventDefault()
    if (this.validateForm()) {
      if (this.props.comment.id !== undefined) {
        this.props.editComment(this.state)
      } else {
        this.props.insertComment(this.state)
      }
      this.close()
    }else {
      alert("All fields are required")
    }
  }

  handleChange(event) {
    const { name, value } = event.target
    switch (name) {
      case 'body':
        this.setState({ body: value })
        break
      case 'author':
        this.setState({ author: value })
        break
      default:
        console.log('event not handled');
    }
  }

  render(){
    const { body, author } = this.state
    const isEditing = this.props.comment.id === undefined  ? false : true
    return (
    <div className="modal">
      <div className="modal-main">
        <button className="modal-close" onClick={this.close}>close</button>
        <h2>{ !isEditing ? "Add Comment to Post" : "Edit comment of Post"}</h2>
        <form onSubmit={this.handleSubmit}>
          <textarea className="comment-textarea" placeholder="Add your comment here" value={ body } name='body' onChange={this.handleChange}/>
          <input type="text"  className="comment-author" placeholder="Author" value={ author } name='author' disabled={!isEditing ? false : true} onChange={this.handleChange}/>
          <input className="comment-submit" type="submit" value="Save" />
        </form>
      </div>
    </div>
  )
  }
}

export default connect(null, actions)(AddComment)
