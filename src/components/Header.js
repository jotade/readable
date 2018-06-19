import React, { Component } from "react"
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actions from '../actions'

class Header extends Component {

  state = {
    category: undefined,
    sort: "Timestamp"
  }

  componentDidMount() {
    this.props.setSortType(this.state.sort)
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      category: newProps.category,
      sort: newProps.sortType
    })
  }

  handleClick(menuItem) {
    this.setState({ active: menuItem });
  }

  handleSelect(event) {
    this.props.setSortType(event.target.value)
  }

  render() {
    const { categories } = this.props
    return(
      <div>
        <ul >
            <li key="all"><Link to="/" className={this.state.category === undefined ? "active":""}
            onClick={this.handleClick.bind(this, "ALL") }
            >ALL</Link></li>
            {categories && categories.map( category => <li key={ category.path} >
              <Link
              to={"/"+category.name+"/posts"}
              className={this.state.category === category.name ? "active" : {}}
              onClick={this.handleClick.bind(this, category.name) }
              >{category.name.toUpperCase()}
              </Link></li>
            )}
            <li>
              <select value={this.state.sort} onChange={this.handleSelect.bind(this)}>
                <option value="Timestamp">Timestamp</option>
                <option value="Vote Score">Vote Score</option>
              </select>
            </li>
        </ul>
      </div>
    )
  }
}

function mapStateToProps ({blog}) {
  return {
    categories: blog.categories,
    sortType: blog.sortType,
    category: blog.category
  }
}

export default connect( mapStateToProps, actions )(Header)
