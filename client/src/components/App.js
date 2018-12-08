import React, { Component } from 'react'
import PropTypes from 'prop-types'
// import logo from './../stylesheets/logo.svg';
import './../stylesheets/App.css'
import SortMenu from './SortMenu'
import BookList from './BookList'
import AddBookForm from './AddBookForm'
import sortBooks from './../helpers/sortBooks'

class App extends Component {
  constructor(props) {
    super()
    this.props = props
    // <img src={logo} className="App-logo" alt="logo" />
  }

  getChildContext() {
    return {
      store: this.props.store
    }
  }

  componentWillMount() {
    this.unsubscribe = this.props.store.subscribe(
      () => this.forceUpdate()
    )
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  render() {
    const {sort, books, editBook} = this.props.store.getState()
    const sortedBooks = sortBooks(books, sort)      
    return (
      <div className='app'>
        <SortMenu />
        <AddBookForm editBook={editBook}/>
        <BookList books={sortedBooks}/>
      </div>
    )
  }
}

App.propTypes = {
  store: PropTypes.object.isRequired
}

App.childContextTypes = {
  store: PropTypes.object.isRequired
}

export default App
