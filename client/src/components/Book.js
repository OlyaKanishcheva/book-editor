import React from 'react'
import PropTypes from 'prop-types'
import './../stylesheets/Book.css'
import { removeBook, editBook } from './../actions/actions'

const Book = (props, { store }) => {
  const remove = (e, id) => {
    e.preventDefault()
    store.dispatch(removeBook(id))
  }

  const edit = (e, props) => {
    e.preventDefault()
    store.dispatch(editBook({
      id: props.id,
      title: props.title,
      publicationDate: props.publicationDate,
      pagesNumber: props.pagesNumber,
      publisherName: props.publisherName,
      releaseDate: props.releaseDate,
      authors: props.authors,
      image: props.image,
    }))
  }

  const autorsList = () => {
    if (props.authors) {
      if (props.authors.length !== 0) {
        return props.authors.map((author, i) => 
          <div className='book__author' key={i}>
            {`${author.name} ${author.surname}`}
          </div> 
      )}
    } else {
      return <div>No authors</div>
    }
  }

  return (
    <div className='book'>
      <div className='book__inner'>
        <div className='book__title'>{props.title}</div>
        <div className='book__image' style={{backgroundImage: `url(${props.image})`}}></div>
        <div className='book__authors-list'>
          <div className='book__authors-title'>Authors:</div> 
          {autorsList()}
        </div>
        <div className='book__publication-date'>Number of pages: {props.pagesNumber}</div>
        <div className='book__publisher-name'>Publisher Name: {props.publisherName ? props.publisherName : '-'}</div>
        <div className='book__publication-date'>Publication year: {props.publicationDate ? props.publicationDate : '-'}</div>
        <div className='book__release-date'>Release date: {props.releaseDate ? props.releaseDate : '-'}</div>
        <button className='book__remove app__button'
                title='Remove book'
                onClick={(e) => remove(e, props.id)}>&#10006;</button>
        <button className='book__edit app__button'
                title='Edit book'
                onClick={(e) => edit(e, props)}>&#9998;</button>
      </div>
    </div>
  )
}
  

Book.propTypes = {
  title: PropTypes.string.isRequired,
  publicationDate: PropTypes.number,
  pagesNumber: PropTypes.string.isRequired,
  publisherName: PropTypes.string,
  releaseDate: PropTypes.string,
  authors: PropTypes.array,
  image: PropTypes.string,
}

Book.contextTypes = {
  store: PropTypes.object
}

export default Book