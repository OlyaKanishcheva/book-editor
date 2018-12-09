import C from './../constans/constans'
import {v4} from 'uuid'

export const sortBooks = sortBy =>
  ({
    type: C.SORT_BOOKS,
    sortBy
  })

export const addBook = ({title, publicationDate, pagesNumber, publisherName, releaseDate, authors, image}) =>
  ({
    type: C.ADD_BOOK,
    id: v4(),
    title,
    publicationDate,
    pagesNumber,
    publisherName,
    releaseDate,
    authors,
    image,
  })

export const removeBook = (id) =>
  ({
    type: C.REMOVE_BOOK,
    id
  })

export const editBook = ({id, title, publicationDate, pagesNumber, publisherName, releaseDate, authors, image}) => 
  ({
    type: C.EDIT_BOOK,
    id,
    title,
    publicationDate, 
    pagesNumber,
    publisherName,
    releaseDate,
    authors,
    image,
  })