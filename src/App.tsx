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
import EditItemForm from './components/editItemForm';

function App() {

  return (
    <div className="App">
      <Router>
      <NavBar></NavBar>
        <Routes>
          <Route path="/" element={<Mainfeed />} />
          <Route path="/add" element={<AddItemForm />} />
          <Route path="/edit/:id" element={<EditItemForm />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
