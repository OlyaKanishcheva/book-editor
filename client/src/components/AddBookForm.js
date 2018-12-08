import './../stylesheets/AddBookForm.css'
import React, {Component} from 'react'
import PropTypes from 'prop-types'
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
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      title: nextProps.editBook.title ? nextProps.editBook.title : '',
      publicationDate: nextProps.editBook.publicationDate ? nextProps.editBook.publicationDate : '',
      pagesNumber: nextProps.editBook.pagesNumber ? nextProps.editBook.pagesNumber : '',
      publisherName: nextProps.editBook.publisherName ? nextProps.editBook.publisherName : '',
      releaseDate: nextProps.editBook.releaseDate ? nextProps.editBook.releaseDate : '',
    })
  }

  submit = (e) => {
    e.preventDefault()
    const {state, store, refs} = this
    const textInputs = [
      {
        name: refs._title,
        maxLength: 30,
      },
      {
        name: refs._publisherName,
        maxLength: 30,
      }
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
               placeholder='Publisher name...' required/>
      </div>
    )
  }

  renderReleaseDateInput = () => {
    const {changeReleaseDate, state} = this
    const {releaseDate} = state

    return (
      <div className='add-book__input__container'>
        Release date:&nbsp;
        <input ref='_releaseDate'
               type='date'
               className='add-book__input'
               value={releaseDate}
               onChange={(e) => changeReleaseDate(e.target.value)}
               min='1800-01-01'
               max='2018-12-7' />
      </div>
    )
  }

  render() {
    const {submit} = this
    return (
      <div className='add-book__host'>
        <form className='add-book' onSubmit={submit}>
          {this.renderTitleInput()}
          {this.renderPagesNumberInput()}
          {this.renderPublisherNameInput()}
          {this.renderPublicationDateInput()}
          {this.renderReleaseDateInput()}
          <button className='app__button'>Save</button>
        </form>
      </div>
    )
  }
}

AddBookForm.contextTypes = {
  store: PropTypes.object
}

export default AddBookForm
