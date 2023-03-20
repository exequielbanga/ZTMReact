import { ReactComponent as ShoppingIcon } from '../../Assets/shopping-bag.svg'
import { useContext } from 'react'
import { CartContext   } from '../context/cart.context'
import './cart-icon.styles.scss'

const CartIcon = () =>{
    const {isCartOpen, setIsCartOpen, itemsCount} = useContext(CartContext)
    const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen)

    return(
    <div className='cart-icon-container' onClick={toggleIsCartOpen}>
        <ShoppingIcon className='shopping-icon'/>
        <span className='item-count'>{itemsCount}</span>
    </div>
    )
}

export default CartIcon