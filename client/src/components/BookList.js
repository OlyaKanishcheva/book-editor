import React from 'react'
import PropTypes from 'prop-types'
import './../stylesheets/BookList.css'
import Book from './Book'

const BookList = ({books = []}) =>
  <div className='book-list'>
    {(books.length === 0) ?
      <p>Tadam</p> :
      books.map((book) =>
        <Book key={book.id}
          {...book} />
      )
    }
  </div>

BookList.propTypes = {
  books: PropTypes.array
}

export default BookList