const sortBooks = (books, type) => {
  let sorted = books

  if (type === 'SORTED_BY_TITLE') {
    sorted = books.sort((a, b) => {
      if (a.title > b.title) return 1
      if (a.title < b.title) return -1
      return 0
    })
  }

  if (type === 'SORTED_BY_DATE') {
    sorted = books.sort((a, b) => {
      if (b.publicationDate === undefined && b.publicationDate === undefined) return 0
      if (a.publicationDate === undefined) return -1
      if (b.publicationDate === undefined) return 1 
      return a.publicationDate - b.publicationDate}
    )
  }

  return sorted
}

export default sortBooks