import React, { Component } from "react"
import { connect } from 'react-redux'
import * as actions from '../actions'
import UUID from 'uuid'

class AddPost extends Component {

  constructor(props) {
    super(props)
    this.state = {
      id: UUID(),
      timestamp: Date.now(),
      title: '',
      body: '',
      author: '',
      category: 'react'
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.goBack = this.goBack.bind(this)
    this.delete = this.delete.bind(this)
  }

  componentDidMount() {
    if (this.props.location.state !== undefined ) {
      this.setState(this.props.location.state)
    }
  }

  handleChange(event) {
    const { name, value } = event.target
    switch (name) {
      case 'title':
        this.setState({ title: value })
        break
      case 'category':
        this.setState({ category: value })
        break
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

  validateForm() {
    if (this.state.title !== "" && this.state.body !== "" && this.state.author !== "") {
      return true
    } else {
      return false
    }
  }

  handleSubmit(event) {
    event.preventDefault()
    if (this.validateForm()) {
      if (this.props.location.state !== undefined ) {
        this.props.editPost(this.state)
      } else {
        this.props.insertPost(this.state)
      }
      this.goBack()
    }else {
      alert("All fields are required")
    }
  }

  goBack() {
    this.props.history.goBack()
  }

  delete() {
    this.props.deletePost(this.state)
    this.props.history.push("/")
  }

  render() {
    const { categories } = this.props
    const { title, body, author, category } = this.state
    const isEditing = this.props.location.state === undefined
    return(
      <div className="add-post">
        <div className="add-post-bar">
          <button type="button" onClick={this.goBack} className="close-search"></button>
          <div className="add-post-input-wrapper">
          <div className="add-post-title">
          <h1>{isEditing ? "Create Post" : "Edit Post"}</h1>
          { !isEditing &&
          <button type="button" onClick={this.delete} className="delete-post">Delete</button>
          }
          </div>
            <form onSubmit={this.handleSubmit}>
              <input type="text" value={ title } placeholder="Title" name='title' onChange={this.handleChange} />
              <select name='category' value={ category } onChange={this.handleChange} disabled={isEditing ? false : true}>
                {categories !== undefined ? categories.map( category => <option value={category.path} key={category.path}>{category.name }</option>):'' }
              </select>
              <textarea placeholder="content" value={ body } name='body' onChange={this.handleChange}/>
              <input type="text" placeholder="Author" value={ author } name='author' disabled={isEditing ? false : true} onChange={this.handleChange}/>
              <input className="post-submit" type="submit" value="Submit" />
            </form>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps ({blog}) {
  return {
    categories: blog.categories
  }
}

export default connect(mapStateToProps, actions)(AddPost)
