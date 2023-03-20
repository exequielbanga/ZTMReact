import { Outlet, Link } from "react-router-dom"

import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDrowdown from "../../components/cart-dropdown/cart-dropdown.component";

import { useContext, Fragment } from "react";
import { UserContext } from '../../components/context/user.context'
import { CartContext } from "../../components/context/cart.context";

import { ReactComponent as Logo } from '../../Assets/crown.svg';
import LogoIcon from '../../Assets/Logo.png';
import './navigation.styles.scss'
import { signOutUser } from "../../utils/firebase/firebase.utils";

const Navigation = () => {
    const { currentUser } = useContext(UserContext)
    const { isCartOpen } = useContext(CartContext);

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
                    {
                        currentUser != null ?
                            (<span className="nav-link" onClick={signOutUser}>SIGN OUT</span>)
                            : (<Link className="nav-link" to="/auth">SIGN IN</Link>)
                    }
                    <CartIcon />
                </div>
                {isCartOpen && <CartDrowdown />}
            </div>
            <Outlet />
        </Fragment>
    )
}

export default Navigation