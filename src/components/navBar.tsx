import { FaChartLine, FaPlus, FaHome } from "react-icons/fa"
import { Link } from "react-router-dom";
import "style/navbar.scss"


function NavBar() {
    return ( 
        <div className="header-nav-bar">
            <ul className="nav-bar">
                <Link className="nav-bar-item" to='chart'>
                    <FaChartLine></FaChartLine>
                </Link>
                <Link className="nav-bar-item" to='/'>
                    <FaHome></FaHome>
                </Link>
                <Link className="nav-bar-item" to='add'>
                    <FaPlus></FaPlus>
                </Link>
            </ul>
        </div>
     );
}

export default NavBar;