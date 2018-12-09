import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './../stylesheets/App.css'
import SortMenu from './SortMenu'
import BookList from './BookList'
import AddBookForm from './AddBookForm'
import sortBooks from './../helpers/sortBooks'

class App extends Component {
  constructor(props) {
    super()
    this.props = props
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
        <div className='app__main'>
          <AddBookForm editBook={editBook}/>
          <BookList books={sortedBooks}/>
        </div>
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
