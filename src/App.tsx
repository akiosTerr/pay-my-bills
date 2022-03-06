import Mainfeed from './pages/mainfeed';
import NavBar from './components/navBar';
import {
  Routes,
  Route,
  BrowserRouter as Router,
} from "react-router-dom";
import './style/base.scss'
import AddItemForm from './pages/addItemForm';
import EditItemForm from './pages/editItemForm';
import ChartPage from './pages/chartPage';

function App() {

  return (
    <div className="App">
      <Router>
      <NavBar></NavBar>
        <Routes>
          <Route path="/" element={<Mainfeed />} />
          <Route path="/add" element={<AddItemForm />} />
          <Route path="/edit/:id" element={<EditItemForm />} />
          <Route path="/chart" element={<ChartPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
