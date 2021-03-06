import React, { Component } from 'react';
import '../styles/App.css';
import { connect } from 'react-redux'
import * as actions from '../actions'
import { Route, BrowserRouter } from 'react-router-dom'
import Posts from './Posts'
import PostDetail from './PostDetail'
import AddPost from './Addpost'
import Header from './Header'

class App extends Component {

  componentDidMount() {
    this.props.fetchCategories()
  }

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <div>
            <Header />
            <Route exact path="/" component={Posts}></Route>
            <Route exact path="/:cat" component={Posts}></Route>
            <Route exact path="/addpost" component={AddPost}></Route>
            <Route exact path="/editpost/:post" component={AddPost}></Route>
            <Route exact path="/:cat/:id" component={PostDetail}></Route>
          </div>
        </BrowserRouter>
      </div>
    )
  }
}

export default connect(null, actions)(App)
