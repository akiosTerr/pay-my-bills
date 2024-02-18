import { SetProfileNameCtx, useAuthCtx } from "Contexts";
import { useContext, useEffect, useState } from "react";
import { FaChartLine, FaPlus, FaHome } from "react-icons/fa"
import { Link } from "react-router-dom";
import "style/navbar.scss"

const getContextProfileName = (profileNameCtx: any): string =>{
    if(profileNameCtx && profileNameCtx.profileName){
        return profileNameCtx.profileName
    } else {
        return ''
    }
}

const getAuthStatus = (ctx: any) => {
    if(ctx && ctx.isLoggedIn){
        return ctx.isLoggedIn
    } else {
        return false
    }
}

function NavBar() {
    const [userName, setUsername] = useState('')
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const profileNameCtx = useContext(SetProfileNameCtx)
    const authCtx = useAuthCtx()

    useEffect(() => {
        const profileName = getContextProfileName(profileNameCtx)
        const isLoggedIn = getAuthStatus(authCtx)
        if(profileName.length > 0){
            setUsername(profileName)
            setIsLoggedIn(isLoggedIn)
        } else {
            const storedUsername = localStorage.getItem('username'); 
            if(storedUsername) {
                setIsLoggedIn(isLoggedIn)
                setUsername(storedUsername)
            }
        }
    },[authCtx, profileNameCtx])

    if(!isLoggedIn) {
        return <></>
    }

    return ( 
        <div className={`header-nav-bar`}>
            <div className="nav-bar">
                {/* <Link className="nav-bar-item" to='chart'>
                    <FaChartLine></FaChartLine>
                </Link> */}
                <Link className="nav-bar-item" to='/'>
                    <FaHome></FaHome>
                </Link>
                <Link className="nav-bar-item" to='add'>
                    <FaPlus></FaPlus>
                </Link>
            </div>
            <div className="profile">
                <h2>{userName}</h2>
            </div>
        </div>
     );
}

export default NavBar;