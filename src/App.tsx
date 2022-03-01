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
import AddItemForm from './components/addItemForm';

function App() {
  return (
    <div className="App">
      <Router>
      <NavBar></NavBar>
        <Routes>
          <Route path="/" element={<Mainfeed />} />
          <Route path="/add" element={<AddItemForm />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
