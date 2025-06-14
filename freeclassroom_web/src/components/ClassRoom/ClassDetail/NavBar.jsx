import './NavBar.scss'
import { NavLink, Link, useNavigate } from 'react-router-dom';

const NavBarComponent = () => {
    return (
        <>
            <ul className="nav nav-pills card-header-tabs">
            <li className="nav-item">
                <NavLink className='nav-link' to="/class/class-detail/main">Main</NavLink>
            </li>
            <li className="nav-item">
                <NavLink className='nav-link' to="/class/class-detail/people">Peoples</NavLink>
            </li>
            </ul>
        </>
    )
}

export default NavBarComponent