import React from 'react';
import Mainfeed from './components/mainfeed';
import NavBar from './components/navBar';
import {
  Routes,
  Route,
  BrowserRouter as Router,
  Link,
  Outlet,
} from "react-router-dom";

import './style/base.scss'

function App() {
  return (
    <div className="App">
      <NavBar></NavBar>
      <Router>
        <Routes>
          <Route path="/" element={<Mainfeed />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
