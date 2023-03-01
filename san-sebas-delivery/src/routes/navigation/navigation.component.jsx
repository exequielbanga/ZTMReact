import { Outlet, Link } from "react-router-dom"
import { Fragment } from "react";

import { ReactComponent as Logo } from '../../Assets/crown.svg';
import LogoIcon from '../../Assets/Logo.png';

import './navigation.styles.scss'

const Navigation = () => {
    return (
        <Fragment>
            <div className="navigation">
                <Link className="logo-container" to="/">
                    <Logo className='logo' />
                    {/* <img  src={LogoIcon} width='75px' height='75px'/> */}
                </Link>
                <div className="nav-links-container">
                    <Link className="nav-link" to="/shop">
                        SHOP
                    </Link>
                    <Link className="nav-link" to="/contact">
                        CONTACT
                    </Link>
                    <Link className="nav-link" to="/signin">
                        SIGN IN
                    </Link>
                </div>
            </div>
            <Outlet />
        </Fragment>
    )
}

export default Navigation