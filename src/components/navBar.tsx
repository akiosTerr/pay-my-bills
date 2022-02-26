import { FaChartLine, FaPlus, FaHome } from "react-icons/fa"
import "../style/navbar.scss"


function NavBar() {
    return ( 
        <div className="header-nav-bar">
            <ul className="nav-bar">
                <li className="nav-bar-item">
                    <FaChartLine></FaChartLine>
                </li>
                <li className="nav-bar-item">
                    <FaHome></FaHome>
                </li>
                <li className="nav-bar-item">
                    <FaPlus></FaPlus>
                </li>
            </ul>
        </div>
     );
}

export default NavBar;