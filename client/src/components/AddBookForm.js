import './../stylesheets/AddBookForm.css'
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { addBook } from './../actions/actions'
import validTextInput from './../helpers/validTextInput'

class AddBookForm extends Component {

  constructor(props, {store}) {
    super(props)
    this.store = store
    this.props = props
    this.state = {
      title: props.editBook.title ? props.editBook.title : '',
      publicationDate: props.editBook.publicationDate ? props.editBook.publicationDate : ''
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      title: nextProps.editBook.title ? nextProps.editBook.title : '',
      publicationDate: nextProps.editBook.publicationDate ? nextProps.editBook.publicationDate : ''
    })
  }

  submit = (e) => {
    e.preventDefault()
    const {state, store, refs} = this
    const textInputs = [{
      name: refs._title,
      maxLength: 30
    }]

    if (!textInputs.every((input) => validTextInput({input: input.name, maxLength: input.maxLength}))) return

    store.dispatch(addBook({
      title: state.title,
      publicationDate: +(state.publicationDate)
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

  renderPublicationDataInput = () => {
    const {changePublicationDate, state} = this
    const {publicationDate} = state

    return (
      <div className='add-book__input__container'>
        Publication date:&nbsp;
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

  render() {
    const {submit} = this
    return (
      <div className='add-book__host'>
        <form className='add-book' onSubmit={submit}>
          {this.renderTitleInput()}
          {this.renderPublicationDataInput()}
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
