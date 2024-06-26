import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import React, { Component } from 'react'
import NavBar from './components/NavBar';
import News from './components/News';

export default class App extends Component {
  render() {
    return (
      <div>
        <Router>
        <NavBar/>
          <Routes>
            <Route exact path='/' element={<News key='general' country='in' category='general'/>}/>
            <Route exact path='/general' element={<News key='general' country='in' category='general'/>}/>
            <Route exact path='/entertainment' element={<News key='entertainment' country='in' category='entertainment'/>}/>
            <Route exact path='/health' element={<News key='health' country='in' category='health'/>}/>
            <Route exact path='/science' element={<News key='science' country='in' category='science'/>}/>
            <Route exact path='/sports' element={<News key='sports' country='in' category='sports'/>}/>
            <Route exact path='/technology' element={<News key='technology' country='in' category='technology'/>}/>
            <Route exact path='/business' element={<News key='business' country='in' category='business'/>}/>
          </Routes>
        </Router>
      </div>
    )
  }
}

