import React, { Component } from 'react'

import UsernameList from './components/UsernameList'

export default class App extends Component {
  render() {
    return (
      <div className='page-wrapper'>
        <UsernameList />
      </div>
    )
  }
}
