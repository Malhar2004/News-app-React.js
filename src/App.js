import './App.css';
// require('dotenv').config()
// type rcc to create class based component

import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar'

export default class App extends Component {

  Apikey = process.env.REACT_APP_NEWS_API_KEY

  state = {
    progress: 0
  }

  setprogress = (progress) =>{
    this.setState({progress: progress})
  }
  render() {
    return (
        <Router>
      <div>
          <Navbar />
          <LoadingBar
            color='#f11946'
            height={3}
            progress={this.state.progress}
          />
          <Routes>
            <Route path='/' element={<News setprogress={this.setprogress} apiKey={this.Apikey} key="general" pageSize={20} country="in" category="general" />} />
            <Route path='/business' element={<News setprogress={this.setprogress} apiKey={this.Apikey} key="business" pageSize={20} country="in" category="business" />} />
            <Route path='/enterainment' element={<News setprogress={this.setprogress} apiKey={this.Apikey} key="enterainment" pageSize={20} country="in" category="enterainment" />} />
            <Route path='/health' element={<News setprogress={this.setprogress} apiKey={this.Apikey} key="health" pageSize={20} country="in" category="health" />} />
            <Route path='/science' element={<News setprogress={this.setprogress} apiKey={this.Apikey} key="science" pageSize={20} country="in" category="science" />} />
            <Route path='/sports' element={<News setprogress={this.setprogress} apiKey={this.Apikey} key="sports" pageSize={20} country="in" category="sports" />} />
            <Route path='/technology' element={<News setprogress={this.setprogress} apiKey={this.Apikey} key="technology" pageSize={20} country="in" category="technology" />} />
          </Routes>
      </div>
        </Router>
    )
  }
}


