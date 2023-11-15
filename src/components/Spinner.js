import React, { Component } from 'react'
import walk from './Spinner-2.gif'

export default class spinner extends Component {
  render() {
    return (
      <div className='container text-center'>
        <img className= "my-3" src={walk} alt="" />
      </div>
    )
  }
}
