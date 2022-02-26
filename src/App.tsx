import React from 'react';
import Mainfeed from './components/mainfeed';
import NavBar from './components/navBar';
import History from './components/history';
import './style/base.scss'

function App() {
  return (
    <div className="App">
      <NavBar></NavBar>
      <Mainfeed></Mainfeed>
      <History></History>
    </div>
  );
}

export default App;
