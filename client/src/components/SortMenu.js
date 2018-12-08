import React from 'react'
import './../stylesheets/SortMenu.css'
import PropTypes from 'prop-types'
import { sortBooks } from './../actions/actions'

const options = {
  title: 'SORTED_BY_TITLE',
  date: 'SORTED_BY_DATE'
}

const SortMenu = (props, {store}) =>
  <div className='app__menu'>
    <div className='app__inner'>
      <div className='app__text'>Sort books:</div>
      {Object.keys(options).map((item, i) =>
        <div key={i}
            className={store.getState().sort === options[item] ? `app__text sort-item sort-item-selected` : `app__text sort-item`}
            onClick={(event) => {
              event.preventDefault()
              store.dispatch(sortBooks(options[item]))
           }}>
           {`${item[0].toUpperCase()}${item.substring(1)}`}
        </div>
      )}
    </div>
  </div>

SortMenu.contextTypes = {
  store: PropTypes.object
}

export default SortMenu