import C from './../constans/constans'

export const sort = (state = 'SORTED_BY_TITLE', action) => {
  switch (action.type) {
    case C.SORT_BOOKS:
      return action.sortBy
    default:
      return state
  }
}

export const book = (state = {}, action) => {
  switch (action.type) {
    case C.ADD_BOOK:
      return {
        id: action.id,
        title: action.title,
        publicationDate: action.publicationDate,
        pagesNumber: action.pagesNumber,
        publisherName: action.publisherName,
        releaseDate: action.releaseDate,
        authors: action.authors,
        image: action.image,
      }
    default:
      return state
  }
}

export const books = (state = [], action) => {
  switch (action.type) {
    case C.ADD_BOOK:
      return [
        ...state,
        book({}, action)
      ]
    case C.REMOVE_BOOK: 
      return state.filter((book) => book.id !== action.id)
    case C.EDIT_BOOK: 
      return state.filter((book) => book.id !== action.id)
    default:
      return state
  }
}

export const editBook = (state = {}, action) => {
  switch (action.type) {
    case C.EDIT_BOOK:
      return {
        id: action.id,
        title: action.title,
        publicationDate: action.publicationDate,
        pagesNumber: action.pagesNumber,
        publisherName: action.publisherName,
        releaseDate: action.releaseDate,
        authors: action.authors,
        image: action.image,
      }
    case C.ADD_BOOK: 
      return {}
    default:
      return state
  }
}
