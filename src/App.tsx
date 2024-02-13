import { SetAuthCtx, SetProfileNameCtx } from "Contexts";
import { useAuth } from "hooks/auth_hook";
import { useState } from "react";
import { Route, Routes, HashRouter as Router } from "react-router-dom";
import NavBar from "./components/navBar";
import AddItemForm from "./pages/addItemForm";
import ChartPage from "./pages/chartPage";
import EditItemForm from "./pages/editItemForm";
import Mainfeed from "./pages/mainfeed";
import "./style/base.scss";

function App() {
  const [profileName, setProfileName] = useState<string>("");
  const { loggedIn, login, logout} = useAuth();

  return (
    <div className="App">
      <Router>
        <SetAuthCtx.Provider value={{isLoggedIn: loggedIn, login, logout}}>
          <SetProfileNameCtx.Provider value={{ setProfileName, profileName }}>
            <NavBar></NavBar>
            <Routes>
              <Route path="/" element={<Mainfeed />} />
              <Route path="/add" element={<AddItemForm />} />
              <Route path="/edit/:id" element={<EditItemForm />} />
              <Route path="/chart" element={<ChartPage />} />
            </Routes>
          </SetProfileNameCtx.Provider>
        </SetAuthCtx.Provider>
      </Router>
    </div>
  );
}

export default App;
