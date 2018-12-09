import './../stylesheets/AddBookForm.css'
import './../stylesheets/inputCalendar.css'
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Calendar from 'react-input-calendar'
import { addBook } from './../actions/actions'
import {validTextInput, validNumberInput} from './../helpers/validInput'

class AddBookForm extends Component {

  constructor(props, {store}) {
    super(props)
    this.store = store
    this.props = props
    this.state = {
      title: props.editBook.title ? props.editBook.title : '',
      publicationDate: props.editBook.publicationDate ? props.editBook.publicationDate : '',
      pagesNumber: props.editBook.pagesNumber ? props.editBook.pagesNumber : '',
      publisherName: props.editBook.publisherName ? props.editBook.publisherName : '',
      releaseDate: props.editBook.releaseDate ? props.editBook.releaseDate : '',
      authors: props.editBook.authors ? props.editBook.authors : [{name: '', surname: ''}],
      image: props.editBook.image ? props.editBook.image : '',
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      title: nextProps.editBook.title ? nextProps.editBook.title : '',
      publicationDate: nextProps.editBook.publicationDate ? nextProps.editBook.publicationDate : '',
      pagesNumber: nextProps.editBook.pagesNumber ? nextProps.editBook.pagesNumber : '',
      publisherName: nextProps.editBook.publisherName ? nextProps.editBook.publisherName : '',
      releaseDate: nextProps.editBook.releaseDate ? nextProps.editBook.releaseDate : '',
      authors: nextProps.editBook.authors ? nextProps.editBook.authors : [{name: '', surname: ''}],
      image: nextProps.editBook.image ? nextProps.editBook.image : '',
    })
  }

  submit = (e) => {
    e.preventDefault()
    const {state, store, refs} = this
    const namesInputs = state.authors.map((a, i) => {
      let o = {}
      o.name = refs[`_author_name_${i}`]
      o.maxLength = 20
      return o
    })
    const surnamesInputs = state.authors.map((a, i) => {
      let o = {}
      o.name = refs[`_author_surname_${i}`]
      o.maxLength = 20
      return o
    })
    const textInputs = [
      {
        name: refs._title,
        maxLength: 30,
      },
      {
        name: refs._publisherName,
        maxLength: 30,
      },
      ...namesInputs,
      ...surnamesInputs
    ]
    const numberInputs = [
      {
        name: refs._pagesNumber,
        min: 0,
        max:  1000,
      }
    ]

    if (!textInputs.every((input) => validTextInput({input: input.name, maxLength: input.maxLength}))) return
    if (!numberInputs.every((input) => validNumberInput({input: input.name, max: input.max, min: input.min}))) return

    store.dispatch(addBook({
      title: state.title,
      publicationDate: +(state.publicationDate),
      pagesNumber: state.pagesNumber,
      publisherName: state.publisherName,
      releaseDate: state.releaseDate,
      authors: state.authors,
      image: state.image,
    }))
    
    refs._title.focus()
  }

  changeTitle = (title) => {
    this.setState(prevState => ({
      ...prevState,
      title: title
    }))
  }

  changePublicationDate = (date) => {
    this.setState(prevState => ({
      ...prevState,
      publicationDate: date
    }))
  }

  changePagesNumber = (pages) => {
    this.setState(prevState => ({
      ...prevState,
      pagesNumber: pages
    }))
  }

  changePublisherName = (name) => {
    this.setState(prevState => ({
      ...prevState,
      publisherName: name
    }))
  }

  changeReleaseDate = (date) => {
    this.setState(prevState => ({
      ...prevState,
      releaseDate: date
    }))
  }

  changeAuthorList = (value, idx, key) => {
    const {state} = this
    const {authors} = state
    const nextAuthors = authors.map((author, i) => {
      if (i === idx) {
        return {
          ...author,
          [key]: value
        }
      }
      return author
    })

    this.setState({
      ...state,
      authors: nextAuthors
    })
  }

  addAuthor = (e) => {
    const {state} = this
    let {authors} = state
    e.preventDefault()
    authors.push({
      name: '',
      surname: ''
    })

    this.setState({
      ...state,
      authors: authors
    })
  }

  removeAuthor = (e, idx) => {
    const {state} = this
    const {authors} = state
    const nextAuthors = authors.filter((author, i) => i !== idx)

    e.preventDefault()

    if (nextAuthors.length === 0) return

    this.setState({
      ...state,
      authors: nextAuthors
    })
  }

  changeImage = async (e, mode) => {
    const {state} = this
    let file, image

    if (mode === 'add') {
      file = e.target.files[0]
      const promise = new Promise((resolve, reject) => {
        const reader = new FileReader()

        reader.onload = () => resolve(reader.result)
        reader.onerror = error => reject(error)
        reader.readAsDataURL(file)
      })

      await promise.then(base64 => {
        image = base64
        console.debug('file stored', base64)
      })
    } else {
      image = ''
    }
    
    this.setState({
      ...state,
      image: image
    })
  }

  renderTitleInput = () => {
    const {changeTitle, state} = this
    const {title} = state

    return (
      <div className='add-book__input__container'>
        <input ref='_title'
               type='text'
               className='add-book__input'
               value={title}
               onChange={(e) => changeTitle(e.target.value)}
               placeholder='Book title...' required/>
      </div>
    )
  }

  renderPublicationDateInput = () => {
    const {changePublicationDate, state} = this
    const {publicationDate} = state

    return (
      <div className='add-book__input__container'>
        Publication year:&nbsp;
        <input ref='_publicationDate'
               type='number'
               className='add-book__input'
               value={publicationDate}
               onChange={(e) => changePublicationDate(e.target.value)}
               min='1800'
               max='2019' />
      </div>
    )
  }

  renderPagesNumberInput = () => {
    const {changePagesNumber, state} = this
    const {pagesNumber} = state

    return (
      <div className='add-book__input__container'>
        Number of pages:&nbsp;
        <input ref='_pagesNumber'
               type='number'
               className='add-book__input'
               value={pagesNumber}
               onChange={(e) => changePagesNumber(e.target.value)}
               min='0'
               max='1000' />
      </div>
    )
  }

  renderPublisherNameInput = () => {
    const {changePublisherName, state} = this
    const {publisherName} = state

    return (
      <div className='add-book__input__container'>
        <input ref='_publisherName'
               type='text'
               className='add-book__input'
               value={publisherName}
               onChange={(e) => changePublisherName(e.target.value)}
               placeholder='Publisher name...'/>
      </div>
    )
  }

  renderReleaseDateInput = () => {
    const {changeReleaseDate, state} = this
    const {releaseDate} = state

    const props = {
      format: 'DD/MM/YYYY',
      computableFormat: 'DD/MM/YYYY',
      date: releaseDate,
      minDate: '01/01/1800',
      maxDate: '12/10/2018',
      onChange: (e) => changeReleaseDate(e)
    }

    return (
      <div className='add-book__input__container'>
        Release date:&nbsp;
        <div className='inline-block'>
          <Calendar {...props}/>
        </div>
      </div>
    )
  }

  renderAuthorList = () => {
    const {changeAuthorList, addAuthor, removeAuthor, state} = this
    const {authors} = state

    return (
      <div className='add-book__input__container'>
        <div>List of authors: </div>
        <div className='add-book__author__container'>
          {authors.map((author, i) => {
            return (
              <div key={i} >
                <input ref={`_author_name_${i}`}
                       type='text'
                       className='add-book__input add-book__input-author-name'
                       value={author.name}
                       onChange={(e) => changeAuthorList(e.target.value, i, 'name')}
                       placeholder="Author's name..." required/>
                <input ref={`_author_surname_${i}`}
                       type='text'
                       className='add-book__input add-book__input-author-surname'
                       value={author.surname}
                       onChange={(e) => changeAuthorList(e.target.value, i, 'surname')}
                       placeholder="Author's surname..." required/>
                <button className='app__button button__remove-author'
                        title='Remove author'
                        onClick={(e) => removeAuthor(e, i)} >
                        &#215;</button>
              </div>
            )
          })}
          <button className='app__button'
                  title='Add author'
                  onClick={(e) => addAuthor(e)} >
                  Add author</button>
        </div>
      </div>
    )
  }

  renderImageInput = () => {
    const {state, changeImage} = this
    const {image} = state

    return (
      <div className='add-book__image-input-container'>
        <div className='add-book__image-holder'>
          <div className='add-book__image'
               style={{backgroundImage: image ? `url(${image})` : ''}} />
          <button className='app__button button__remove-image'
                  title='Remove image'
                  type='button'
                  onClick={(e) => changeImage(e, 'remove')} >
                  &#215;</button>
        </div>
        <input ref='_image'
               type='file' 
               onChange={(e) => changeImage(e, 'add')}>
        </input>
      </div>
    )
  }

  render() {
    const {submit} = this
    console.warn(this.state, 'addBookForm')
    return (
      <div className='add-book__host'>
        <form className='add-book' onSubmit={submit}>
          {this.renderTitleInput()}
          {this.renderImageInput()}
          {this.renderAuthorList()}
          {this.renderPublisherNameInput()}
          {this.renderPagesNumberInput()}
          {this.renderPublicationDateInput()}
          {this.renderReleaseDateInput()}
          <button className='app__button'
                  type='submit'>
                  Save</button>
        </form>
      </div>
    )
  }
}

AddBookForm.contextTypes = {
  store: PropTypes.object
}

export default AddBookForm
